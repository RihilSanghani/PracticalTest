import React, { useState } from 'react'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from '../Components/Sidebar';
import Canvas from '../Components/Canvas';
const CreateForm = () => {
    const [formName, setFormName] = useState("");
    const [formElements, setFormElements] = useState([]);

    const saveForm = () => {
        const formData = {
            formName,
            formData: formElements,
        };
        console.log(formData);
    }
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
                        <button className="save-button" onClick={saveForm}>Save Form</button>
                    </header>
                    <div className="main">
                        <Sidebar />
                        <Canvas formElements={formElements} setFormElements={setFormElements} />
                    </div>
                </div>
            </DndProvider>
        </>
    )
}

export default CreateForm