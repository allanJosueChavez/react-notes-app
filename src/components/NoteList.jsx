import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../assets/styles/styles.module.css";
import { useToast, Box } from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
//import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons';
import {
  faStickyNote,
  faTrash,
  faEye,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

function NoteList({
  notes,
  deleteNote,
  watchNoteFunction,
  setFilteredNotesVerifier,
}) {
  const [filteredNotes, setFilteredNotes] = useState(null);
  //I learned how to use useState in order to use a prop and not use it directly, it's better if I create an intern state inside
  // the child component and with that I can edit the value and mutate it as I want it.
  const [contextMenuPosition, setContextMenuPosition] = useState({
    left: 0,
    top: 0,
  });
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const toast = useToast();
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const bgNotesColors = filteredNotes?.map((note) => {
    return note.bg_color;
  });

  useEffect(() => {
    console.log("it's going to set the setfilteredNotes");

    setFilteredNotes(notes);
    if (notes && notes.length !== 0) {
      notes.map((note) => {
        const isoDate = new Date(note.updated_at);
        const formattedDate = isoDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        note.last_update_date = formattedDate;
      });
    }
  }, [notes]);

  useEffect(() => {
    const parentDiv = parentRef.current;
    if (parentDiv) {
      console.log(parentDiv);
      //Considering it's always css-r6z5ec, I can use it, but if it changes, I'll have to change it.

      const childDiv = parentDiv.querySelector(".css-r6z5ec"); // Replace with your child div class or selector
      if (childDiv) {
        childDiv.style.inset = `0 0 0 0`;
        childDiv.style.top = `${contextMenuPosition.top}px`;
        childDiv.style.left = `${contextMenuPosition.left}px`;
        childDiv.style.position = "fixed";
        childDiv.style.minWidth = "200px";
        childDiv.style.width = "15%";
      }
    }
  }, [isContextMenuOpen]);
  // If I delete filterednotes from the parameters it does not work.
  // Well, I just got it, what? I just got it, because it makes sense that whenever the fuck react wants to set the value to
  // notes it'll be exected the useEffect. So is that easy, if you wanna use a prop and set it to another state, wait for it, that simple.

  const [searchInput, setSearchInputValue] = useState("");
  const [lastSearchInput, setLastSearchInput] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (searchInput === lastSearchInput) {
      console.log("Same search input as before, skipping processing.");
      return;
    }
    const filtered = notes.filter((note) => {
      if (note.title.toLowerCase().includes(searchInput.toLowerCase())) {
        console.log("Oh yeah, one match");
        return note;
      }
    });

    setFilteredNotes(filtered);
    setLastSearchInput(searchInput); // Update the last search input
    if (filtered.length == 0) {
      setFilteredNotesVerifier(); // This is going to apply a w-max to my main div so the design is not compromised
    }

    console.log("Form submitted with value:", searchInput);
  };

  const handleInputChange = (event) => {
    setSearchInputValue(event.target.value);
  };

  const handleRightClickOnNote = (event, note) => {
    console.log("The selected note is: " + note.title);
    setSelectedNote(note);
    // Thank God note is going to give me the note I want to manipulate so I can give it to a new state and then use it in the context menu

    event.preventDefault(); // Prevent the default context menu behavior
    // Your custom logic for handling the right-click event
    setContextMenuPosition({ left: event.clientX, top: event.clientY });
    console.log(contextMenuPosition);
    console.log(event.clientX + " " + event.clientY);
    setIsContextMenuOpen(true);

    console.log("Right-click event occurred");
  };

  const closeContextMenu = () => {
    setIsContextMenuOpen(false);
  };

  const holi = () => {
    console.log("Holi");
  };

  const watchNote = (note) => {
    watchNoteFunction(note);
    //animation right here when opened
  };

  const deleteSelectedNote = (note) => {
    try {
      deleteNote(note);
      toast({
        title: "Note deleted",
        description: "Like you said, I threw it away!",
        status: "warning",
        duration: 2500,
        isClosable: true,
      });
    } catch (error) {
      console.log("There's no function to watch the note");
    }
  };

  return (
    <div id="notebook" className="p-4 w-full  mt-8 lg:mt-0">
      <h1 className="font-bold text-2xl mb-4 p-8">
        <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
        MY NOTEBOOK
      </h1>

      <div className="my-4">
        <form onSubmit={handleSubmit}>
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
              placeholder={"Search among your notes..."}
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

      <div
        id="notes-grid"
        className={
          " grid grid-flow-row auto-rows-max sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-4 " +
          (filteredNotes && filteredNotes.length == 0 ? "w-12/12" : "")
        }
      >
        {filteredNotes?.map((note, index) => (
          <div
            onContextMenu={(event) => handleRightClickOnNote(event, note)}
            onClick={() => watchNoteFunction(note)}
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
              {/* <div
                onClick={() => watchNote(note)}
                className="text-center "
              >
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-green-500 cursor-pointer m-1 "
                />
              </div> */}
              {/* <div onClick={() => deleteSelectedNote(note)} className="text-center absolute" title="Delete note" >
                <FontAwesomeIcon
                  icon={faTrash}
                  className=" text-red-500 cursor-pointer m-1"
                />
              </div> */}
              <div
                className="text-center absolute text-slate-700"
                title={
                  "Last update was at: " +
                  `${note.updated_at ? note.last_update_date : "Unknown"}`
                }
              >
                <p>{note.updated_at ? note.last_update_date : "Unknown"} </p>
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
            {/*   {isContextMenuOpen && (
        <div
        className="h-40 w-40 bg-red-200 relative visible  inset-1"
        left={`${contextMenuPosition.left}px`}
        top={`${contextMenuPosition.top}px`}
        >
        <Menu
          id="noteMenu"
          isOpen={isContextMenuOpen}
          onClose={closeContextMenu}
          className={"absolute"}
          position="absolute"
          direction="rtl"
          
        >


  <MenuList>
    <MenuItem command='⌘T'>
      New Tab
    </MenuItem>
    <MenuItem   command='⌘N'>
      New Window
    </MenuItem>
    <MenuItem command='⌘⇧N'>
      Open Closed Tab
    </MenuItem>
    <MenuItem   command='⌘O'>
      Open File...
    </MenuItem>
  </MenuList>
        </Menu>

        </div>
      )} */}
          </div>
        ))}
      </div>
      {filteredNotes && filteredNotes.length == 0 && (
        <div className="w-full  h-5/6  my-44 text-center text-3xl">
          <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            YOU STILL DON'T HAVE ANY NOTE. <br />
          </p>
          <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">
            WRITE SOME!
          </p>
        </div>
      )}
      {isContextMenuOpen && (
        <div id="divBeforeNoteMenu" ref={parentRef}>
          <Menu
            id="noteMenu"
            isOpen={isContextMenuOpen}
            onClose={closeContextMenu}
          >
            {/* <MenuButton  as={Button} rightIcon={<ChevronDownIcon />}>
        {isOpen ? 'Close' : 'Open'}
      </MenuButton> */}

            <MenuList>
              <MenuItem command="Ctrl+N" onClick={() => holi()}>
                Open in a new tab
              </MenuItem>
              <MenuItem command="⌘N">Select</MenuItem>
              <MenuItem command="⌘⇧N">Share</MenuItem>
              <MenuDivider />
              <MenuItem command="⌘I">Info</MenuItem>
              <MenuItem command="⌘F">Favorite</MenuItem>
              <MenuItem command="⌘O">Lock</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => watchNote(selectedNote)}
                isFocusable={false}
              >
                View note
                <FontAwesomeIcon
                  icon={faEye}
                  className="text-emerald-500 cursor-pointer mx-2"
                />
              </MenuItem>
              <MenuItem onClick={() => deleteSelectedNote(selectedNote)}>
                Delete note
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-red-500 cursor-pointer mx-2"
                />
              </MenuItem>
            </MenuList>
          </Menu>
          {/* <Menu>
    <>

      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem onClick={() => alert('Kagebunshin')}>Create a Copy</MenuItem>
      </MenuList>
    </>
</Menu> */}
        </div>
      )}
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
