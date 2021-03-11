import React from 'react'
import Icon from '@mdi/react'
import { mdiFridgeOutline, mdiHomeCityOutline, mdiAccountGroupOutline, mdiBasketOutline } from '@mdi/js';
import { NavLink } from 'react-router-dom'

function SideMenu(props) {
    return(
        <div className="sideMenu">
            <ul className="menuButtons">
                <li>
                    <Icon path={mdiAccountGroupOutline} size={1} /><h4>{props.family ? props.family.name : "Please Log In"}</h4>
                </li>
                <NavLink to='/families/fridges' style={{ color: 'inherit', textDecoration: 'inherit'}} ><li><Icon path={mdiFridgeOutline} size={1} /><h4>My Fridges</h4></li></NavLink>
                <NavLink to='/families/shopping' style={{ color: 'inherit', textDecoration: 'inherit'}} ><li><Icon path={mdiBasketOutline} size={1} /><h4>Shopping Lists</h4></li></NavLink>
                <li>
                    <Icon path={mdiHomeCityOutline} size={1} /><h4>Families</h4>
                </li>
            </ul>
        </div>
    )
}

export default SideMenu