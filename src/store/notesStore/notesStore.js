
import  { create }  from 'zustand';
//const [notes, setNotes] = useState(null);

    const storedNotes = JSON.parse(localStorage.getItem("notes"));

    const notesStore = create((set) => ({
        storedNotes: storedNotes,
    })  ) 

  export default notesStore;
