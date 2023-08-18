import NoteList from "../components/NoteList";
import NewNote from "../components/NewNote";
import NewNoteDialog from "../components/NewNoteDialog";
import Note from "../components/Note";
import { useRef, useState, useEffect } from "react";

function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const containerRef = useRef(null);

  const defaultNotes = [
    { id: 0, title: "Note 1", description: "Description of note 1..." },
    { id: 1, title: "Note 2", description: "Description of note 2..." },
    // ...add more default notes
  ];

  const [notes, setNotes] = useState(null);
  const [viewNote, setNoteToOpen] = useState({});

  // Load notes from localStorage when the component mounts
  // useEffect(() => {
  //     const storedNotes = JSON.parse(localStorage.getItem('notes'));
  //     setNotes(storedNotes || defaultNotes);
  // }, []);

  // Save notes to localStorage whenever the notes state changes

  useEffect(() => {
    console.log("Dependent of notes");
    // console.log(notes)
    // const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (notes !== null) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

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
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        console.log("Ouch, you clicked outside of me!");
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
    console.log("It is trynnna open do something");
    console.log(note);
    setNoteToOpen(note);
    console.log(viewNote);
    setIsNoteOpen(true);
  };

  const editNoteTitle = (note) => {
      //find the by the id and change the tile of that note
      console.log("In the component Home, is trying to edit the title")
      let updatedNotes = notes.map((n) => {
          if(n.id === note.id){
              n.title = "EDITED TEST";
          }
          return n;
      })
      setNotes(updatedNotes);
  }

  const editNoteContent = (note) => {
    //find the by the id and change the tile of that note
    console.log("In the component Home, is trying to edit the content")
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
      <div ref={containerRef} className={"  h-screen w-max pb-16 "+`${ (isDialogOpen === true || isNoteOpen === true) ? 'overflow-y-hidden' : 'overflow-y-scroll'  }` }>
        <NewNote setIsDialogOpen={setIsDialogOpen} />

        <NoteList
          notes={notes}
          deleteNote={deleteNote}
          watchNoteFunction={watchNoteFunction}
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
            editNoteTitle={editNoteTitle}
            editNoteContent={editNoteContent}
            />}

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
