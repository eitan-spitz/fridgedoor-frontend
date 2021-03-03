import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = (props) => {

    return(
        <div className="navbar">
            <div className="nav-logo">

            </div>
            <div className="nav-buttons">
                <NavLink to='/families/fridges' >Fridges</NavLink>
                <NavLink to='/home' >Home </NavLink>
            </div>
        </div>
    )
}

export default Navbar