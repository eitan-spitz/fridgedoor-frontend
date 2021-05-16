import React from 'react'
import { NavLink } from 'react-router-dom'

function FridgeCard(props){
    const fridge = props.fridge

    let getFridgeHandler = () =>{
        props.getFridge(fridge.id)
    }
    return (
        <div className="fridge-card">
            <h3>{fridge.name} Fridge</h3>
            <NavLink to={`/families/fridges/${fridge.id}`} className="link" ><button onClick={getFridgeHandler}>Open</button></NavLink> 
            
        </div>
    )
}

export default FridgeCard