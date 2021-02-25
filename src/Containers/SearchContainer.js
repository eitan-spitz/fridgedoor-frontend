import React from 'react'
import FdcSearch from '../Components/FdcSearch'

class SearchContainer extends React.Component {


    render(){
        console.log(this.props)
        return(
            <>
                <FdcSearch/>
                <button onClick={this.props.history.goBack}>go back</button>
                
            </>
        )
    }
}

export default SearchContainer