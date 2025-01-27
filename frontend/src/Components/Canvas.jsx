    import React, { useState } from 'react'
    import { useDrop, useDrag } from "react-dnd";
    const Canvas = ({ formElements, setFormElements }) => {
        const [currentElement, setCurrentElement] = useState(null);
        const [showPopup, setShowPopup] = useState(false);

        const [{ isOver }, drop] = useDrop(() => ({
            accept: "element",
            drop: (item) => {
                setCurrentElement({
                    type: item.type,
                    properties: { label: "", placeholder: "", required: false },
                    position: { x: 0, y: 0 },
                });
                setShowPopup(true);
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
            }),
        }));

        const handlePopupSubmit = (updatedProperties) => {
            const newElement = {
                type: currentElement.type,
                properties: updatedProperties,
                position: {
                    x: 0,
                    y: formElements.length, // Increment index dynamically
                },
            };

            const updatedElements = [...formElements, newElement];
            setFormElements(updatedElements); // Update parent state

            setCurrentElement(null);
            setShowPopup(false);
        };

        const handleDelete = (index) => {
            const updatedElements = formElements
                .filter((_, i) => i !== index) // Remove the element
                .map((el, idx) => ({ ...el, position: { ...el.position, y: idx } })); // Recalculate indices

            setFormElements(updatedElements);
        };

        const Element = ({ el, index }) => {
            const [{ isDragging }, drag] = useDrag(() => ({
            type: "existing-element",
            item: { index },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
            }));
        
            return (
            <div
                ref={drag}
                className={`form-element ${isDragging ? "dragging" : ""}`}
                style={{ marginBottom: "10px" }}
            >
                <label>{el.properties.label || "Label"}:</label>
                {el.type === "select" ? (
                <select className="form-control">
                    {el.properties.options.map((option, idx) => (
                    <option key={idx} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
                ) : (
                <input
                    type={el.type}
                    placeholder={el.properties.placeholder || "Placeholder"}
                    required={el.properties.required}
                    className="form-control"
                    style={{ display: "block", marginBottom: "5px" }}
                />
                )}
                <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(index)}
                >
                Delete
                </button>
            </div>
            );
        };

        return (
            <div ref={drop} className={`canvas ${isOver ? "hovered" : ""}`} style={{ padding: "10px", border: "1px solid #ccc" }}>
                {Array.isArray(formElements) &&
                    formElements.map((el, idx) => (
                        <Element key={idx} el={el} index={idx} />
                    ))}
                {showPopup && (
                    <div className="popup" style={{ position: "absolute", background: "#fff", padding: "10px", border: "1px solid #ccc", zIndex: 100 }}>
                        <h3>Set Properties</h3>
                        <label>
                            Label:
                            <input
                                type="text"
                                onChange={(e) =>
                                    setCurrentElement((prev) => ({
                                        ...prev,
                                        properties: { ...prev.properties, label: e.target.value },
                                    }))
                                }
                            />
                        </label>
                        {currentElement?.type === "select" && (
                            <label>
                                Options (comma-separated):
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        setCurrentElement((prev) => ({
                                            ...prev,
                                            properties: {
                                                ...prev.properties,
                                                options: e.target.value.split(","),
                                            },
                                        }))
                                    }
                                />
                            </label>
                        )}
                        <label>
                            Placeholder:
                            <input
                                type="text"
                                onChange={(e) =>
                                    setCurrentElement((prev) => ({
                                        ...prev,
                                        properties: { ...prev.properties, placeholder: e.target.value },
                                    }))
                                }
                            />
                        </label>
                        <label>
                            Required:
                            <input
                                type="checkbox"
                                onChange={(e) =>
                                    setCurrentElement((prev) => ({
                                        ...prev,
                                        properties: { ...prev.properties, required: e.target.checked },
                                    }))
                                }
                            />
                        </label>
                        <button className="btn btn-primary btn-sm" onClick={() => handlePopupSubmit(currentElement.properties)}>
                            OK
                        </button>
                    </div>
                )}
            </div>
        );
    };

    export default Canvas;
