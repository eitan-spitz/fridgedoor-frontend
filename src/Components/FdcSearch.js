import React from 'react'
import SelectSearch from 'react-select-search'

class FdcSearch extends React.Component {

    state = {
        query: '',
        apiResponse: []
    }

    fdcData = {
        url: "https://api.nal.usda.gov/fdc/v1/foods/search?",
        apiKey: "CS1Rfy9P2MqeJeHkcNnhBjhyMBJ9d6G5cUSdkOAu",
        pageSize: 10
      }
      
    componentDidMount(){
    
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value})
        if(this.state.query.length >= 4 ){
            console.log('length over 4')
            this.searchHelper()
        }
    }

    searchHelper = () => {
        this.searchFetch()
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
            this.setState({apiResponse: returnedData.foods})
        })
    }
    
    localSubmitHandler = (e) => {
        e.preventDefault()

    }

    render(){
        return(
            <form onSubmit={this.localSubmitHandler} className="form" >
                <input type="text" name="query" placeholder="Search Food Database" value={this.state.query} onChange={this.changeHandler} />
                
                <button>Search</button>
            </form>
        )
    }
}

export default FdcSearch