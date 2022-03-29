import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import logo from "../imgs/11.png";

//to prevent refresh from showing
//make the <a> tag to <Navlink and change href to --> to
import { NavLink } from 'react-router-dom'; 

//all these different pages must be rendered inside App.js
//App.js will help to export to index.js
//thru index.js to index.html in public file, which we finally end up seeing visually

//react-router-dom is needed so that everytime u click on
//a new page to go in navbar, the page doesnt reload
//it helps to make the entire web app like a single screen app

const Navbar = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="#">
            <img src={logo} alt="logo" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
            <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item"> 
                <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item"> 
                <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item"> 
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/signup">Registration</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/vendors">Vendor List</NavLink>
            </li>
            </ul>
        </div>
        </nav>
        </>
    )
}

export default Navbar;