import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Home from "./views/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteView from "./views/NoteView.jsx";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <NoteList /> */}
      {/* <p>What's Up</p> */}
              {/* <Route path="/" element={ <Home className={"overflow-y-hidden"}/>} >
                  <Route path="note/:id" element={<NoteView />} />
                </Route> */}
      <Routes>

        <Route path="/" element={<Home className={"overflow-y-hidden"} />} />
        <Route path="/note/:id" element={<NoteView />} />
      </Routes>
    </>
  );
}

export default App;
