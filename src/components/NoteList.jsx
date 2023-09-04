import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../assets/styles/styles.module.css";

import { useToast, Box } from "@chakra-ui/react";
import animations from "../assets/styles/animations.module.css";
import Drawer from "./drawer/InfoDrawer.jsx";
import { useNavigate } from "react-router-dom";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
//import { HamburgerIcon, AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons';
import {
  faStickyNote,
  faTrash,
  faEye,
  faPen,
  faFilter,
  faCheck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
let notesPerLoad = 10;
let showingNotes = 0;
function NoteList({
  notes,
  deleteNote,
  watchNoteFunction,
  setFilteredNotesVerifier,
  isNotesLoading,
  setNotesLoadingFalse,
  updateNotesFromList,
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
  const [isThereAnyNote, setIsThereAnyNote] = useState(false); // This is going to be used to check if there's any note in the array, if there's not, then I'll show a message
  const [selectedNotes, setSelectedNotes] = useState([]); // This is going to be used to check if there's any note in the array, if there's not, then I'll show a message
  const [notUpdateNotes, setNotUpdateNotes] = useState(false); // This is going to be used to check if there's any note in the array, if there's not, then I'll show a message
  const [filterTabSelected, setFilterTabSelected] = useState(null); // This is going to be used to check if there's any note in the array, if there's not, then I'll show a message
  const toast = useToast();
  const parentRef = useRef(null);
  const childRef = useRef(null);

  const bgNotesColors = filteredNotes?.map((note) => {
    if (note) {
      return note.bg_color;
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("it's going to set the setfilteredNotes, because it's chaning");
    setIsThereAnyNote(true);
if(!notUpdateNotes){
  if (notes && notes.length > 0) {
    //setFilteredNotes(notes);
    showingNotes = notesPerLoad;
    const notesPerReach = notes.slice(0, notesPerLoad);
    console.log(notesPerLoad);
    setFilteredNotes(notesPerReach);

    notes.map((note) => {
      // Parse the note.updated_at string into a Date object
      const isoDate = new Date(note.updated_at);
      // console.log(note.updated_at);
      // console.log(isoDate);
      // Get the month and day from the Date object
      const month = isoDate.toLocaleString("en-US", { month: "short" });
      const day = isoDate.getDate();

      // Create the formatted date string
      const formattedDate = `${month} ${day}`;

      note.last_update_date = formattedDate;
    });
  } else {
    console.log("There's no notes to show");
    setIsThereAnyNote(false);
    if (notes) {
      setFilteredNotes(notes);
    }
  }
}
setNotUpdateNotes(false)
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

  useEffect(() => {
    if (notes && notes.length > filteredNotes.length && filteredNotes.length !== notes.length) {
      console.log("Give me more notes");
      setTimeout(() => {
        showingNotes = showingNotes + notesPerLoad;
        console.log("showing: " + showingNotes + " notes");
        let notesPerReach = notes.slice(0, showingNotes);
  
        if (filterTabSelected !== null) {
          // if (filterTabSelected === "all") {
          //   setNotesLoadingFalse();
          // } else if (filterTabSelected === "contents") {
          //   notesPerReach = notesPerReach.filter(note => note.description.toLowerCase().includes(searchInput.toLowerCase()));
          // } else if (filterTabSelected === "titles") {
          //   notesPerReach = notesPerReach.filter(note => note.title.toLowerCase().includes(searchInput.toLowerCase()));
          // } else if (filterTabSelected === "favorites") {
          //   notesPerReach = notesPerReach.filter(note => note.isFavorite);
          // } else {
          //   console.log("No valid filter selected.");
          // }
          
        }
  
        console.log("FILTERED NOTES BY PAGE: " + notesPerReach.length);
        setFilteredNotes(notesPerReach);
        setNotesLoadingFalse();
      }, 500);
    } else {
      console.log("I'm not looking for more notes");
      setNotesLoadingFalse();
    }
  }, [isNotesLoading]);
  

  const [searchInput, setSearchInputValue] = useState("");
  const [lastSearchInput, setLastSearchInput] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    if (searchInput === lastSearchInput) {
      console.log("Same search input as before, skipping processing.");
      return;
    }
    const filtered = notes.filter((note) => {
      if (
        note.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        note.description.toLowerCase().includes(searchInput.toLowerCase())
      ) {
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

  const openInNewTab = (noteId) => {
    // Encode noteId to Base64
    const base64NoteId = btoa(noteId.toString());
  
    // Encode it twice
    const doubleEncodedNoteId = encodeURIComponent(base64NoteId);
    const url = `/app/notecards/${doubleEncodedNoteId}`;
    window.open(url, "_blank"); // Open in a new tab
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

  const showDrawerInfo = () => {
    setIsDrawerOpen(true);
  };

  const featureInDevelopment = () => {
    toast({
      title: "Sorry 😬",
      description: "This feature is still in development!",
      status: "info",
      duration: 3000,
      //icon: "👋",
      isClosable: true,
    });
  };

  const allTheNotes = () => {
    console.log("search in all the notes");
    setFilterTabSelected("all");
    const filtered = notes.filter((note) => {
      if (
        note.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        note.description.toLowerCase().includes(searchInput.toLowerCase())
      ) {
        return note;
      }
    });

    setFilteredNotes(filtered);
  };

  const searchInContents = () => {
    setFilterTabSelected("contents");
    const filtered = notes.filter((note) => {
      if (note.description.toLowerCase().includes(searchInput.toLowerCase())) {
        return note;
      }
    });

    setFilteredNotes(filtered);
  };

  const searchInFavorites = () =>{
    setFilterTabSelected("favorites");
    const filtered = notes.filter((note) => {
      if (note.isFavorite) {
        return note;
      }
    });

    setFilteredNotes(filtered);
  }

  const searchInTitles = () => {
    setFilterTabSelected("titles");
    const filtered = notes.filter((note) => {
      if (note.title.toLowerCase().includes(searchInput.toLowerCase())) {
        return note;
      }
    });

    setFilteredNotes(filtered);
  };

  const sorbyUpdatedDateAsc = () => {
    const sorted = [...notes].sort((a, b) => {
      return new Date(a.updated_at) - new Date(b.updated_at);
    });
    setFilteredNotes(sorted);
  };

  const sorbyUpdatedDateDesc = () => {
    const sorted = [...notes].sort((a, b) => {
      return new Date(b.updated_at) - new Date(a.updated_at);
    });
    setFilteredNotes(sorted);
  };

  const sorbyCreatedDateAsc = () => {
    const sorted = [...notes].sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });
    setFilteredNotes(sorted);
  };

  const sorbyCreatedDateDesc = () => {
    const sorted = [...notes].sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    setFilteredNotes(sorted);
  };

  const selectNote = (note) => {
    // Update the isSelected property of the note
    note.isSelected = true;
    // Add the selected note to the selectedNotes array
    setSelectedNotes([...selectedNotes, note]);
  };

  const markAsFavorite = (note) => {
    console.log("marking as favorite");
    notes = filteredNotes.map((n) => {
      if (n.id == note.id){
        n.isFavorite = true;
      }
      return n;
    })
    updateNotesFromList(notes);
    setNotUpdateNotes(true);
    setFilteredNotes([...notes]);

    //This code it's great, the problem comes when I call the updatenotesFromList. That updates 
    // and that's cool, so the problem is that I need to send a flag, to the useeffect
    // that it's in here, and when it's for favorites, do not update visually on 
    // whatever logic it is using.

    // I can't just update the whole notes because it's going to save only the filtered ones.
    // I need to update the whole notes and kind of refresh the filtered ones.
    //updateNotesFromList(notes);
  };

  // const deleteSelectedNotes = async () =>{
  //   console.log(selectedNotes)
  //   if(selectedNotes && selectedNotes.length>0){
  //     let notesUpdated
  //     selectedNotes.forEach(async (note)=>{
  //     console.log(note)
  //     // await deleteNote(note)
  //       notesUpdated = notes.filter((n) => n.id !== note.id);
  //     })
  //     setFilteredNotes(notesUpdated)
  //     // notes = notesUpdated
  //     stopNotesSelection()
  //   }
  // }
  const deleteSelectedNotes = async () => {
    console.log(selectedNotes);
    if (selectedNotes && selectedNotes.length > 0) {
      let notesUpdated = notes.filter(
        (note) =>
          !selectedNotes.some((selectedNote) => selectedNote.id === note.id)
      );
      setFilteredNotes(notesUpdated);
      stopNotesSelection(notesUpdated);
      updateNotesFromList(notesUpdated);
      // Update the main state.
      // Assuming you have an async deleteNote function, you can call it here
      // for each selected note if needed.
      // for (const note of selectedNotes) {
      //   await deleteNote(note);
      // }
    }
  };

  const stopNotesSelection = (notesUpdated) => {
    console.log("STOPPING SELECTION OF NOTES");
    if(notesUpdated && notesUpdated.length>0){
      notesUpdated = notesUpdated.map((note) => {
        note.isSelected = false;
        return note;
      });
      setFilteredNotes([...notesUpdated]);
    }
    setSelectedNotes([]);
  };

  const cancelSelection = () => {
    console.log("CANCELLING SELECTION OF NOTES");
    if(filteredNotes && filteredNotes.length>0){
      let notes =  filteredNotes.map((note) => {
        note.isSelected = false;
        return note;
      });
      setFilteredNotes([...notes]);
    }
    setSelectedNotes([]);
  }

  return (
    <div id="notebook" className="p-4 w-full  mt-8 lg:mt-0 z-10">
      <h1 className="font-bold text-2xl mb-4 p-8">
        <FontAwesomeIcon icon={faStickyNote} className="mr-2" />
        MY NOTEBOOK
      </h1>

      <div className="my-4">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
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
      <div className="my-5 grid grid-cols-6">
        <div className="col-span-6 flex justify-center">
          <Tabs>
            <TabList>
              <Tab onClick={() => allTheNotes()}>All</Tab>
              <Tab onClick={() => searchInTitles()}>TItles</Tab>
              <Tab onClick={() => searchInContents()}>Contents</Tab>
              <Tab onClick={() => searchInFavorites()}>Favorites</Tab>
              {/* <Tab onClick={()=> featureInDevelopment()}>Notebook</Tab> */}
            </TabList>

            {/* <TabPanels>
      <TabPanel>
        <p>one!</p>
      </TabPanel>
      <TabPanel>
        <p>two!</p>
      </TabPanel>
      <TabPanel>
        <p>three!</p>
      </TabPanel>
    </TabPanels> */}
          </Tabs>
        </div>
      </div>
      <div className="relative h-16 w-full">
        {/* <div class="absolute top-0 right-0 h-16 w-16 ...">03</div> */}
        <div className="absolute top-0 right-0 mr-4 ">
          <Menu>
            <MenuButton as={Button}>
              <FontAwesomeIcon
                icon={faFilter}
                className=" text-gray-600 cursor-pointer mx-1"
              />
              Filter
            </MenuButton>
            <MenuList>
              {/* <MenuItem>Shared</MenuItem>
            <MenuItem>Favorites </MenuItem> */}
              {/* <MenuDivider /> */}
              <MenuItem onClick={() => sorbyUpdatedDateAsc()}>
                Updated date ↑
              </MenuItem>
              <MenuItem onClick={() => sorbyUpdatedDateDesc()}>
                Updated date ↓
              </MenuItem>
              <MenuItem onClick={() => sorbyCreatedDateAsc()}>
                Created date ↑
              </MenuItem>
              <MenuItem onClick={() => sorbyCreatedDateDesc()}>
                Created date ↓
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      {selectedNotes?.length > 0 && (
        <div className="my-4 right-0 z-30 grid grid-cols-6">
          <div className="col-span-1 flex justify-center">
            <p className="text-gray-600 text-lg font-bold">
              {selectedNotes.length} selected
            </p>
          </div>
          <div className="col-span-4 flex justify-center">
          <Button
            borderColor={{ bg: "red.500" }}
            colorScheme={{ bg: "red.500" }}
            _hover={{ bg: "red.600" }}
            className="bg-red-500 border-2 border-red-200 hover:bg-red-500 mx-2"
            onClick={() => deleteSelectedNotes()}
          >
            <FontAwesomeIcon icon={faTrash} className=" cursor-pointer mx-1" />
            Trash
          </Button>
          <div className="col-span-4">

          </div>


        <Button
          colorScheme='red.600' variant='outline'
          className="bg-white-500 border-2 border-red-200 hover:bg-gray-200 text-red-500 mx-2"
          onClick={() => cancelSelection()}
        >
          <FontAwesomeIcon icon={faTrash} className=" cursor-pointer mx-1" />
          Cancel
        </Button>
        </div>
      </div>
      )}
      <div
        id="notes-grid"
        className={
          " grid grid-flow-row auto-rows-max sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-4 " +
          (filteredNotes !== null && filteredNotes.length == 0 ? "w-12/12" : "")
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
                : "bg-gray-200") +
              ` ${animations["upOutFloatingPopUp"]}` +
              (note?.isSelected ? " filter brightness-50 " : "")
            }
          >
            <h3
              className="text-lg font-bold m-2 flex-grow overflow-hidden whitespace-nowrap text-overflow-ellipsis"
              title={note?.title}
            >
              {note?.title}
            </h3>

            <p
              title={note?.description}
              className={
                `${styles["truncate-overflow"]} text-clip text-justify px-4 py-2 ` +
                (note?.text_color || "text_black")
              }
            >
              {note?.description}
            </p>
            {note?.isSelected && (
              <div className="absolute bottom-70  justify-center items-center flex p-2 w-full">
                <FontAwesomeIcon
                  icon={faCheck}
                  className=" text-white text-3xl cursor-pointer "
                />
              </div>
            )}
            {note?.isFavorite && (
              <div className="absolute bottom-0 flex justify-start items-end p-2 w-full">
                <div>
                  <FontAwesomeIcon
                    icon={faStar}
                    className=" text-yellow-400 cursor-pointer m-1"
                  />
                </div>
              </div>
            )}
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
                  `${note?.updated_at ? note.last_update_date : "Unknown"}`
                }
              >
                <p>{note?.updated_at ? note.last_update_date : "Unknown"} </p>
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
      {/* <Stack>
  <Skeleton width="30px" height='20px' />
  <Skeleton height='20px' />
  <Skeleton height='20px' />
</Stack> */}
      {isNotesLoading && (
        <div className="flex justify-center items-center mt-20">
          <SkeletonCircle size="5" className="mx-2" />
          <SkeletonCircle size="5" className="mx-2" />
          <SkeletonCircle size="5" className="mx-2" />
          <SkeletonCircle size="5" className="mx-2" />
          <SkeletonCircle size="5" className="mx-2" />
        </div>
      )}

      {!isThereAnyNote && notes && notes.length == 0 && (
        <div
          className={
            "w-full  h-5/6  my-44 text-center text-3xl " +
            `${animations["upOutLowerLeftCorner"]}`
          }
        >
          <p
            className={
              "font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 "
            }
          >
            YOU STILL DON'T HAVE ANY NOTE. <br />
          </p>
          <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">
            WRITE SOME!
          </p>
        </div>
      )}
      {isThereAnyNote && filteredNotes && filteredNotes.length == 0 && (
        <div
          className={
            "w-full  h-5/6  my-44 text-center text-3xl " +
            `${animations["upOutLowerLeftCorner"]}`
          }
        >
          <p
            className={
              "font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 "
            }
          >
            Oops! Seems like there's no match <br />
          </p>
          <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500">
            {/* WRITE SOME! */}
          </p>
        </div>
      )}
      {isContextMenuOpen && (
        <div id="divBeforeNoteMenu" ref={parentRef} className="z-50">
          <Menu
            id="noteMenu"
            isOpen={isContextMenuOpen}
            onClose={closeContextMenu}
            className="z-50"
          >
            {/* <MenuButton  as={Button} rightIcon={<ChevronDownIcon />}>
        {isOpen ? 'Close' : 'Open'}
      </MenuButton> */}

            <MenuList>
              <MenuItem
                command="Ctrl+N"
                onClick={() => openInNewTab(selectedNote.id)}
              >
                Open in a new tab
              </MenuItem>
              <MenuItem command="⌘N" onClick={() => selectNote(selectedNote)}>
                Select
              </MenuItem>
              <MenuItem command="⌘⇧N" onClick={() => featureInDevelopment()}>
                Share
              </MenuItem>
              <MenuDivider />
              <MenuItem command="⌘I" onClick={() => showDrawerInfo()}>
                Info
              </MenuItem>
              <MenuItem
                command="⌘F"
                onClick={() => markAsFavorite(selectedNote)}
              >
                Mark as Favorite
              <FontAwesomeIcon icon={faStar} className="text-yellow-400 mx-2" />

              </MenuItem>
              <MenuItem command="⌘L" onClick={() => featureInDevelopment()}>
                Lock
              </MenuItem>
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

      {isDrawerOpen && (
        <Drawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          onDrawerClose={() => setIsDrawerOpen(false)}
          selectedNote={selectedNote}
        />
      )}
    </div>
  );
}

export default NoteList;
