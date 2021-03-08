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
                <>
                    <h4>{this.description}</h4>
                    <h5>{this.props.fridgeItem.amountNum} {this.formatAmountType()}</h5>
                    <button onClick={this.localDeleteItem} >Delete</button>
                </>
            :
                ''
            }
            </>
        )
    }
}

export default FridgeItem