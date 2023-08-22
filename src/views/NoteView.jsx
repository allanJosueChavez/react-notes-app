import { useEffect, useState } from "react";
import useNotesStore from "../store/notesStore/notesStore.js";
import { useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import Note from "../components/Note.jsx";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

function NoteView({ note }) {
  const history = createBrowserHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const storedNotes = useNotesStore((state) => state.storedNotes);
  const [viewNote, setNoteToOpen] = useState({}); //storedNotes.find(note => note.id === parseInt(id))
  const [notes, setNotes] = useState(storedNotes); //[...storedNotes, note
  const [isNoteOpen, setIsNoteOpen] = useState(true);
  const { id } = useParams();
  let noteToOpen = storedNotes.find((note) => note.id === parseInt(id));
  useEffect(() => {
    console.log(storedNotes);

    if (storedNotes && storedNotes.length > 0) {
      console.log(id);
      console.log("There are storedNotes");
      console.log(storedNotes);
      console.log(noteToOpen);
      //const noteToOpen = storedNotes.find(note => note.id === parseInt(id))
      setNoteToOpen(noteToOpen);
      if (noteToOpen == undefined) {
        console.log("AH SIMON");
        ///  noteToOpen = null
        //alert("The note you are trying to open doesn't exist")
        //  onOpen()
        navigate("/");
        //  history.push('/'); // Redirect to the home route
        //redirect to home
        //show modal
      }
    }
  }, [storedNotes]);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const saveUpdatedNote = (note) => {
    console.log("In the component Home, is trying to save the note");
    const currentDateUTC = new Date();
    let updatedNotes = notes.map((n) => {
      if (n.id === note.id) {
        n = note;
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
    //updateStoredNotes(updatedNotes);
  };

  const updateStoredNotes = (updatedNotes) => {
    console.log("editing");
    console.log(updatedNotes);

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <>
      <div
        id="main-container"
        className={"h-screen  mt-2 pb-72 overflow-y-scroll "}
      >
        {viewNote && (
          <Note
            noteToOpen={viewNote}
            setNoteToOpen={setNoteToOpen}
            isNoteOpen={isNoteOpen}
            editNoteSelected={saveUpdatedNote}
          />
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{/* <Lorem count={2} /> */}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Secondary Action</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
}

export default NoteView;
