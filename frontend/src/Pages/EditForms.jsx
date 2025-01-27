import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Canvas from '../Components/Canvas';
import { getFormById, updateForm } from '../Lib/ApiHeandler';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditForms = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ form_data: [] });
    const [formName, setFormName] = useState("");
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        fetchForm();
    }, []);

    const fetchForm = async () => {
        try {
            const data = await getFormById(id);
            setForm(data);
            setFormName(data.form_name);
        } catch (error) {
            console.error("Error fetching form data:", error);
        }
    };

    const handleSave = async () => {
        try {
            const updatedForm = { ...form, form_name: formName };
            const res = await updateForm(id, updatedForm);

            if (res.id) {
                alert("Form updated successfully!");
                navigate("/");
            } else {
                alert("Failed to update the form.");
            }
        } catch (error) {
            console.error("Error updating form:", error);
            alert("Failed to update the form.");
        }
    };

    const handlePreview = () => {
        if (!formName || form.form_data.length === 0) {
            alert("Form name and at least one element should be provided");
            return;
        }
        setShowPreview(true);
    };

    const handleClosePreview = () => {
        setShowPreview(false);
    };

    if (!form) return <p>Loading...</p>;

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <div className="form-builder">
                    <header className="header">
                        Form Name:
                        <input
                            type="text"
                            className="form-name-input"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="Enter form name"
                        />
                        <button className="save-button mx-1" onClick={handlePreview}>
                            Preview
                        </button>
                        <button className="save-button mx-1" onClick={handleSave}>
                            Save Changes
                        </button>
                        <Link to="/">
                            <button className="save-button mx-1">
                                Back
                            </button>
                        </Link>
                    </header>
                    <div className="main">
                        <Sidebar />
                        <Canvas
                            formElements={form.form_data || []}
                            setFormElements={(updatedData) => {
                                console.log("Updating Parent State with:", updatedData); // Debugging
                                setForm((prev) => ({
                                    ...prev,
                                    form_data: Array.isArray(updatedData) ? updatedData : [],
                                }));
                            }}
                        />
                    </div>
                </div>

                {/* Preview Modal */}
                <Modal show={showPreview} onHide={handleClosePreview} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{formName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="preview-canvas p-3 border rounded">
                            {form.form_data.map((el, idx) => (
                                <div
                                    key={idx}
                                    className="mb-3 d-flex align-items-center"
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
                                            <label className="me-2">
                                                {el.properties.label || "Label"}:
                                            </label>
                                            <select className="form-control">
                                                {el.properties.options?.map((option, idx) => (
                                                    <option key={idx} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        </>
                                    ) : el.type === "textarea" ? (
                                        <>
                                            <label className="me-2">
                                                {el.properties.label || "Label"}:
                                            </label>
                                            <textarea
                                                placeholder={el.properties.placeholder || "Placeholder"}
                                                required={el.properties.required}
                                                className="form-control"
                                                style={{ flex: 1 }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <label className="me-2">
                                                {el.properties.label || "Label"}:
                                            </label>
                                            <input
                                                type={el.type}
                                                placeholder={el.properties.placeholder || "Placeholder"}
                                                required={el.properties.required}
                                                className="form-control"
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
    );
};

export default EditForms;
