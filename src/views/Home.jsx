import NoteList from "../components/NoteList";
import NewNote from "../components/NewNote";
import NewNoteDialog from "../components/NewNoteDialog";
import Note from "../components/Note";
import { useRef, useState, useEffect } from "react";
import animations from "../assets/styles/animations.module.css";
import { CSSTransition } from 'react-transition-group';

function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);

  const defaultNotes = [
    { id: 0, title: "Note 1", description: "Description of note 1..." },
    { id: 1, title: "Note 2", description: "Description of note 2..." },
    // ...add more default notes
  ];

  const [notes, setNotes] = useState(null);
  const [viewNote, setNoteToOpen] = useState({});

  const [filteredNotesVerifier, setFilteredNotesVerifier] = useState(false);


  // Load notes from localStorage when the component mounts
  // useEffect(() => {
  //     const storedNotes = JSON.parse(localStorage.getItem('notes'));
  //     setNotes(storedNotes || defaultNotes);
  // }, []);

  // Save notes to localStorage whenever the notes state changes

  useEffect(() =>{
    if(!notes){
      setFilteredNotesVerifier(true);
    }
  }, [filteredNotesVerifier])

  useEffect(() => {
    console.log("Dependent of notes");
    // console.log(notes)
    // const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (notes !== null) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  
  useEffect(() => {
    // There was an error here, it was being set to true when the viewNote was empty
    // But now with the help of Object.keys().length i can check if the object is empty or not
    // I had to had viewNote because since it was null Object.keys can't read null
    if(viewNote && Object.keys(viewNote).length !== 0){
      console.log(viewNote);
      setIsNoteOpen(true);
    }
  }, [viewNote]);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    console.log("useEffect by default");
    if (notes == null && storedNotes !== null) {
      setNotes(storedNotes);
      console.log({ storedNotes });
    } else if (notes == null) {
      setNotes([]);
    }
    console.log(isNoteOpen)
    console.log(isDialogOpen)
  }, []);

  useEffect(() => {
    console.log("useEffect it's just nuts");
    const handleClickOutside = (event) => {
      console.log(viewNote)
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
        && viewNote !== null && Object.keys(viewNote).length !== 0
      ) {
        console.log("Ouch, you clicked outside of me!");
        setTimeout(() => {

        }, 3000) 
        setNoteToOpen(null);
        setIsDialogOpen(false)
        setIsNoteOpen(false)
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  
  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if ((Math.round(scrollTop - scrollHeight ) * (-1)) === clientHeight) {
        console.log("You've reached the bottom");
    }
};

useEffect(() => {
    const gridElement = document.getElementById('main-container');
    gridElement.addEventListener('scroll', handleScroll);

    return () => {
        gridElement.removeEventListener('scroll', handleScroll);
    };
}, [offset]);
  
  const verifyFilteredNotes = () => {
    console.log("Checking if there's notes or not")
    setFilteredNotesVerifier(true);
  }

  const addNewNote = (newNote) => {
    console.log("Adding a new note");
    console.log(newNote);
    setNotes([...notes, newNote]);
  };

  const deleteNote = (note) => {
    console.log(note);
    let newNotes = notes.filter((n) => n.id !== note.id);
    setNotes(newNotes);
    console.log("Deleting a note");
  };

  const watchNoteFunction = (note) => {
    console.log("It is trynnna open THE NOTE");
    console.log(note);
    setNoteToOpen(note);
    //console.log(viewNote);
    //setIsNoteOpen(true);
  };


  const saveUpdatedNote = (note) => {
    console.log("In the component Home, is trying to save the note")
    let updatedNotes = notes.map((n) => {
        if(n.id === note.id){
            n = note;
        }
        return n;
    })
    setNotes(updatedNotes);
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleBlurDivClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log("Setting it to null");
      setNoteToOpen(null);
    }
  };

  return (
    <>
    {/*pt-16 */}
      <div id="main-container" ref={containerRef} className={"  h-screen  mt-2 pb-72  "+`${ (isDialogOpen === true  ) ? ' overflow-y-hidden ' : ' overflow-y-scroll '  }` + (!filteredNotesVerifier ? " w-max ": "")}>
        <NewNote setIsDialogOpen={setIsDialogOpen} />

        <NoteList
          notes={notes}
          deleteNote={deleteNote}
          watchNoteFunction={watchNoteFunction}
          setFilteredNotesVerifier={verifyFilteredNotes}
        />
        <div>
          {/* <div
          id="blurDiv"
            className={
              "absolute flex inset-0 backdrop-blur-lg justify-center items-center " + (isDialogOpen ? "block" : "hidden")
            }
            onClick={handleBlurDivClick}
          > */}
            {viewNote && 

            <Note 
            noteToOpen={viewNote} 
            setNoteToOpen={setNoteToOpen} 
            isNoteOpen={isNoteOpen} 
            editNoteSelected={saveUpdatedNote}
            className={"" + (!isNoteOpen? `${animations["downOutFloatingPopUp"]}` : " ")}
            />
            }

            {isDialogOpen && (
              <NewNoteDialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                addNewNote={addNewNote}
                notes={notes}
              />
            )}
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default Home;
