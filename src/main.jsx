import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NoteView  from './views/NoteView.jsx'
import Home from './views/Home.jsx'

import './index.css'
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider or any other providers you're using
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter if you're using React Router
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//   <ChakraProvider>
  
//       <Router>
//           <App />
//       </Router>
  
//   </ChakraProvider>
// </React.StrictMode>,
// )


// const router = createBrowserRouter([
//   {
//     path: "/",
//     name: "Home",
//     element: <Home></Home>,
//   },
//   {
//     path: "note/:id",
//     name: "Note",
//      element: <NoteView></NoteView>,
//     //     children: [
//     //   {
//     //     path: '/',
//     //     element: <App></App>,
//     //   },
//     // ],
//   }
// ]);

const router = createBrowserRouter([
  {
    path: '/',
    name: 'Home',
    element: <Home />,
  },
  {
    path: 'note/:id',
    name: 'Note',
    element: <NoteView />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    {/* <Router>
      {router}
    </Router> */}
      <RouterProvider router={router} />
  </ChakraProvider>,
);