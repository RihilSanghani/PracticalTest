import React, { useState } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from '../Components/Sidebar';
import Canvas from '../Components/Canvas';
import { saveForm } from '../Lib/ApiHeandler';
import { useNavigate } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
const CreateForm = () => {
    const [formName, setFormName] = useState("");
    const [formElements, setFormElements] = useState([]);
    const [showPreview, setShowPreview] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formName || formElements.length === 0) {
            alert('Form name and at least one element should be provided');
            return;
        }

        const formData = {
            form_name: formName,
            form_data: formElements,
        };
        const res = saveForm(formData);
        if (!res.id) {
            navigate('/');
        } else {
            alert('There is something wrong with server: 404');
        }
    };

    const handlePreview = () => {
        if (!formName || formElements.length === 0) {
            alert('Form name and at least one element should be provided');
            return;
        }
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };
    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="form-builder">
                    <header className="header">
                        <input
                            type="text"
                            className="form-name-input"
                            placeholder="Form Name"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                        />
                        <button className="save-button mx-1" onClick={handlePreview}>Preview</button>
                        <button className="save-button mx-1" onClick={handleSubmit}>Save Form</button>
                    </header>
                    <div className="main">
                        <Sidebar />
                        <Canvas formElements={formElements} setFormElements={setFormElements} />
                    </div>
                </div>

                {/* Modal for Preview */}
                <Modal show={showPreview} onHide={handleClosePreview} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{formName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="preview-canvas">
                            {formElements.map((el, idx) => (
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
                                    ) : el.type === "select" ? (
                                        <>
                                            <label style={{ marginRight: "10px", flexShrink: 0 }}>{el.properties.label || "Label"}:</label>
                                            <select className="form-control" style={{ flex: 1 }}>
                                                {el.properties.options?.map((option, idx) => (
                                                    <option key={idx} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    ) : el.type === "textarea" ? (
                                        <>
                                            <label style={{ marginRight: "10px", flexShrink: 0 }}>{el.properties.label || "Label"}:</label>
                                            <textarea
                                                placeholder={el.properties.placeholder || "Placeholder"}
                                                required={el.properties.required}
                                                className="form-control"
                                                style={{ flex: 1 }}
                                            />
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
                        <Button variant="secondary" onClick={handleClosePreview}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClosePreview}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </DndProvider>
        </>
    )
}

export default CreateForm