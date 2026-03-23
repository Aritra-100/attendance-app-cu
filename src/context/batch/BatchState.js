import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BatchContext from "./BatchContext";

const BatchState = ({ children }) => {
  const backendUrl = "http://localhost:5000/";
  const [activeBatch, setActiveBatch] = useState(null);
  const { batchId } = useParams();

  const fetchBatchById = async (id) => {
    try {
      const res = await fetch(`${backendUrl}api/batches/${id}`);
      const data = await res.json();
      setActiveBatch(data);
    } catch (err) {
      console.error("Error fetching batch:", err);
    }
  };

  useEffect(() => {
    if (batchId) {
      fetchBatchById(batchId);
    }
  }, [batchId]);

  return (
    <BatchContext.Provider
      value={{ activeBatch, setActiveBatch, fetchBatchById }}
    >
      {children}
    </BatchContext.Provider>
  );
};

export default BatchState;
