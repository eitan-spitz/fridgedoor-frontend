import React from 'react'
import FdcSearch from '../Components/FdcSearch'
import FridgeItem from '../Components/FridgeItem'

class FridgeContainer extends React.Component {

    render(){
        return(
            <>
                <h2>Fridge Container</h2>
                <FdcSearch />
                <FridgeItem />
                <FridgeItem />
                <FridgeItem />
            </>
        )
    }
}

export default FridgeContainer