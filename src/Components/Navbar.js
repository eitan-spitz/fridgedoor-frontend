import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {

    return(
        <div className="navbar">
            <div className="nav-logo">

            </div>
            <ul className="nav-buttons-left">
                <NavLink to='/home' style={{ color: 'inherit', textDecoration: 'inherit'}} ><li>Home</li></NavLink>
                
            </ul>
            <ul className="nav-buttons-right">
                <NavLink to="#" style={{ color: 'inherit', textDecoration: 'inherit'}} onClick={props.showAbout}><li>About</li></NavLink>
                <NavLink to="#" style={{ color: 'inherit', textDecoration: 'inherit'}}><li>Sign Up</li></NavLink>
                <NavLink to="#" style={{ color: 'inherit', textDecoration: 'inherit'}} onClick={props.setFamily} ><li>Log In</li></NavLink>
            </ul>
        </div>
    )
}

export default Navbar