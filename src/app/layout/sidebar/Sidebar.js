import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import BatchContext from "../../../context/batch/BatchContext";
import AlertContext from "../../../context/alert/AlertContext";

import "./Sidebar.css";
import BatchModal from "../../../components/batchModal/BatchModal";

const Sidebar = ({ isOpen }) => {
  const backendUrl = "http://localhost:5000/";
  const { batchId } = useParams();
  const navigate = useNavigate();

  const { setActiveBatch } = useContext(BatchContext);
  const { showAlert } = useContext(AlertContext);

  const [openMenuId, setOpenMenuId] = useState(null);

  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null); // "add" | "rename"
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const newBatch = await res.json();

      setBatches((prev) => [...prev, newBatch]);
      setIsModalOpen(false);
      showAlert("Added", "New batch added successfully", "success");
    } catch (error) {
      console.error(error);
    }
  };

  // Rename batch
  const handleRenameBatch = async (name,id) => {
    try {
      await fetch(`${backendUrl}api/batches/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      // update frontend state
      setBatches((prev) =>
        prev.map((b) => (b.id === selectedBatch.id ? { ...b, name } : b)),
      );

      setIsModalOpen(false);
    } catch (err) {
      console.error("Rename failed", err);
    }
  };

  // Delete batch
  const handleDeleteBatch = async (id) => {
    try {
      await fetch(`${backendUrl}api/batches/${id}`, {
        method: "DELETE",
      });

      setIsModalOpen(false);

      if (id === batchId) {
        navigate("/");
      }
      showAlert("Deleted", "Batch deleted successfully", "danger");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch(`${backendUrl}api/batches`)
      .then((res) => res.json())
      .then((data) => setBatches(data))
      .catch((err) => console.error(err));

    const found = batches.find((b) => b.id === batchId);
    if (found) {
      setActiveBatch(found);
    }
  }, [batchId, batches, setActiveBatch]);

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
                  setActiveBatch(batch); // sync context
                  navigate(`/user/${batch.id}/dashboard`);
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
