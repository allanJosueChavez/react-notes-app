import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NoteView  from './views/NoteView.jsx'
import {
  createBrowserRouter,
   
} from "react-router-dom";
import './index.css'
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider or any other providers you're using
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter if you're using React Router

// const router = createBrowserRouter([
//   {
//     path: "/",
//     name: "Home",
//     element: <App></App>,
//   },
//   {
//     path: "/note/:id",
//     name: "Note",
//     element: <NoteView></NoteView>,
//         children: [
//       {
//         path: '/',
//         element: <App></App>,
//       },
//     ],
//   }
//]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <ChakraProvider>
      <Router>
          <App />
      </Router>
  </ChakraProvider>
</React.StrictMode>,
)
