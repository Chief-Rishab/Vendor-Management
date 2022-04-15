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
import { AuthContext } from './Context/AuthContext_consumer';
import {Switch, Routes } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Error from './components/Error';
import NewVendorList from './components/vendorsList';
import NavBar from './components/Navbar';
import UserCart from './components/UserCart';
import VendorListing from './components/vendorListing';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import CustomerRegister from './components/CustomerRegister';
import Registerr from './components/CustomerRegister';
//App.js will contain everything
//imported to index.js
//to show whatever's in index.js, document.getElementById(root)

const App =()=> {
    // const {user,setUser,isAuthenticated,setIsAuthenticated}=useContext(AuthContext);
    // console.log(user);
    // console.log(isAuthenticated);
    return (
        <Router>
        <Navbar/>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            
            <Route path="/about" element={<About/>} />
            
            <Route path="/contact" element={<Contact/>} />
            
            <Route path="/signup" element={<CustomerRegister/>} />
            
            <Route path="/login" element={<Login/>} />

            <Route path="/CustomerRegistration" element={<CustomerRegister/>} />

            <Route path="/vendors" element={<NewVendorList/>} />

            <Route path="/vendors/:id" element={<VendorListing/>} />

            <Route path="/Cart" element={<UserCart/>} />

            {/* show error page if route doesnt match with anything */}
            <Route path="*" element={<Error/>} />
            </Routes>
        </Router>
    )
}

export default App;

