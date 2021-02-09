import React from 'react'
import { connect } from 'react-redux'
import FdcSearch from '../Components/FdcSearch'
import FridgeItem from '../Components/FridgeItem'

class FridgeContainer extends React.Component {

    arrayOfItems = () => {
        return this.props.fridge.fridge_items.map(item => <FridgeItem item={item} />)
    }

    render(){
        return(
            <>
                <h2>{this.props.fridge.name}</h2>
                {this.arrayOfItems()}
            </>
        )
    }
}

function msp(state){
    return{
        user: state.user
    }
}

export default connect(msp, null) (FridgeContainer)