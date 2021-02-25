import React from 'react'

class FdcItem extends React.Component {

    state = {
        fdcId: this.props.fdcId
    }

    render(){
        return(
            <>
                <h4>{this.props.food.description.toLowerCase()}</h4>
                <h6>{this.props.food.dataType}</h6>
            </>
        )
    }
}
export default FdcItem

// dataType: "Branded"
// description: "APPLE"
// fdcId: 577849