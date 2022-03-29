// import './App.css';
// import React from 'react';
// import Form from './common/form';
// import NavBar from './components/navbar';
// import Navigation from './components/Navbar'
// import TextField from "@mui/material/TextField";

// function App() {

  
//   return (
//       <main className='container'>
//         <NavBar />
//         <div style={{ marginTop: 80 }}>
//           <Form />
//         </div>
//       </main>
//   );
// }

// export default App;

import React from 'react'
import {Switch,Route, Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from './components/Error';
import NavBar from './components/Navbar';

//App.js will contain everything
//imported to index.js
//to show whatever's in index.js, document.getElementById(root)
const App = () => {
    return (
        <>
        <Navbar/>
            <Routes>
            <Route path="/" element={<Home/>} />
            
            <Route path="/about" element={<About/>} />
            
            <Route path="/contact" element={<Contact/>} />
            
            <Route path="/signup" element={<Signup/>} />
            
            <Route path="/login" element={<Login/>} />

            <Route path="/vendors" element={<Navbar/>} />

            {/* show error page if route doesnt match with anything */}
            <Route path="*" element={<Error/>} />
            </Routes>
        </>
    )
}

export default App;

