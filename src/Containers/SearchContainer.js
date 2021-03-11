import React from 'react'
import FdcItem from '../Components/FdcItem'
import FdcSearch from '../Components/FdcSearch'
import ReactModal from 'react-modal'

class SearchContainer extends React.Component {

    state = {
        query: '',
        apiResponse: null,
        fetched: false,
        showModal: false,
        food: {},
        onFridge: false
    }

    fdcData = {
        url: "https://api.nal.usda.gov/fdc/v1/foods/search?",
        apiKey: "CS1Rfy9P2MqeJeHkcNnhBjhyMBJ9d6G5cUSdkOAu",
        pageSize: 10
      }

    componentDidMount(){
        this.setState({onFridge: this.props.onFridge})
    }

    changeHandler = (e)=> {
        this.setState({ [e.target.name]: e.target.value, fetched: false})
    }

    searchFetch = () => {
        fetch(`${this.fdcData.url}api_key=${this.fdcData.apiKey}&query=${this.state.query}&pageSize=${this.fdcData.pageSize}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        })
        .then(r => r.json())
        .then(returnedData => {
            this.setState({apiResponse: returnedData.foods, fetched: true})
        })
    }

    formatFoods = () => {
        if(this.state.apiResponse){
            let arrayOfFoods = this.state.apiResponse.map((food) => {return <FdcItem food={food} addItem={this.props.addItem} key={food.fdcId} modalController={this.modalController} />})
            return arrayOfFoods
        }
    }


    modalController = (food)=>{
        this.setState({showModal: !this.state.showModal})
        if(food){
            this.setState({food: food})
        }
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.modalController()
        let food = this.state.food
        food.amountNum = e.target.amountNum.value
        if(e.target.amountType){
            food.amountType = e.target.amountType.value
        }
        this.props.addItem(food)
    }
    
    options = () => {
        const optionTypes = ["Cup", "Liter", "Gram", "Unit"]
        return optionTypes.map(type => {
            return <option value={type}>{type}</option>
        })
    }

    customStyles = {
        content: {
            width: '15%',
            height: '15%',
            left: '40vw',
            top: '35vh'
        }
    }

    render(){
        return(
            <div className="searchComponent">
                <h3>Search</h3>
                <FdcSearch query={this.state.query} fetched={this.state.fetched} changeHandler={this.changeHandler} searchFetch={this.searchFetch} />
                <ul className="fdcItems">
                    {this.formatFoods()}
                </ul>
                <ReactModal isOpen={this.state.showModal} onRequestClose={this.modalController} ariaHideApp={false} style={this.customStyles}>
                    <form className="modalForm" onSubmit={this.submitHandler} >
                        <label>Amount:</label>
                        <input type="number" placeholder="Amount" name="amountNum" />
                        {this.state.onFridge ?
                            <select name="amountType" id="amountType">
                                {this.options()}
                            </select>
                            :
                            ''
                        }


                        <button>Add Item</button>
                    </form>
                </ReactModal>
            </div>
        )
    }
}

export default SearchContainer