import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; //import { Input } from "@material-tailwind/react";
import { faPen, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useToast, Box } from '@chakra-ui/react'
import useColorStore from "../store/designStore/colorStore.js"
import animations from "../assets/styles/animations.module.css";
import { useEffect, useLayoutEffect } from 'react'

function NewNoteDialog({ isOpen, onClose, addNewNote, notes }) {
  if (!isOpen) {
    return null; // Don't render anything if isOpen is false
  }
  const toast = useToast()
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteDescription, setNewNoteDescription] = useState("");
  const colors = useColorStore(state => state.tailwind_colors);
  const [isAnimation, setIsAnimation] = useState(false);

  useLayoutEffect(()=>{
    console.log(isOpen)
    if(isOpen === true){
      console.log("Opening the dialog to create a new note")
      setIsAnimation(true);
    }

  },[])

  const closeDialog = () => {
    setIsAnimation(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }

  const handleAddNoteClick = () => {

    const newColor = randomColor();
    let todaysDate = new Date();
    const newNote = {
      id: notes.length + 1,
      title: newNoteTitle,
      description: newNoteDescription,
      bg_color: newColor[0],
      text_color: chooseTextColor(newColor[1]),
      updated_at: todaysDate,
      created_at: todaysDate,
    };

    try{
    addNewNote(newNote);
      toast({
        title: 'Note created.',
        description: "Thank God. Your thoughts are safe now.",
        status: 'success',
        duration:3000,
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
    closeDialog();
  };



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
    colors[Math.floor(Math.random() * colors.length)];
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
      closeDialog();
      //onClose is getting the value of setIsDialogOpen to false
    }
  };

  return (
    <div
      id="blurDiv"
      className={
        "absolute inset-0 backdrop-blur-lg justify-center items-center flex "+ 
        (isAnimation
          ? `${animations["upOutFloatingPopUp"]}`
          : `${animations["downOutFloatingPopUp"]}`)
      }
      onClick={handleBlurDivClick}
    >
      <div className={"shadow-xl rounded-lg w-10/12 lg:w-6/12 h-4/6  bg-gradient-to-r from-emerald-400 to-sky-500  bg-teal-400 lg:p-5 " }>
        <div
          onClick={() => closeDialog()}
          className={"float-right cursor-pointer mr-4 mt-2 w-4 h-4"}
        >
          <FontAwesomeIcon
            icon={faX}
            className="text-black cursor-pointer m-1 w-4 h-4"
          />
        </div>
        <div className="m-6 ">
          {/* <div className="bg-white p-6 rounded-lg shadow-md"> */}
          <div id="dialog-title" className="mb-4 p-4">
          <p className="lg:text-5xl font-semibold my-2 text-2xl text-white">SOMETHING NEW?</p>
          <p className="text-xl  text-white">Write it...</p>
          </div>
          <div className="my-4">
            <label
              htmlFor="newNoteTitle"
              className="block text-2xl text-white font-normal my-4 text-left"
            >
             Title
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
              className="block text-2xl text-white font-normal my-4 text-left"
            >
              Content
            </label>
            <textarea
              id="newNoteDescription"
              name="newNoteDescription"
              value={newNoteDescription}
              rows="6"
              onChange={(event) => setNewNoteDescription(event.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 lg:rows-20"
            />
          </div>
          <button
            className="bg-blue-700 mr-4 py-2 px-4 text-white hover:text-gray-200  hover:bg-blue-800"
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
