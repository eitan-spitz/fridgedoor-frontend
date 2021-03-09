import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import FridgeItem from '../Components/FridgeItem'
import SearchContainer from './SearchContainer'

class FridgeContainer extends React.Component {

    state = {
        items: [],
        fridgeItems: []
    }

    componentDidMount() {
        console.log(this.props)
        this.setState({ items: this.props.fridge.items, fridgeItems: this.props.fridge.fridgeItems })
    }

    arrayOfItems = () => {
        return this.state.fridgeItems.map(fridgeItem => {
            let item = this.state.items.find(item => item.id === fridgeItem.itemId)
            return <FridgeItem fridgeItem={fridgeItem} deleteItem={this.deleteItem} key={fridgeItem.id} item={item} />
        })
    }

    deleteItem = (itemObj) => {
        let fridgeItemToDelete = this.state.fridgeItems.find(fridgeItem => fridgeItem.itemId === itemObj.id)
        fetch(`http://localhost:3000/families/${this.props.familyId}/fridges/${this.props.fridge.id}/fridge_items/${fridgeItemToDelete.id}`, {
            method: "DELETE",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json",
            }
        })
            .then(r => r.json())
            .then(resp => console.log(resp))
    }

    addItem = (itemObj) => {
        console.log(itemObj)

        fetch(`http://localhost:3000/items`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ fdc_id: itemObj.fdcId, fdc_description: itemObj.description, data_type: itemObj.dataType})
        })
            .then(r => r.json())
            .then(returnedItem => {
                returnedItem.amountNum = itemObj.amountNum
                returnedItem.amountType = itemObj.amountType
                console.log(returnedItem)
                this.createFridgeItem(returnedItem)
                    .then(r => r.json())
                    .then(returnedFridgeItem => {
                        console.log(returnedFridgeItem)
                        let fridgeItemIndex = this.state.fridgeItems.findIndex((fridgeItem) => fridgeItem.id === returnedFridgeItem.id)
                        console.log(fridgeItemIndex)
                        if (fridgeItemIndex >= 0){
                            console.log("in if fridgeItemIndex")
                            let newArray = [...this.state.fridgeItems]
                            newArray[fridgeItemIndex] = returnedFridgeItem
                            this.setState({ items: [...this.state.items, returnedItem], fridgeItems: newArray })
                        } else {
                            this.setState({ items: [...this.state.items, returnedItem], fridgeItems: [...this.state.fridgeItems, returnedFridgeItem] })
                        }
                    })
            })
    }

    createFridgeItem = (itemObj) => {
        return fetch(`http://localhost:3000/families/${this.props.familyId}/fridges/${this.props.fridge.id}/fridge_items`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ fridge_id: this.props.fridge.id, item_id: itemObj.id, amount_num: itemObj.amountNum, amount_type: itemObj.amountType  })
        })
    }

 


    render() {
        return (
            <>
                <Switch>
                    <Route path='/families/fridges/:id' render={() => {
                        return (
                            <>
                            <div className="container">
                                <div className="fridge">
                                    <h2>{this.props.fridge.name}</h2>
                                    <ul className="fridgeItems">
                                        <li>
                                            <h4><span className="description">Desctiption</span></h4>
                                            <h4><span className="amount">Quantity</span></h4>
                                            <h4><span className="unit">Unit</span></h4>
                                            <h4><span className="dltButton"></span></h4>
                                        </li>
                                        {this.arrayOfItems()}
                                    </ul>
                                </div>
                                <div className="search">
                                    <SearchContainer addItem={this.addItem} modalController={this.modalController} />
                                </div>
                            </div>

                            </>
                        )
                    }} />
                </Switch>
            </>
        )
    }
}

function msp(state) {
    return {
        user: state.user
    }
}

export default connect(msp, null)(FridgeContainer)