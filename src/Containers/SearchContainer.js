import React from 'react'
import FdcItem from '../Components/FdcItem'
import FdcSearch from '../Components/FdcSearch'
import ReactModal from 'react-modal'

class SearchContainer extends React.Component {

    state = {
        query: '',
        apiResponse: null,
        fetched: false,
        showModal: false
    }

    fdcData = {
        url: "https://api.nal.usda.gov/fdc/v1/foods/search?",
        apiKey: "CS1Rfy9P2MqeJeHkcNnhBjhyMBJ9d6G5cUSdkOAu",
        pageSize: 10
      }

    changeHandler = (e)=> {
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

    formatFoods = () => {
        if(this.state.apiResponse){
            let arrayOfFoods = this.state.apiResponse.map((food) => {return <FdcItem food={food} addItem={this.props.addItem} key={food.fdcId} modalController={this.modalController} />})
            return arrayOfFoods
        }
    }


    modalController = ()=>{
        console.log(this.state.showModal)
        this.setState({showModal: !this.state.showModal})
    }

    render(){
        return(
            <>
                <FdcSearch query={this.state.query} fetched={this.state.fetched} changeHandler={this.changeHandler} searchFetch={this.searchFetch} />
                {this.formatFoods()}
                <ReactModal isOpen={this.state.showModal} onRequestClose={this.modalController} ariaHideApp={false} />
            </>
        )
    }
}

export default SearchContainer