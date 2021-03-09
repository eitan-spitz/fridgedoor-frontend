import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {

    return(
        <div className="navbar">
            <div className="nav-logo">

            </div>
            <ul className="nav-buttons">
                <NavLink to='/home' style={{ color: 'inherit', textDecoration: 'inherit'}} ><li>Home</li></NavLink>
                <NavLink to='/families/fridges' style={{ color: 'inherit', textDecoration: 'inherit'}} ><li>Fridges</li></NavLink>
                <NavLink to='/families/shopping' style={{ color: 'inherit', textDecoration: 'inherit'}} ><li>Shopping List</li></NavLink>
            </ul>
        </div>
    )
}

export default Navbar