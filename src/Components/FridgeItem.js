import React from 'react'

class FridgeItem extends React.Component {

    state = {
        show: true
    }

    lowerDescription = this.props.item.fdc_description.toLowerCase()
    description = this.lowerDescription[0].toUpperCase() + this.lowerDescription.slice(1)

    localDeleteItem = () => {
        this.props.deleteItem(this.props.item)
        this.setState({show: false})
    }

    render(){
        return(
            <>
            {this.state.show ? 
                <>
                    <h4>{this.description}</h4>
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