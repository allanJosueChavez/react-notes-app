import NoteList from "../components/NoteList";
import NewNote from "../components/NewNote";
import NewNoteDialog from "../components/NewNoteDialog";
import { useParams } from 'react-router-dom';
import Note from "../components/Note";
import { useRef, useState, useEffect } from "react";
import animations from "../assets/styles/animations.module.css";
import { CSSTransition } from "react-transition-group";
import styles from "../assets/styles/styles.module.css";
function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const containerRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const { id } = useParams();
  const defaultNotes = [
    { id: 0, title: "Note 1", description: "Description of note 1..." },
    { id: 1, title: "Note 2", description: "Description of note 2..." },
    // ...add more default notes
  ];

  const [notes, setNotes] = useState(null);
  const [viewNote, setNoteToOpen] = useState({});
  const [isNotesLoading, setIsNotesLoading] = useState(false);

  const [filteredNotesVerifier, setFilteredNotesVerifier] = useState(false);
  const storedNotes = JSON.parse(localStorage.getItem("notes"));
  const [isShowingNote, setIsShowingNote] = useState(false);


  // Load notes from localStorage when the component mounts
  // useEffect(() => {
  //     const storedNotes = JSON.parse(localStorage.getItem('notes'));
  //     setNotes(storedNotes || defaultNotes);
  // }, []);

  // Save notes to localStorage whenever the notes state changes

  useEffect(() => {
    if (!notes) {
      setFilteredNotesVerifier(true);
    }
  }, [filteredNotesVerifier]);

  useEffect(() => {
    console.log("useEffect Dependent of notes");
    if (notes !== null) {
      console.log("Updating or creating or deleting, or something");
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes]);

  useEffect(() => {
    // Use the id parameter in your component logic
    console.log(typeof id)
    const noteId = parseInt(id)
    if(noteId !== undefined && noteId !== null && noteId !== "" && !isNaN(noteId)){
      console.log("Yes, THERE IS A OPEN NOTE")
      setIsShowingNote(true)
      const note = storedNotes.find((note) => note.id === noteId);
      setNoteToOpen(note);
    } 
    // I just ran a "git push -set-upstream origin feat-note-new-tab" in order to stablish the relationship, so i'll try to do just a push, now that the relationship is already made and see if that works.
  }, [id]);

  useEffect(() => {
    // There was an error here, it was being set to true when the viewNote was empty
    // But now with the help of Object.keys().length i can check if the object is empty or not
    // I had to had viewNote because since it was null Object.keys can't read null
    if (viewNote && Object.keys(viewNote).length !== 0) {
      console.log(viewNote);
      setIsNoteOpen(true);
    }
  }, [viewNote]);

  useEffect(() => {
    //I'mma set it at the top >>> const storedNotes = JSON.parse(localStorage.getItem("notes"));
    console.log("useEffect by default");
    if (notes == null && storedNotes !== null) {
      setNotes(storedNotes);
      // showingNotes = notesPerLoad
      //  const notesPerReach = storedNotes.slice(0, showingNotes);
      //  setNotes(notesPerReach);
      console.log({ storedNotes });
     // updateUrlToCloseNote()
    } else if (notes == null) {
      setNotes([]);
    }
    console.log(isNoteOpen);
    console.log(isDialogOpen);
  }, []);

  useEffect(() => {
    console.log("useEffect it's just nuts");
    const handleClickOutside = (event) => {
      console.log(viewNote);
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        viewNote !== null &&
        Object.keys(viewNote).length !== 0
      ) {
        console.log("Ouch, you clicked outside of me!");
        setTimeout(() => {}, 3000);
        setNoteToOpen(null);
        setIsDialogOpen(false);
        setIsNoteOpen(false);

      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    let userPosition = Math.round(scrollTop - scrollHeight) * -1
    console.log(userPosition+ " " +clientHeight)
    // It has a margin of error of 3px
    if (userPosition >= clientHeight - 5 && userPosition <= clientHeight + 3) {
      console.log("You've reached the bottom");
      
      setIsNotesLoading(true)
      // showingNotes = showingNotes + notesPerLoad
      // console.log("showing:" +notesPerLoad+ " notes")
      // const notesPerReach = storedNotes.slice(0, showingNotes);
      // setNotes(notesPerReach);
      // setIsNotesLoading(false)
    }
  };

  const setNotesLoadingFalse = () => {
    setIsNotesLoading(false)
  }

  useEffect(() => {
    const gridElement = document.getElementById("main-container");
    gridElement.addEventListener("scroll", handleScroll);

    return () => {
      gridElement.removeEventListener("scroll", handleScroll);
    };
  }, [offset]);

  const verifyFilteredNotes = () => {
    console.log("Checking if there's notes or not");
    setFilteredNotesVerifier(true);
  };

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
    updateUrlToWatchNote(note.id)
    //console.log(viewNote);
    //setIsNoteOpen(true);
  };

  const updateUrlToWatchNote = (noteId) => {
    const newUrl = `/app/notecards/${noteId}`;
    window.history.pushState(null, null, newUrl);
  }

  const updateUrlToCloseNote = ( ) => {
    const newUrl = `/app/notecards/`;
    window.history.pushState(null, null, newUrl);
  }

  const saveUpdatedNote = (note) => {
    console.log("In the component Home, is trying to save the note");
    const currentDateUTC = new Date();


    let updatedNotes = notes.map((n) => {
      if (n.id === note.id) {
        n = note;
        // Get the current UTC date and time
        // Update n.updated_at with the current UTC date and time
        n.updated_at = currentDateUTC;
        console.log(
          "Nueva fecha de actualización: " +
            n.updated_at +
            " de la nota: " +
            n.title
        );
      }
      return n;
    });
    setNotes(updatedNotes);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleBlurDivClick = (event) => {
    if (event.target === event.currentTarget) {
      console.log("Setting it to null");
      setNoteToOpen(null);
    }
  };


  const updateNotesFromList = (updatedNotes) => {
    setNotes(updatedNotes)
  }

  return (
    <>
      {/*pt-16 */}
      <div className={`${styles["main-container-notelist"]}`}>
      <div
        id="main-container"
        ref={containerRef}
        className={
          `  h-screen  mt-2 pb-48 overflow-y-scroll p-8  ` +
          +
(!filteredNotesVerifier ? " w-max " : "")  
        }
      >
        <NewNote setIsDialogOpen={setIsDialogOpen} />

        <NoteList
          notes={notes}
          deleteNote={deleteNote}
          watchNoteFunction={watchNoteFunction}
          setFilteredNotesVerifier={verifyFilteredNotes}
          isNotesLoading={isNotesLoading}
          setNotesLoadingFalse={setNotesLoadingFalse}
          updateNotesFromList={updateNotesFromList}
        />
        <div>
          {/* <div
          id="blurDiv"
            className={
              "absolute flex inset-0 backdrop-blur-lg justify-center items-center " + (isDialogOpen ? "block" : "hidden")
            }
            onClick={handleBlurDivClick}
          > */}
          {viewNote && (
            <Note
              noteToOpen={viewNote}
              setNoteToOpen={setNoteToOpen}
              isNoteOpen={isNoteOpen}
              editNoteSelected={saveUpdatedNote}
              
            />
          )}

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
      </div>
    </>
  );
}

export default Home;
