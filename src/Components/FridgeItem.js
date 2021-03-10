import React from 'react'

class FridgeItem extends React.Component {

    state = {
        show: true
    }

    lowerDescription = this.props.item.fdcDescription.toLowerCase()
    description = this.lowerDescription[0].toUpperCase() + this.lowerDescription.slice(1)

    localDeleteItem = () => {
        this.props.deleteItem(this.props.item)
        this.setState({show: false})
    }

    formatAmountType = () => {
        if(parseInt(this.props.fridgeItem.amountNum) > 1){
            return (this.props.fridgeItem.amountType + "s")
        } else {
            return this.props.fridgeItem.amountType
        }
    }

    render(){
        return(
            <>
            {this.state.show ? 
                <li key={this.props.fridgeItem.id}>
                    <h5><span className="description">{this.description}</span></h5>
                    <h5><span className="amount">{this.props.fridgeItem.amountNum}</span></h5>
                    <h5><span className="unit">{this.formatAmountType()}</span></h5>
                    <span className="dltButton"><button onClick={this.localDeleteItem} >-</button></span>
                </li>
            :
                ''
            }
            </>
        )
    }
}

export default FridgeItem