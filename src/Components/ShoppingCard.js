import React from 'react'
import { NavLink } from 'react-router-dom'

function ShoppingCard(props){
    const shoppinglist = props.shoppinglist
    return (
        // important detail, props hold family id as well so will come in handy when refactoring pathway
        <div className="shopping-card">
            <h3>Shopping List Name: {shoppinglist.name}</h3>
            <NavLink to={`/families/shopping/${shoppinglist.id}`} className="link" ><button>Open</button></NavLink> 
            
        </div>
    )
}

export default ShoppingCard