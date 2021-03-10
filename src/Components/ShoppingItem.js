import React from 'react'

class ShoppingItem extends React.Component {

    state = {
        show: true
    }

    lowerDescription = this.props.item.fdcDescription.toLowerCase()
    description = this.lowerDescription[0].toUpperCase() + this.lowerDescription.slice(1)

    localDeleteItem = () => {
        this.props.deleteItem(this.props.item)
        this.setState({show: false})
    }

    render(){
        return(
            <li  key={this.props.shoppingItem.id}>
            {this.state.show ? 
                <>
                    <h5><span className="description">{this.description}</span></h5>
                    <h5><span className="amount">{this.props.shoppingItem.amountNum}</span></h5>
                    <span className="dltButton"><button onClick={this.localDeleteItem} >-</button></span>
                </>
            :
                ''
            }
            </li>
        )
    }
}

export default ShoppingItem