import React from 'react'
import FridgeContainer from '../Containers/FridgeContainer'
import ShoppinglistContainer from '../Containers/ShoppinglistContainer'

class FamilyComponent extends React.Component {

    render(){
        return(
            <>
                <h2>Family component</h2>
                <FridgeContainer />
                <ShoppinglistContainer />
            </>
        )
    }
}

export default FamilyComponent