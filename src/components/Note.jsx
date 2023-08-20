import { faPen, faX , faPalette, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useRef, useState, useEffect } from "react";
import { Popover, PopoverTrigger, PopoverContent, PopoverBody, SimpleGrid } from "@chakra-ui/react";
import styles from "../assets/styles/styles.module.css";

function Note({ noteToOpen, setNoteToOpen, isNoteOpen, editNoteTitle, editNoteContent }) {
  const [isEditTitle, setEditTitle] = useState(false);
  const [isEditContent, setEditContent] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContent, setNewNoteContent] = useState("");
  const [currentNote, setCurrentNote] = useState({});//This is the note that is currently being edited

  // Set initial value of newNoteTitle when noteToOpen changes
  useEffect(() => {
    if(noteToOpen){
      setNewNoteTitle(noteToOpen?.title || "");
      setNewNoteContent(noteToOpen?.description || "");
      setCurrentNote(noteToOpen);
    }
  }, [noteToOpen]);

  useEffect(() => {
    console.log("The current note is being updated. probably for the first time")
  }, [currentNote])


  if (!isNoteOpen) {
    return null; // Don't render anything if isOpen is false
  }
  const handleBlurDivClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log("Setting it to null");
      setNoteToOpen(null);
    }
  };
  //Close note function
  const closeNote = () => {
    setNoteToOpen(null);
  };
  const editTitle = () => {
    console.log("Editing note title");
    setEditTitle(true);
  };

  const editContent = () => {
    console.log("Editing note content");
    setEditContent(true);
  };

  const saveTitle = (note) => {
    editNoteTitle(note);
    note.title = newNoteTitle;
    setEditTitle(false);
  };

  const saveContent = (note) => {
    console.log("Saving content");
    editNoteContent(note);
    note.description = newNoteContent;
    setEditContent(false);
  }

  const cancelEditTitle = () => {
    console.log("it should close");
    setEditTitle(false);
  };

  const cancelEditContent = () => {
    console.log("it should close");
    setEditContent(false);
  }

  const handleTitleInputChange = (event) => {
    if (event) {
      setNewNoteTitle(event.target.value);
    }
  };

  const handleContentInputChange = (event) => {
    if (event) {
      setNewNoteContent(event.target.value);
    }
  }

  const colors = [
    { type: "light", color: "bg-slate-200" },
    { type: "light", color: "bg-slate-300" },
    { type: "dark", color: "bg-slate-400" },
    { type: "light", color: "bg-gray-200" },
    { type: "light", color: "bg-gray-300" },
    { type: "dark", color: "bg-gray-400" },
    { type: "light", color: "bg-zinc-200" },
    { type: "light", color: "bg-zinc-300" },
    { type: "dark", color: "bg-zinc-400" },
    { type: "light", color: "bg-neutral-200" },
    { type: "light", color: "bg-neutral-300" },
    { type: "dark", color: "bg-neutral-400" },
    { type: "light", color: "bg-stone-200" },
    { type: "light", color: "bg-stone-300" },
    { type: "dark", color: "bg-stone-400" },
    { type: "light", color: "bg-red-200" },
    { type: "light", color: "bg-red-300" },
    { type: "dark", color: "bg-red-400" },
    { type: "light", color: "bg-orange-200" },
    { type: "light", color: "bg-orange-300" },
    { type: "dark", color: "bg-orange-400" },
    { type: "light", color: "bg-amber-200" },
    { type: "light", color: "bg-amber-300" },
    { type: "dark", color: "bg-amber-400" },
    { type: "light", color: "bg-yellow-200" },
    { type: "light", color: "bg-yellow-300" },
    { type: "dark", color: "bg-yellow-400" },
    { type: "light", color: "bg-lime-200" },
    { type: "light", color: "bg-lime-300" },
    { type: "dark", color: "bg-lime-400" },
    { type: "light", color: "bg-green-200" },
    { type: "light", color: "bg-green-300" },
    { type: "dark", color: "bg-green-400" },
    { type: "light", color: "bg-emerald-200" },
    { type: "light", color: "bg-emerald-300" },
    { type: "dark", color: "bg-emerald-400" },
    { type: "light", color: "bg-teal-200" },
    { type: "light", color: "bg-teal-300" },
    { type: "dark", color: "bg-teal-400" },
    { type: "light", color: "bg-cyan-200" },
    { type: "light", color: "bg-cyan-300" },
    { type: "dark", color: "bg-cyan-400" },
    { type: "light", color: "bg-sky-200" },
    { type: "light", color: "bg-sky-300" },
    { type: "dark", color: "bg-sky-400" },
    { type: "light", color: "bg-blue-200" },
    { type: "light", color: "bg-blue-300" },
    { type: "dark", color: "bg-blue-400" },
    { type: "light", color: "bg-indigo-200" },
    { type: "light", color: "bg-indigo-300" },
    { type: "dark", color: "bg-indigo-400" },
    { type: "light", color: "bg-violet-200" },
    { type: "light", color: "bg-violet-300" },
    { type: "dark", color: "bg-violet-400" },
    { type: "light", color: "bg-purple-200" },
    { type: "light", color: "bg-purple-300" },
    { type: "dark", color: "bg-purple-400" },
    { type: "light", color: "bg-fuchsia-200" },
    { type: "light", color: "bg-fuchsia-300" },
    { type: "dark", color: "bg-fuchsia-400" },
    { type: "light", color: "bg-pink-200" },
    { type: "light", color: "bg-pink-300" },
    { type: "dark", color: "bg-pink-400" },
    { type: "light", color: "bg-rose-200" },
    { type: "light", color: "bg-rose-300" },
    { type: "dark", color: "bg-rose-400" },
  ];


  const selectNewColor = (color) => {
    if(color.color !== currentNote.bg_color){
      currentNote.bg_color = color.color;
      let updatedNote = currentNote;
      setCurrentNote({...updatedNote});
      //editNoteContent is just looking for an id and then it updates the notes array. So I can use it for every single update. The info is being sent already updated in here.
      editNoteContent(currentNote);
      //It doesn't work like this: setCurrentNote(updatedNote);
      console.log(currentNote.bg_color)
    }
    console.log("The color this dude wants for this note is: "+color.color)
    //update the color
  }

  return (
    <div
      id="blurDiv"
      className={
        "absolute inset-0 backdrop-blur-lg justify-center items-center flex"
      // These clases are being repeated in the component NewNoteDialog
      }
      onClick={handleBlurDivClick}
    >
      <div className={"h-full w-8/12 mb-16 pb-20"}>
        <div className={"note rounded-lg shadow-lg mt-10 h-full p-6 "+(currentNote.bg_color || "bg-white")}>
          <div onClick={() => closeNote()} className={"text-left"}>
            <FontAwesomeIcon
              icon={faX}
              className="text-black cursor-pointer m-1 w-4 h-4"
            />
          </div>
          {/* <h3>This is the CURRENT note SELECTED</h3> */}
          <div className="flex items-center mb-4 ">
            <h3
              className={
                "text-lg font-bold flex-grow p-4 " +
                (isEditTitle ? "hidden" : "block")
              }
            >
              {currentNote?.title}
            </h3>
            {/* <input type="text" id="default-input" class="bg-transparent text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-transparent "></input> */}
            <input
              type="text"
              id="noteTitleInput"
              value={newNoteTitle}
              onChange={handleTitleInputChange}
              className={
                "bg-transparent text-gray-900 text-lg font-bold rounded-lg block w-full p-2.5 focus:ring-0 focus:border-transparent  bg-white focus:outline-none  flex items-center justify-center " +
                (isEditTitle ? "block" : "hidden")
              }
            />

            <button
              className={
                "w-4/12 px-3 py-2 right-0 bg-blue-600 text-white btn-sm  " +
                (isEditTitle ? "block" : "hidden")
              }
              onClick={() => saveTitle(noteToOpen)}
            >
              Save changes
            </button>
            <button
              className={
                "px-3 py-2 right-0 bg-red-600 text-white btn-sm  " +
                (isEditTitle ? "block" : "hidden")
              }
              onClick={() => cancelEditTitle()}
            >
              Cancel
            </button>
            <div
              onClick={() => editTitle()}
              className={"text-center  " + (!isEditTitle ? "block" : "hidden")}
            >
              <FontAwesomeIcon
                icon={faPen}
                className="text-blue-800 cursor-pointer m-1 w-3 h-3"
              />
            </div>

          </div>

          <hr
            className={"w-76 h-0.5 mx-2 bg-white border-0 rounded solid"}
          ></hr>
          {/* <hr class="solid"></hr> */}
          <div className="flex items-center justify-center mt-5">
            <span className="mx-1">
              <div
                onClick={() => editContent()}
                className={
                  "text-center " + (!isEditContent ? "block" : "hidden")
                }
                title="Edit the content"
                data-tip="Edit the content"
                data-for="edit-tooltip"
              >
                <FontAwesomeIcon
                  icon={faPen}
                  className="text-blue-800 cursor-pointer mt-4 w-3 h-3"
                />
              </div>

              {/* Add place attribute */}
            </span>
            <span  className="mx-1">
            <Popover>
      <PopoverTrigger>
      <div  className={
                  "text-center " + (!isEditContent ? "block" : "hidden")
                }>
              <FontAwesomeIcon
                icon={faPalette}
                className="text-blue-800 cursor-pointer mt-4 w-4 h-4"
              />
              <ReactTooltip id="edit-tooltip" effect="solid" place="bottom" />{" "}
              </div>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <p className="font-medium  text-sm mt-3">
          Select the color you like the most
          </p>
          <SimpleGrid
      columns={{ sm: 8, md: 7, lg: 8 }}
      spacing={4}
      className="color-items-wrap pr-4 pl-2 py-7"
    >
      {colors.map((color, index) => (
        <div
        className={"m-1 rounded-full cursor-pointer h-5 w-5 p-0.5 "+(color.color) + (color.color == currentNote.bg_color ? " border border-black " : "")}
        onClick={() => {
          selectNewColor(color)
        }}
        key={index}
      >
                      <FontAwesomeIcon
                icon={faCheck}
                className={"text-gray-600 cursor-pointer w-4 h-4 "+ (color.color !== currentNote.bg_color ? "hidden" : "block") }
              />
        </div>
      ))}
    </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>

            </span>
            <button
              className={
                "w-2/12 h-10 right-0 bg-blue-600 text-white mx-1 " +
                (isEditContent ? "block" : "hidden")
              }
              onClick={() => saveContent(noteToOpen)}
            >
              Save Content
            </button>
            <button
              className={
                "w-24 h-10 right-0 bg-red-600 text-white mx-1 "  +
                (isEditContent ? "block" : "hidden")
              }
              onClick={() => cancelEditContent()}
            >
              Cancel
            </button>
          </div>
          <span>
            <p className={`${styles["noteView"]}`+" my-4 overflow-y-scroll px-4  "+(!isEditContent ? "block " : "hidden ") + (currentNote.text_color || "text-white") }
            >{currentNote?.description}</p>
          </span>
          <textarea
              type="text"
              id="noteContentInput"
              value={newNoteContent}
              onChange={handleContentInputChange}
              rows="15"
              className={
                "mt-2 bg-white bg-transparent text-gray-900 text-md font-semibold rounded-lg block w-full p-2.5 focus:ring-0 focus:border-transparent focus:outline-none  flex items-center justify-center " +
                (isEditContent ? "block" : "hidden")
              }
            />
        </div>
        {/* <a>
  ◕‿‿◕
</a> */}
      </div>
    </div>
  );
}

export default Note;
