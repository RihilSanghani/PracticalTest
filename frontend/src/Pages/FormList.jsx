import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllForms } from '../Lib/ApiHeandler';

const FormList = () => {
  const [forms, setForms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    const data = await getAllForms();
    if (data) {
      setForms(data);
    }
  };

  const handleViewForm = (form) => {
    setSelectedForm(form);
    setShowModal(true);
  };

  const handleEditForm = (formId) => {
    navigate(`/form/edit/${formId}`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedForm(null);
  };
  const handleCreateForm = () => {
    navigate(`/createform`);
  };
  return (
    <>
      <div className="form-list container mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Form List</h2>
          <button className="btn btn-success" onClick={handleCreateForm}>
            Create New Form
          </button>
        </div>
        <ul className="list-group mt-3">
          {forms.map((form) => (
            <li key={form._id} className="list-group-item d-flex justify-content-between align-items-center">
              <span
                className="form-name"
                style={{ cursor: "pointer" }}
                onClick={() => handleViewForm(form)}
              >
                {form.form_name}
              </span>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleEditForm(form._id)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>

        {/* Modal for previewing form */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedForm?.form_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="preview-canvas">
              {selectedForm?.form_data.map((el, idx) => (
                <div
                  key={idx}
                  style={{ position: "relative", marginBottom: "15px", display: "flex", alignItems: "center" }}
                  className="preview-element"
                >
                  {el.type === "checkbox" || el.type === "radio" ? (
                    <>
                      <input
                        type={el.type}
                        checked={el.properties.required}
                        style={{ marginRight: "10px" }}
                      />
                      <label>{el.properties.label || "Label"}</label>
                    </>
                  ) : (
                    <>
                      <label style={{ marginRight: "10px", flexShrink: 0 }}>{el.properties.label || "Label"}:</label>
                      <input
                        type={el.type}
                        placeholder={el.properties.placeholder || "Placeholder"}
                        required={el.properties.required}
                        className="form-control"
                        style={{ flex: 1 }}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseModal}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  )
}

export default FormList