import { useState, useEffect, useContext } from "react";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

import BatchContext from "../../context/batch/BatchContext";
import "./Layout.css";

const Layout = () => {
  const { userId, batchId } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { fetchBatchById } = useContext(BatchContext);
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (batchId) {
      fetchBatchById(batchId);
    } else {
      fetchBatchById(null);
    }
    //eslint-disable-next-line
  }, [batchId]);

  return (
    <>
      <Navbar
        toggleSidebar={() => setSidebarOpen((p) => !p)}
        isSidebarOpen={sidebarOpen}
      />

      <div className="d-flex">
        <Sidebar isOpen={sidebarOpen} />

        <main
          className="flex-grow-1 p-4"
          style={{
            marginLeft: sidebarOpen ? "280px" : "0",
            transition: "margin 0.3s ease",
          }}
        >
          {/* CONDITIONAL RENDER BASED ON URL */}
          {!batchId ? (
            <div className="empty-state">
              <h2>Select a batch</h2>
              <p>
                Please choose a batch from the sidebar to continue,{" "}
                {storedUser?.name || "User"}.
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </>
  );
};

export default Layout;
