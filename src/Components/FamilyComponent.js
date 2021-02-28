import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import FridgeContainer from '../Containers/FridgeContainer'
import SearchContainer from '../Containers/SearchContainer'
import ShoppinglistContainer from '../Containers/ShoppinglistContainer'

class FamilyComponent extends React.Component {

    state = {
        fridges: [],
        familyId: null
    }

    componentDidMount(){
        if(this.props.user){
            let userFamily = this.props.user.user_families[0].family_id
            fetch(`http://localhost:3000/families/${userFamily}/fridges`,{
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            })
            .then(r=>r.json())
            .then(fridges => {
                console.log(fridges)
                this.setState({fridges: fridges, familyId: userFamily})
            })
            .catch(console.log)
        }
    }

    addItem = (itemId) => {
        console.log(itemId)
    }

    arrayOfFridges = () => {
        return this.state.fridges.map(fridge => <FridgeContainer fridge={fridge} familyId={this.state.familyId} />)
    }

    render(){
        return(
            <>
                {/* <h2>Family component (inside family - choice of fridges or shopping list)</h2> */}
                <Switch>
                    <Route path="/families/fridge" render={()=>{
                        return(
                            <>
                                <div className="container">
                                    <div className="fridge">
                                        {this.arrayOfFridges()}
                                    </div>
                                    <div className="search">
                                        <SearchContainer addItem={this.addItem} />
                                    </div>
                                </div>
                            </>
                        )
                    }} />
                    <Route path="/families/shopping" component={ShoppinglistContainer} />
                </Switch>
            </>
        )
    }
}

function msp(state){
    return{
        user: state.user
    }
}

export default connect(msp, null) (FamilyComponent)