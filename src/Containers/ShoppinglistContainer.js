import React from 'react'
import ShoppingItem from '../Components/ShoppingItem'

class ShoppinglistContainer extends React.Component {

    render(){
        return(
            <>
                <h2>Shopping List Container</h2>
                <ShoppingItem />
                <ShoppingItem />
                <ShoppingItem />
            </>
        )
    }
}

export default ShoppinglistContainer