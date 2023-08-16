import NoteList from "../components/NoteList";
import NewNote from "../components/NewNote";
import NewNoteDialog from "../components/NewNoteDialog";
import Note from "../components/Note";
import { useRef, useState, useEffect } from "react";

function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const containerRef = useRef(null);

  const defaultNotes = [
    { id: 0, title: "Note 1", description: "Description of note 1..." },
    { id: 1, title: "Note 2", description: "Description of note 2..." },
    // ...add more default notes
  ];

    const [notes, setNotes] = useState(null);
    const [viewNote, setNoteToOpen] = useState(null);

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
  }, []);

  useEffect(() => {
    console.log("useEffect it's just nuts")
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        console.log("Ouch, you clicked outside of me!")
        setNoteToOpen(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
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

  const watchNoteFunction = (note) =>{
    setNoteToOpen(note);
    console.log(viewNote);
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleBlurDivClick = (event) => {
    if (event.target === event.currentTarget) {
        setNoteToOpen(null);
    }
  };

  return (
    <>


<div  ref={containerRef} className="relative">
  <NewNote setIsDialogOpen={setIsDialogOpen} />
  <NewNoteDialog
    isOpen={isDialogOpen}
    onClose={closeDialog}
    addNewNote={addNewNote}
    notes={notes}
  />
  <NoteList notes={notes} deleteNote={deleteNote} watchNoteFunction={watchNoteFunction} />
<div >
{viewNote && (
    <div className="absolute inset-0 backdrop-blur-lg flex justify-center items-center " onClick={handleBlurDivClick}>
        <div className="">
      <Note noteToOpen={viewNote} />

        </div>
    </div>
  )}
</div>

</div>
    </>
  );
}

export default Home;
