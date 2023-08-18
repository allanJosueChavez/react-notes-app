import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../assets/styles/styles.module.css";

import {
  faStickyNote,
  faTrash,
  faEye,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function NoteList({ notes, deleteNote, watchNoteFunction }) {
  const [filteredNotes, setFilteredNotes] = useState([]);
  const bgNotesColors = filteredNotes?.map((note) => {
    return note.bg_color;
  });

  useEffect(() => {
    console.log("bgNotesColors");
    setFilteredNotes(notes)
  }, []);

  const [searchInput,setSearchInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log(filteredNotes)
    const filtered = notes.filter((note) =>{
      console.log(note.title.toLowerCase().includes(searchInput.toLowerCase()))
      console.log(searchInput)
      if(note.title.toLowerCase().includes(searchInput.toLowerCase())){
        console.log("Oh yeah, one match")
        return note
      }
    }

    );

    setFilteredNotes(filtered);
    console.log(notes)
    console.log(filtered)
    // Perform your actions here
    console.log('Form submitted with value:', searchInput);
  };

  const handleInputChange = (event) => {
   setSearchInputValue(event.target.value);
  };


  return (
    <div className="p-4">
      <h1 className="font-bold text-2xl mb-4 p-8">
        <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
        MY NOTEBOOK
      </h1>

      <div className="my-4">
        <form  onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="notes-search"
              value={searchInput}
              onChange={handleInputChange}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-transparent focus:border-transparent "
              placeholder="Search among your notes..."
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-yellow-400 hover:bg-yellow-500  font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-flow-row auto-rows-max sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-4 ">
        {filteredNotes?.map((note, index) => (
          <div
            key={index}
            className={
              "w-48 h-48 relative rounded-lg shadow-md cursor-pointer " +
              (bgNotesColors[index] !== undefined
                ? bgNotesColors[index]
                : "bg-gray-200")
            }
          >
            <h3
              className="text-lg font-bold m-2 flex-grow overflow-hidden whitespace-nowrap text-overflow-ellipsis"
              title={note.title}
            >
              {note.title}
            </h3>

            <p
              title={note.description}
              className={
                `${styles["truncate-overflow"]} text-clip text-justify px-4 py-2 ` +
                (note.text_color || "text_black")
              }
            >
              {note.description}
            </p>

            <div className="absolute bottom-0 flex justify-end items-end p-2 w-full">
              <div
                onClick={() => watchNoteFunction(note)}
                className="text-center "
              >
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-green-500 cursor-pointer m-1 "
                />
              </div>
              <div onClick={() => deleteNote(note)} className="text-center  ">
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
      {/* <div className="w-16 h-16 bg-gray-500"></div>
    <div className="w-16 h-16 bg-gray-300"></div>
    <div className="w-16 h-16 bg-gray-500"></div>
    <div className="w-16 h-16 bg-gray-300"></div>
    <div className="w-16 h-16 bg-gray-500"></div>
    <div className="w-16 h-16 bg-gray-300"></div>
    <div className="w-16 h-16 bg-gray-500"></div>
    <div className="w-16 h-16 bg-gray-300"></div>
    <div className="w-16 h-16 bg-gray-500"></div> */}
      {/* {filteredNotes?.map((note, index) => (
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
