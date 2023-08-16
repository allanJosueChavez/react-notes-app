import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStickyNote,
  faTrash,
  faEye,
  faPen
} from "@fortawesome/free-solid-svg-icons";

function NoteList({ notes, deleteNote, watchNoteFunction }) {
  const handleDeleteNote = (note) => {
    // console.log(note);
    // let newNotes = notes.filter((n) => n.id !== note.id);
    // setNotes(newNotes);
    // console.log("Deleting a note");
  };

  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4 p-8">
        <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
        MY NOTEBOOK
      </h1>
      <div className="grid grid-flow-row auto-rows-max sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-4 ">
        {notes?.map((note, index) => (
          <div key={index} className=" w-48 h-48 bg-gray-200 relative rounded-lg shadow-md">
            <h3 className="text-lg font-bold m-2 flex-grow">
              {note.title}
            </h3>

            <p className="text-gray-700">{note.description}</p>
            <div className="absolute bottom-0 flex justify-end items-end p-2  w-full">

              <div
                onClick={() => watchNoteFunction(note)}
                className="text-center "
              >
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-green-500 cursor-pointer m-1 "
                />
              </div>
              <div
                onClick={() => deleteNote(note)}
                className="text-center  "
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className=" text-red-500 cursor-pointer m-1"
                />
              </div>
              {/* <div
                onClick={() => deleteNote(note)}
                className="text-center  "
              >
                <FontAwesomeIcon
                  icon={faPen}
                  className=" text-blue-500 cursor-pointer m-1"
                />
              </div> */}
            </div>
          </div>
        ))}
      </div>
      {/* <div class="w-16 h-16 bg-gray-500"></div>
    <div class="w-16 h-16 bg-gray-300"></div>
    <div class="w-16 h-16 bg-gray-500"></div>
    <div class="w-16 h-16 bg-gray-300"></div>
    <div class="w-16 h-16 bg-gray-500"></div>
    <div class="w-16 h-16 bg-gray-300"></div>
    <div class="w-16 h-16 bg-gray-500"></div>
    <div class="w-16 h-16 bg-gray-300"></div>
    <div class="w-16 h-16 bg-gray-500"></div> */}
      {/* {notes?.map((note, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4 ">
          <div className="flex items-center">
            <div className="w-4/5 text-center">
              <h3 className="text-lg font-semibold mb-2 flex-grow">
                {note.title}
              </h3>

              <p className="text-gray-700">{note.description}</p>
            </div>
            <div className="w-1/5 flex justify-end items-center">
              <div
                onClick={() => deleteNote(note)}
                className="text-center mx-auto"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-500 cursor-pointer "
                />
              </div>
              <div
                onClick={() => watchNote(note)}
                className="text-center mx-auto"
              >
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-green-500 cursor-pointer "
                />
              </div>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
}

export default NoteList;
