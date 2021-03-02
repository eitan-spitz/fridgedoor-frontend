import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import FridgeItem from '../Components/FridgeItem'

class FridgeContainer extends React.Component {

    state = {
        items: []
    }

    arrayOfItems = () => {
        return this.props.fridge.items.map(item => <FridgeItem item={item} deleteItem={this.deleteItem} key={item.id} />)
    }

    deleteItem = (itemObj) => {
        let fridgeItemToDelete = this.props.fridge.fridge_items.find(fridgeItem => fridgeItem.item_id === itemObj.id)
        fetch(`http://localhost:3000/families/${this.props.familyId}/fridges/${this.props.fridge.id}/fridge_items/${fridgeItemToDelete.id}`,{
            method: "DELETE",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json",
            }
        })
        .then(r=>r.json())
        .then(resp => console.log(resp))
    }

    render(){
        return(
            <>
            <Switch>
                <Route path='/families/fridge' render={()=> {
                    return(
                        <>
                        <h2>{this.props.fridge.name}</h2>
                        {this.arrayOfItems()}
                        </>
                    )
                }} />
            </Switch>
            </>
        )
    }
}

function msp(state){
    return{
        user: state.user
    }
}

export default connect(msp, null) (FridgeContainer)