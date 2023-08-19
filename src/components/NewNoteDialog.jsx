import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //import { Input } from "@material-tailwind/react";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useToast, Box } from '@chakra-ui/react'


function NewNoteDialog({ isOpen, onClose, addNewNote, notes }) {
  if (!isOpen) {
    return null; // Don't render anything if isOpen is false
  }
  const toast = useToast()
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
      text_color: chooseTextColor(newColor[1]),
    };
    try{
    addNewNote(newNote);
      toast({
        title: 'Note created.',
        description: "Thank God. Your note is now safe.",
        status: 'success',
        duration: 2500,
        isClosable: true,
        bg:"#a3e635"
        // render: () => (
        //   <Box color='white' p={3} bg="#a3e635">
        //     Hello World
        //   </Box>
        // ),
      })
    }catch(error){
      toast({
        title: 'An error occurred.',
        description: "We've created your account for you.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
    onClose();
  };

  const colorObjects = [
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

  const chooseTextColor = (bg_color) => {
    console.log("The color will be: " + bg_color.color+ " and the type is: "+bg_color.type);
    if (bg_color.type == "dark") {
      return "text-white";
    } else if (bg_color.type == "light") {
      return "text-black";
    }
  };

  const randomColor = () => {
    const randomColorName =
      colorObjects[Math.floor(Math.random() * colorObjects.length)];
    //const randomNumber = [200, 300, 400][Math.floor(Math.random() * 3)];

    return [randomColorName.color, randomColorName];
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
      <div className="shadow-lg rounded-lg w-7/12 h-11/12 bg-gray-100">
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
          {/* <div className="bg-white p-6 rounded-lg shadow-md"> */}
          <div id="dialog-title" className="mb-4 p-4">
          <p className="text-4xl font-semibold my-2">SOMETHING NEW?</p>
          <p className="text-xl text-gray-500">Write a new note...</p>
          </div>
          <div className="my-6">
            <label
              htmlFor="newNoteTitle"
              className="block text-2xl text-gray-500 font-semibold my-4"
            >
             Note title
            </label>
            <input
              id="newNoteTitle"
              name="newNoteTitle"
              type="text"
              value={newNoteTitle}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="my-6">
            <label
              htmlFor="newNoteDescription"
              className="block text-2xl text-gray-500 font-semibold my-4"
            >
              Note Content
            </label>
            <textarea
              id="newNoteDescription"
              name="newNoteDescription"
              value={newNoteDescription}
              rows="10"
              onChange={(event) => setNewNoteDescription(event.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            className="bg-blue-600 mr-4 mt-4 py-2 px-4 text-white hover:text-gray-200  hover:bg-blue-700"
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
