import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useRef, useState, useEffect } from "react";

function Note({ noteToOpen, setNoteToOpen, isNoteOpen, editNoteTitle }) {
  const [isEditTitle, setEditTitle] = useState(false);
  const [isEditContent, setEditContent] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  // Set initial value of newNoteTitle when noteToOpen changes
  useEffect(() => {
    setNewNoteTitle(noteToOpen?.title || "");
  }, [noteToOpen]);

  if (!isNoteOpen) {
    return null; // Don't render anything if isOpen is false
  }
  const handleBlurDivClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log("Setting it to null");
      setNoteToOpen(null);
    }
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

  const cancelEditTitle = () => {
    console.log("it should close");
    setEditTitle(false);
  };

  const handleTitleInputChange = (event) => {
    if (event) {
      setNewNoteTitle(event.target.value);
    }
  };

  return (
    <div
      id="blurDiv"
      className={
        "absolute inset-0 backdrop-blur-lg justify-center items-center flex"
      }
      onClick={handleBlurDivClick}
    >
      <div className={"h-auto w-8/12"}>
        <div className="note rounded-lg shadow-lg bg-purple-200 mt-10  h-full p-6">
          {/* <h3>This is the CURRENT note SELECTED</h3> */}
          <div className="flex items-center">
            <h3
              className={
                "text-lg font-bold flex-grow p-4 " +
                (isEditTitle ? "hidden" : "block")
              }
            >
              {noteToOpen?.title}
            </h3>
            {/* <input type="text" id="default-input" class="bg-transparent text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-transparent "></input> */}
            <input
              type="text"
              id="noteTitleInput"
              value={newNoteTitle}
              onChange={handleTitleInputChange}
              className={
                "bg-transparent text-gray-900 text-lg font-bold rounded-lg block w-full p-2.5 focus:ring-0 focus:border-transparent focus:outline-none  flex items-center justify-center " +
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
            className={"w-76 h-0.5 mx-2 bg-gray-400 border-0 rounded solid"}
          ></hr>
          {/* <hr class="solid"></hr> */}
          <div className="flex items-center">
            <span>
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
              <ReactTooltip id="edit-tooltip" effect="solid" place="bottom" />{" "}
              {/* Add place attribute */}
            </span>
            <button
              className={
                "w-4/12 px-3 py-2 right-0 bg-blue-600 text-white btn-sm  " +
                (isEditContent ? "block" : "hidden")
              }
              onClick={() => saveTitle(noteToOpen)}
            >
              Save Content
            </button>
            <button
              className={
                "px-3 py-2 right-0 bg-red-600 text-white btn-sm  " +
                (isEditContent ? "block" : "hidden")
              }
              onClick={() => cancelEditTitle()}
            >
              Cancel
            </button>
          </div>
          <span>
            <p className="text-gray-700 my-4">{noteToOpen?.description}</p>
          </span>
        </div>
        {/* <a>
  ◕‿‿◕
</a> */}
      </div>
    </div>
  );
}

export default Note;
