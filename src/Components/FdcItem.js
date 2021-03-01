import React from 'react'

class FdcItem extends React.Component {

    state = {
        fdcId: this.props.food.fdcId
    }

    clickHandler = ()=> {
        this.props.addItem(this.props.food)
    }

    render(){
        return(
            <>
            <div onClick={this.clickHandler}>
                <h4>{this.props.food.description.toLowerCase()}</h4>
                <h6>{this.props.food.dataType}</h6>
            </div>
            </>
        )
    }
}
export default FdcItem

// dataType: "Branded"
// description: "APPLE"
// fdcId: 577849