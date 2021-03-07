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
        console.log(this.props)
        this.setState({ items: this.props.shoppinglist.items, shoppingItems: this.props.shoppinglist.shoppingItems })
    }

    arrayOfItems = () => {
        return this.state.shoppingItems.map(shoppingItem => {
            let item = this.state.items.find(item => item.id === shoppingItem.itemId)
            return <ShoppingItem item={item} deleteItem={this.deleteItem} key={item.id} shoppingItem={shoppingItem} />
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
            body: JSON.stringify({ fdc_id: itemObj.fdcId, fdc_description: itemObj.description, data_type: itemObj.dataType })
        })
            .then(r => r.json())
            .then(returnedItem => {
                console.log(returnedItem)
                this.createShoppingItem(returnedItem)
                    .then(r => r.json())
                    .then(returnedShoppingItem => {
                        console.log(returnedShoppingItem)
                        this.setState({ items: [...this.state.items, returnedItem], shoppingItems: [...this.state.shoppingItems, returnedShoppingItem] })
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
            body: JSON.stringify({ shoppinglist_id: this.props.shoppinglist.id, item_id: itemObj.id })
        })
    }

    render(){
        return(
            <>
                <Switch>
                    <Route path='/families/shopping/:id' render={() => {
                        return (
                            <div className="container">
                                <div className="shoppinglist">
                                    <h2>{this.props.shoppinglist.name}</h2>
                                    {this.arrayOfItems()}
                                </div>
                                <div className="search">
                                    <SearchContainer addItem={this.addItem} />
                                </div>
                            </div>
                        )
                    }} />
                </Switch>
            </>
        )
    }
}

export default ShoppinglistContainer