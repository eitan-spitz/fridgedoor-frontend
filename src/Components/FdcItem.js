import React from 'react'

class FdcItem extends React.Component {

    state = {
        fdcId: this.props.food.fdcId
    }

    clickHandler = ()=> {
        // this.props.addItem(this.props.food)
        this.props.modalController(this.props.food)
    }

    render(){
        return(
            <>
            <li key={this.props.food.id}>
                <h5><span className="searchDescription">{this.props.food.description.toLowerCase()}</span></h5>
                <span className="addButton"><button onClick={this.clickHandler} >+</button></span>
            </li>
            </>
        )
    }
}
export default FdcItem

// dataType: "Branded"
// description: "APPLE"
// fdcId: 577849