import React from 'react'
import { useDrag } from "react-dnd";
const Sidebar = () => {
    const elements = [
        { type: "text", name: "Text Input" },
        { type: "textarea", name: "Textarea" },
        { type: "select", name: "Select Dropdown" },
        { type: "checkbox", name: "Checkbox" },
        { type: "radio", name: "Radio Buttons" },
        { type: "date", name: "Date Picker" },
    ];

    const Element = ({ element }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "element",
            item: { type: element.type },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));

        return (
            <div ref={drag} className={`draggable-item ${isDragging ? "dragging" : ""}`}>
                {element.name}
            </div>
        );
    };

    return (
        <>
            <div className="sidebar">
                <h3 className="sidebar-title">Elements</h3>
                {elements.map((el, idx) => (
                    <Element key={idx} element={el} />
                ))}
            </div>
        </>
    )
}

export default Sidebar