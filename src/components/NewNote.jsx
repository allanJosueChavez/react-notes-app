import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react'


function NewNote({ setIsDialogOpen}){
  //  const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddNoteClick = () => {
        // console.log("isDialogOpen:", isDialogOpen); // Print the value of isDialogOpen
      setIsDialogOpen(true);
      console.log("Adding a new note");
    //   console.log("isDialogOpen:", isDialogOpen); // Print the value of isDialogOpen
    };

    const openDialog = () => {
    };
    
    return(
        <div className="note relative">
            {/* <input type="text" placeholder="Title" />
            <textarea placeholder="Take a note..." rows="3" /> */}
            {/* <button className="bg-red-600" onClick={handleAddNoteClick}>
                Add a new note
            </button> */}
            <button className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-sky-500 mr-4 mt-4 text-white py-2 px-4 hover:bg-blue-700" onClick={handleAddNoteClick} title="Write a new note">
             Write
                <FontAwesomeIcon icon={faPenToSquare} className="ml-2" />
            </button>

            {/* <div className="bg-blue-500 text-white p-4">
  This is a div with Tailwind CSS styles.
</div> */}
        </div>
    );
}

export default NewNote; 