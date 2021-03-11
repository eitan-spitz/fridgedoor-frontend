import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ShoppingItem from '../Components/ShoppingItem'
import SearchContainer from './SearchContainer'

class ShoppinglistContainer extends React.Component {

    state = {
        items: [],
        shoppingItems: []
    }

    componentDidMount() {
        this.setState({ items: this.props.shoppinglist.items, shoppingItems: this.props.shoppinglist.shoppingItems })
    }

    arrayOfItems = () => {
        return this.state.shoppingItems.map(shoppingItem => {
            let item = this.state.items.find(item => item.id === shoppingItem.itemId)
            return <ShoppingItem item={item} deleteItem={this.deleteItem} key={shoppingItem.id} shoppingItem={shoppingItem} />
        })
    }

    deleteItem = (itemObj) => {
        let shoppingItemToDelete = this.state.shoppingItems.find(shoppingItem => shoppingItem.itemId === itemObj.id)
        fetch(`http://localhost:3000/families/${this.props.familyId}/shoppinglists/${this.props.shoppinglist.id}/shopping_items/${shoppingItemToDelete.id}`, {
            method: "DELETE",
            headers: {
                "Accepts": "application/json",
                "Content-type": "application/json",
            }
        })
            .then(r => r.json())
    }

    addItem = (itemObj) => {
        fetch(`http://localhost:3000/items`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ fdc_id: itemObj.fdcId, fdc_description: itemObj.description, data_type: itemObj.dataType })
        })
            .then(r => r.json())
            .then(returnedItem => {
                returnedItem.amountNum = itemObj.amountNum
                returnedItem.amountType = itemObj.amountType
                this.createShoppingItem(returnedItem)
                    .then(r => r.json())
                    .then(returnedShoppingItem => {
                        let shoppingItemIndex = this.state.shoppingItems.findIndex((shoppingItem) => shoppingItem.id === returnedShoppingItem.id)
                        if (shoppingItemIndex >= 0){
                            let newArray = [...this.state.shoppingItems]
                            newArray[shoppingItemIndex] = returnedShoppingItem
                            this.setState({ items: [...this.state.items, returnedItem], shoppingItems: newArray })
                        } else {
                            this.setState({ items: [...this.state.items, returnedItem], shoppingItems: [...this.state.shoppingItems, returnedShoppingItem] })
                        }
                    })
            })
    }

    createShoppingItem = (itemObj) => {
        return fetch(`http://localhost:3000/families/${this.props.familyId}/shoppinglists/${this.props.shoppinglist.id}/shopping_items`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify({ shoppinglist_id: this.props.shoppinglist.id, item_id: itemObj.id, amount_num: itemObj.amountNum, amount_type: itemObj.amountType })
        })
    }

    render(){
        return(
            <>
                <Switch>
                    <Route path='/families/shopping/:id' render={() => {
                        return (
                            <>
                                <div className="shoppinglist">
                                    <h2>{this.props.shoppinglist.name}</h2>
                                    <ul className="shoppingItems">
                                    <li>
                                            <h4><span className="description">Name</span></h4>
                                            <h4><span className="amount">Quantity</span></h4>
                                            <h4><span className="dltButton"></span></h4>
                                        </li>
                                        {this.arrayOfItems()}
                                    </ul>
                                </div>
                                <SearchContainer addItem={this.addItem} onFridge={false} />
                            </>
                        )
                    }} />
                </Switch>
            </>
        )
    }
}

export default ShoppinglistContainer