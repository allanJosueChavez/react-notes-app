import NoteList from '../components/NoteList'
import NewNote from    '../components/NewNote'
import NewNoteDialog from '../components/NewNoteDialog'
import { useState, useEffect } from 'react'

function Home() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const defaultNotes = [
        { id:0, title: 'Note 1', description: 'Description of note 1...' },
        { id:1, title: 'Note 2', description: 'Description of note 2...' },
        // ...add more default notes
    ];

    const [notes, setNotes] = useState(null);

    // Load notes from localStorage when the component mounts
    // useEffect(() => {
    //     const storedNotes = JSON.parse(localStorage.getItem('notes'));
    //     setNotes(storedNotes || defaultNotes);
    // }, []);

    // Save notes to localStorage whenever the notes state changes
    useEffect(() => {
        console.log("Dependent of notes")
        // console.log(notes)
        // const storedNotes = JSON.parse(localStorage.getItem('notes'));
        if(notes !== null){
            localStorage.setItem('notes', JSON.stringify(notes));
        }
        // if(storedNotes !== notes){
        //     
        //     setNotes(storedNotes);
        // }

    }, [notes]);
    
    useEffect(() => {
        const storedNotes = JSON.parse(localStorage.getItem('notes'));
        console.log("useEffect by default")
        if(notes== null && storedNotes !== null){
            setNotes(storedNotes);
            console.log({storedNotes});
        }else if(notes == null){
            setNotes([]);
        }

    }, []);

    const addNewNote = (newNote) => {
        console.log("Adding a new note");
        console.log(newNote);
        setNotes([...notes, newNote]);
    }

    const deleteNote = (note) => {

        console.log(note);
        let newNotes = notes.filter((n) => n.id !== note.id);
        setNotes(newNotes);
        console.log("Deleting a note");
      };

    const closeDialog = () => {
      setIsDialogOpen(false);
    };

    return (
        <>
         <NewNote setIsDialogOpen={setIsDialogOpen} />
        <NoteList notes={notes} deleteNote={deleteNote}/>
    {/* {isDialogOpen && <NewNoteDialog />} */}
        <NewNoteDialog isOpen={isDialogOpen} onClose={closeDialog}  addNewNote={addNewNote} notes={notes}/>
        </>
    )
}

export default Home