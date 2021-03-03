import React from 'react'
import { NavLink } from 'react-router-dom'

function FridgeCard(props){
    const fridge = props.fridge
    return (
        // important detail, props hold family id as well so will come in handy when refactoring pathway
        <div className="fridge-card">
            <h3>Fridge Name: {fridge.name}</h3>
            <NavLink to={`/families/fridges/${fridge.id}`} className="link" ><button>Open</button></NavLink> 
            
        </div>
    )
}

export default FridgeCard