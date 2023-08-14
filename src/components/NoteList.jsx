import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStickyNote, faTrash } from "@fortawesome/free-solid-svg-icons";

function NoteList({ notes, deleteNote }) {


  const handleDeleteNote = (note) => {
    // console.log(note);
    // let newNotes = notes.filter((n) => n.id !== note.id);
    // setNotes(newNotes);
    // console.log("Deleting a note");
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4">
        <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
        MY NOTEBOOK
      </h1>
      {notes?.map((note, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 ">
          <div className="flex items-center">
            <div className="w-4/5 text-center">
              <h3 className="text-lg font-semibold mb-2 flex-grow">
                {note.title}
              </h3>

              <p className="text-gray-700">{note.description}</p>
            </div>
            <div
              onClick={() => deleteNote(note)}
              className="w-1/5 flex justify-end items-center"
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500 cursor-pointer text-center mx-auto"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
