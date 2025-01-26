import React, { useState } from 'react'
import { useDrop, useDrag } from "react-dnd";
const Canvas = ({ formElements, setFormElements }) => {
    const [currentElement, setCurrentElement] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    // Drop functionality for new elements
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

    // Submit popup form
    const handlePopupSubmit = (updatedProperties) => {
        setFormElements((prev) => [
            ...prev,
            {
                ...currentElement,
                properties: updatedProperties,
                position: { x: 0, y: formElements.length * 50 }, // Default position
            },
        ]);
        setCurrentElement(null);
        setShowPopup(false);
    };

    // Drag functionality for existing elements
    const Element = ({ el, index }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
          type: "existing-element",
          item: { index },
          collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
          }),
        }));
      
        const [{ isOver }, drop] = useDrop(() => ({
          accept: "existing-element",
          hover: (item) => {
            if (item.index !== index) {
              const newElements = [...formElements];
              const draggedElement = newElements.splice(item.index, 1)[0];
              newElements.splice(index, 0, draggedElement);
              setFormElements(newElements);
            }
          },
        }));
      
        return (
          <div
            ref={(node) => drag(drop(node))}
            className={`form-element ${isDragging ? "dragging" : ""}`}
          >
            <label>{el.properties.label}:</label>
            <input
              type={el.type}
              placeholder={el.properties.placeholder}
              required={el.properties.required}
              readOnly
            />
            <button
              className="delete-button"
              onClick={() =>
                setFormElements((prev) => prev.filter((_, i) => i !== index))
              }
            >
              Delete
            </button>
          </div>
        );
      };
    return (
        <>
            <div ref={drop} className={`canvas ${isOver ? "hovered" : ""}`}>
                {formElements.map((el, idx) => (
                    <Element key={idx} el={el} index={idx} />
                ))}
                {showPopup && (
                    <div className="popup">
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
                        <button onClick={() => handlePopupSubmit(currentElement.properties)}>
                            OK
                        </button>
                    </div>
                )}
            </div>
        </>
    )
}

export default Canvas