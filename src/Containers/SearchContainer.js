import React from 'react'
import FdcSearch from '../Components/FdcSearch'

class SearchContainer extends React.Component {

    state = {
        query: '',
        apiResponse: null,
        fetched: false
    }

    fdcData = {
        url: "https://api.nal.usda.gov/fdc/v1/foods/search?",
        apiKey: "CS1Rfy9P2MqeJeHkcNnhBjhyMBJ9d6G5cUSdkOAu",
        pageSize: 10
      }

    changeHandler = (e)=> {
        console.log('working')
        this.setState({ [e.target.name]: e.target.value, fetched: false})
    }
    searchFetch = () => {
        console.log('in fetch')
        fetch(`${this.fdcData.url}api_key=${this.fdcData.apiKey}&query=${this.state.query}&pageSize=${this.fdcData.pageSize}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        })
        .then(r => r.json())
        .then(returnedData => {
            console.log(returnedData)
            this.setState({apiResponse: returnedData.foods, fetched: true})
        })
    }

    render(){
        console.log(this.props)
        return(
            <>
                <button onClick={this.props.history.goBack}>go back</button>
                <FdcSearch query={this.state.query} fetched={this.state.fetched} changeHandler={this.changeHandler} searchFetch={this.searchFetch} />
                
            </>
        )
    }
}

export default SearchContainer