import React from 'react'
import { NavLink } from 'react-router-dom'

function ShoppingCard(props){
    const shoppinglist = props.shoppinglist
    return (
        <div className="shopping-card">
            <h3>{shoppinglist.name}</h3>
            <NavLink to={`/families/shopping/${shoppinglist.id}`} className="link" ><button>Open</button></NavLink> 
            
        </div>
    )
}

export default ShoppingCard