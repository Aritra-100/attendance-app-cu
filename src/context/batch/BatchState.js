import { useState } from "react";
import BatchContext from "./BatchContext";

const BatchState = ({ children }) => {
  const backendUrl = "http://localhost:5000/";
  const [activeBatch, setActiveBatch] = useState(null);

  const fetchBatchById = async (id) => {
    if (!id) {
      setActiveBatch(null);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${backendUrl}api/batches/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch batch");
      }

      setActiveBatch(data);
    } catch (err) {
      console.error("Error fetching batch:", err);
    }
  };

  return (
    <BatchContext.Provider
      value={{ activeBatch, setActiveBatch, fetchBatchById }}
    >
      {children}
    </BatchContext.Provider>
  );
};

export default BatchState;
