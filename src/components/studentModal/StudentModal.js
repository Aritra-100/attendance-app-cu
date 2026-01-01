import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import "./StudentModal.css";

const modalRoot = document.getElementById("modal-root");

const StudentModal = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    roll: "",
    department: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setForm({
        name: "",
        email: "",
        roll: "",
        department: "",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const { name, email, roll, department } = form;

    if (!name || !email || !roll || !department) return;

    onSubmit({
      id: Date.now(),
      name,
      email,
      roll,
      department,
      attendance: 0,
      faceRegistered: false,
    });

    onClose();
  };

  const isDisabled =
    !form.name || !form.email || !form.roll || !form.department;

  return createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="student-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="student-modal-header">
          <div>
            <h3>Add New Student</h3>
            <p>
              Enter the details for the new student to enroll them in this
              batch.
            </p>
          </div>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="student-modal-body">
          <label>
            Student Name
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              placeholder="john.doe@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </label>

          <label>
            Roll Number
            <input
              type="text"
              name="roll"
              placeholder="20CS101"
              value={form.roll}
              onChange={handleChange}
            />
          </label>

          <label>
            Department
            <input
              type="text"
              name="department"
              placeholder="Computer Science"
              value={form.department}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* FOOTER */}
        <div className="student-modal-actions">
          <button className="cancel-text" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary"
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            <i className="fa-solid fa-user-plus"></i> Add Student
          </button>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default StudentModal;
