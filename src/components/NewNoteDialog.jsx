//import { Input } from "@material-tailwind/react";

import { useState } from "react";

function NewNoteDialog({ isOpen, onClose, addNewNote, notes }) {
    if (!isOpen) {
        return null; // Don't render anything if isOpen is false
    }
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteDescription, setNewNoteDescription] = useState('');

    const handleAddNoteClick = () => {
            //it gotta has this format
            //{ title: 'Note 1', content: 'Description of note 1...' }, 
            const newNote = { id:notes.length+1, title: newNoteTitle, description: newNoteDescription };
            addNewNote(newNote);
            onClose();
    }

    const handleInputChange = (event) => {
        setNewNoteTitle(event.target.value);
    };

    return (
        <div className="shadow-lg bg-200-zinc w-80 h-72">
            <div className="m-6">
                <h3 className="m-4">CREATE A NEW NOTE</h3>

            <label htmlFor="newNoteTitle" className="block text-gray-700 text-sm font-bold mb-2">New note title</label>
<input 
    id="newNoteTitle" 
    name="newNoteTitle" 
    type="text" 
    value={newNoteTitle}  
    onChange={handleInputChange}
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
/>
<label htmlFor="newNoteDescription" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
<input 
    id="newNoteDescription" 
    name="newNoteDescription" 
    value={newNoteDescription}
    onChange={(event) =>setNewNoteDescription(event.target.value)} 
    type="text" 
    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
/>
<button className="bg-blue-600 mr-4 mt-4" onClick={handleAddNoteClick}>
                Create 
            </button>
            </div>

        </div>
    );
}

export default NewNoteDialog;
