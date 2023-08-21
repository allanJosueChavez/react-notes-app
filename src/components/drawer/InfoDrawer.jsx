import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Stack,
  Box,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  Divider,
} from "@chakra-ui/react";

import { useRef, useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faBook,
  faCalendarCheck,
  faCalendarAlt,
  faAlignJustify,
} from "@fortawesome/free-solid-svg-icons";

function DrawerNoteInfo({ isDrawerOpen, onDrawerClose, selectedNote }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
const [currentNote, setCurrentNote] = useState(selectedNote)
const [textCounter, setTextCounter] = useState({
    words: 0,
    characters: 0,
  });

  //old const firstField = React.useRef()
  const firstField = useRef(null);


  useEffect(() => {
    if (isDrawerOpen) {
      onOpen();
    }

  }, []);

  useEffect(() => {
    if(currentNote){
        // Count words by splitting the string into an array of words
        const words = currentNote.description.split(/\s+/).filter(word => word !== ''); // Remove empty strings
        const wordCount = words.length;
        
        // Count characters by removing spaces and punctuation
        const characters = currentNote.description.replace(/[\s\.,?!]/g, ''); // Remove spaces and common punctuation
        const characterCount = characters.length;
        setTextCounter({ words: wordCount, characters: characterCount });
    }
  },[currentNote])


  const closeDrawer = () => {
    onClose();
    setTimeout(() => {
      onDrawerClose();
    }, 300);
  };

  return (
    <>
      {/* <Button colorScheme='teal' onClick={onOpen}>
          Create user
        </Button> */}
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={firstField}
        onClose={closeDrawer}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            {/* Create a new account */}
            <p className="font-normal">Info</p>
          </DrawerHeader>

          <DrawerBody>
            <div className="flex items-center">
              <div
                className={"h-8 w-8 mr-4 px-2 py-2 " + selectedNote.bg_color}
              >
                {/* faAlignJustify */}
                <FontAwesomeIcon
                  icon={faAlignJustify}
                  className="text-white text-xl"
                />
              </div>
              <p className="text-3xl text-center font-normal">
                {selectedNote?.title.toUpperCase()}
              </p>
            </div>
            <Divider orientation="horizontal" className="my-4" />
            <div>
              <div className="flex items-center my-3">
                <FontAwesomeIcon
                  icon={faFileLines}
                  className="text-zinc-600 cursor-pointer m-1 w-4 h-4 mr-2"
                  title="Count of words and characters"
                />
                <p>
                {textCounter.words} Word(s) , {textCounter.characters} Character(s) <br />
                </p>
              </div>
              <div className="flex items-center my-3">
                <FontAwesomeIcon
                  icon={faBook}
                  className="text-zinc-600 cursor-pointer m-1 w-4 h-4 mr-2"
                  title="Belongs to"
                  id="notebook-name"
                />
                My Notebook
              </div>
              <div className="flex items-center my-3">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-zinc-600 cursor-pointer m-1 w-4 h-4 mr-2"
                  title="Created at"
                />
                {new Date(selectedNote.created_at).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })}
              </div>
              <div className="flex items-center my-3">
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  className="text-zinc-600 cursor-pointer m-1 w-4 h-4 mr-2"
                  title="Updated at"
                />
                          {new Date(selectedNote.updated_at).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })}
              </div>
            </div>
            {/* Share stuff right here */}
            {/* <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Name</FormLabel>
                <Input
                  ref={firstField}
                  id="username"
                  placeholder="Please enter user name"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="url">Url</FormLabel>
                <InputGroup>
                  <InputLeftAddon>http://</InputLeftAddon>
                  <Input
                    type="url"
                    id="url"
                    placeholder="Please enter domain"
                  />
                  <InputRightAddon>.com</InputRightAddon>
                </InputGroup>
              </Box>

              <Box>
                <FormLabel htmlFor="owner">Select Owner</FormLabel>
                <Select id="owner" defaultValue="segun">
                  <option value="segun">Segun Adebayo</option>
                  <option value="kola">Kola Tioluwani</option>
                </Select>
              </Box>

              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea id="desc" />
              </Box>
            </Stack> */}
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button
              colorScheme="white"
              variant="outline"
              mr={3}
              onClick={() => {
                closeDrawer();
              }}
            >
              Close
            </Button>
            {/* <Button colorScheme="blue">Submit</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default DrawerNoteInfo;
