import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //import { Input } from "@material-tailwind/react";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function NewNoteDialog({ isOpen, onClose, addNewNote, notes }) {
  if (!isOpen) {
    return null; // Don't render anything if isOpen is false
  }
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");

  const handleAddNoteClick = () => {
    //it gotta has this format
    //{ title: 'Note 1', content: 'Description of note 1...' },
    const newColor = randomColor();

    const newNote = {
      id: notes.length + 1,
      title: newNoteTitle,
      description: newNoteDescription,
      bg_color: newColor[0],
    //  text_color: chooseTextColor(randomColor)
        text_color : chooseTextColor(newColor[1])
    };
    addNewNote(newNote);
    onClose();
  };

  const colorsNames = [
    "Slate",
    "Gray",
    "Zinc",
    "Neutral",
    "Stone",
    "Red",
    "Orange",
    "Amber",
    "Yellow",
    "Lime",
    "Green",
    "Emerald",
    "Teal",
    "Cyan",
    "Sky",
    "Blue",
    "Indigo",
    "Violet",
    "Purple",
    "Fuchsia",
    "Pink",
    "Rose"
  ];
  

  const colorObjects = [
    { type: "dark", color: "Slate" },
    { type: "dark", color: "Gray" },
    { type: "dark", color: "Zinc" },
    { type: "dark", color: "Neutral" },
    { type: "dark", color: "Stone" },
    { type: "dark", color: "Red" },
    { type: "dark", color: "Orange" },
    { type: "dark", color: "Amber" },
    { type: "light", color: "Yellow" },
    { type: "light", color: "Lime" },
    { type: "light", color: "Green" },
    { type: "light", color: "Emerald" },
    { type: "light", color: "Teal" },
    { type: "light", color: "Cyan" },
    { type: "light", color: "Sky" },
    { type: "light", color: "Blue" },
    { type: "light", color: "Indigo" },
    { type: "light", color: "Violet" },
    { type: "light", color: "Purple" },
    { type: "light", color: "Fuchsia" },
    { type: "light", color: "Pink" },
    { type: "light", color: "Rose" }
  ];
  

  const chooseTextColor = (bg_color)=>{
    console.log("The color will be: "+bg_color)
    if(bg_color.type == "dark"){
        return "text-white"
    }else if(bg_color.type == "light"){
        return "text-black"
    }
  }

  const randomColor = () => {
    const randomColorName = colorObjects[Math.floor(Math.random() * colorObjects.length)];
    const randomNumber = [200, 300, 400][Math.floor(Math.random() * 3)];
    
    return [`bg-${randomColorName.color.toLowerCase()}-${randomNumber}`,randomColorName ];
  };

  const handleInputChange = (event) => {
    setNewNoteTitle(event.target.value);
  };

  const handleBlurDivClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log("Setting it to null");
      //setNoteToOpen(null);
      onClose();
      //onClose is getting the value of setIsDialogOpen to false
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
      <div className="shadow-lg bg-white rounded-lg w-8/12 h-11/12">
        <div
          onClick={() => onClose()}
          className={"float-right cursor-pointer mr-4 mt-2 w-4 h-4"}
        >
          <FontAwesomeIcon
            icon={faX}
            className="text-black cursor-pointer m-1 w-4 h-4"
          />
        </div>
        <div className="m-6">
          <h3 className="m-4">CREATE A NEW NOTE</h3>

          <label
            htmlFor="newNoteTitle"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            New note title
          </label>
          <input
            id="newNoteTitle"
            name="newNoteTitle"
            type="text"
            value={newNoteTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <label
            htmlFor="newNoteDescription"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content
          </label>
          <textarea
            id="newNoteDescription"
            name="newNoteDescription"
            value={newNoteDescription}
            onChange={(event) => setNewNoteDescription(event.target.value)}
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            className="bg-blue-600 mr-4 mt-4"
            onClick={handleAddNoteClick}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewNoteDialog;
