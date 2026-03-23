import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AlertContext from "../../../context/alert/AlertContext";

import "./Sidebar.css";
import BatchModal from "../../../components/batchModal/BatchModal";

const Sidebar = ({ isOpen }) => {
  const backendUrl = "http://localhost:5000/";
  const { batchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Alert
  const { showAlert } = useContext(AlertContext);

  const [openMenuId, setOpenMenuId] = useState(null);

  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null);

  const [batches, setBatches] = useState([]);

  // close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      // if click is NOT inside any batch-menu
      if (!e.target.closest(".batch-menu")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Add batch
  const handleAddBatch = async (name) => {
    try {
      const res = await fetch(`${backendUrl}api/batches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Failed to add batch");
      }

      // update UI
      setBatches((prev) => [...prev, data]);

      setIsModalOpen(false);
      showAlert("Added", "New batch added successfully", "success");
    } catch (error) {
      console.error(error);
      showAlert("Error", error.message, "danger");
    }
  };

  // Rename batch
  const handleRenameBatch = async (name, id) => {
    try {
      const res = await fetch(`${backendUrl}api/batches/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const updated = await res.json();

      if (!res.ok) {
        throw new Error(updated?.error?.message || "Rename failed");
      }

      // update frontend state
      setBatches((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b)),
      );

      setIsModalOpen(false);
      showAlert("Updated", "Batch renamed successfully", "success");
    } catch (err) {
      console.error("Rename failed", err);
      showAlert("Error", err.message, "danger");
    }
  };

  // Delete batch
  const handleDeleteBatch = async (id) => {
    try {
      await fetch(`${backendUrl}api/batches/${id}`, {
        method: "DELETE",
      });

      setIsModalOpen(false);

      // remove from UI
      setBatches((prev) => prev.filter((b) => b.id !== id));

      // if deleted batch is active → go home
      if (id === batchId) {
        navigate("/");
      }

      showAlert("Deleted", "Batch deleted successfully", "danger");
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBatches = async () => {
    try {
      const res = await fetch(`${backendUrl}api/batches`);
      const data = await res.json();
      setBatches(data);
    } catch (err) {
      console.error("Error fetching batches:", err);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-content">
        <h6 className="fw-bold mb-1">My Batches</h6>
        <small className="text-muted">Select a batch to manage</small>

        <div className="list-group list-group-flush mt-3">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className={`list-group-item batch-item ${
                batch.id === batchId ? "active" : ""
              }`}
            >
              {/* Batch name */}
              <span
                className="batch-name"
                onClick={() => {
                  const parts = location.pathname.split("/");
                  const currentPage = parts[3] || "dashboard";
                  navigate(`/user/${batch.id}/${currentPage}`);
                }}
              >
                {batch.name}
              </span>

              {/* 3-dot menu */}
              <div className="batch-menu" onClick={(e) => e.stopPropagation()}>
                <i
                  className="fa-solid fa-ellipsis-vertical"
                  onClick={() =>
                    setOpenMenuId(openMenuId === batch.id ? null : batch.id)
                  }
                ></i>

                {/* Rename*/}
                {openMenuId === batch.id && (
                  <div className="batch-dropdown">
                    <button
                      onClick={() => {
                        setSelectedBatch(batch);
                        setModalMode("rename");
                        setIsModalOpen(true);
                        setOpenMenuId(null);
                      }}
                    >
                      <i className="fa-solid fa-pen"></i> Rename
                    </button>

                    {/* Delete*/}
                    <button
                      className="danger"
                      onClick={() => {
                        setSelectedBatch(batch);
                        setModalMode("delete");
                        setIsModalOpen(true);
                        setOpenMenuId(null);
                      }}
                    >
                      <i className="fa-solid fa-trash-can"></i> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <button
          className="btn w-100 addBatchButton"
          onClick={() => {
            setSelectedBatch(null);
            setModalMode("add");
            setIsModalOpen(true);
          }}
        >
          + Add New Batch
        </button>
      </div>
      <BatchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        batch={selectedBatch}
        onSubmit={
          modalMode === "add"
            ? handleAddBatch
            : modalMode === "rename"
              ? handleRenameBatch
              : handleDeleteBatch
        }
      />
    </aside>
  );
};

export default Sidebar;
