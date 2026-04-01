import { createPortal } from "react-dom";
import "../studentModal/StudentModal.css";

const modalRoot = document.getElementById("modal-root");

const StudentDetailsModal = ({ isOpen, student, onClose }) => {
  if (!isOpen || !student) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="student-modal" onClick={(e) => e.stopPropagation()}>
        <div className="student-modal-header">
          <div>
            <h3>Student Details</h3>
            <p>Complete information about this student</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="student-modal-body">
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Roll Number:</strong> {student.roll}
          </p>
          <p>
            <strong>Department:</strong> {student.department}
          </p>
          <p>
            <strong>Institution:</strong> {student.institution}
          </p>
          <p>
            <strong>Face Registered:</strong>{" "}
            {student.faceRegistered ? "Yes" : "No"}
          </p>
        </div>

        <div className="student-modal-actions">
          <button className="cancel-text" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default StudentDetailsModal;
