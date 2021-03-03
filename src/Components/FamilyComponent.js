import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import FridgeContainer from '../Containers/FridgeContainer'
import ShoppinglistContainer from '../Containers/ShoppinglistContainer'
import FridgeCard from './FridgeCard'

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



    arrayOfFridgeCards = () => {
        return this.state.fridges.map(fridge => <FridgeCard fridge={fridge} familyId={this.state.familyId} key={fridge.id} />)
    }

    render(){
        return(
            <>
                {/* <h2>Family component (inside family - choice of fridges or shopping list)</h2> */}
                <Switch>
                    <Route path="/families/fridges/:id" render={(routerProps)=>{
                        const fridgeId = routerProps.match.params.id
                        const foundFridge = this.state.fridges.find(fridge => fridge.id === parseInt(fridgeId))
                        console.log("fridgeid: ", fridgeId, ", fridge: ", foundFridge)
                        let fridgeComponent
                        if(foundFridge){
                            fridgeComponent = <FridgeContainer fridge={foundFridge} familyId={this.state.familyId} key={foundFridge.id} />
                        } else {
                            fridgeComponent = <h1>Loading</h1>
                        }
                        return fridgeComponent
                    }} />
                    <Route path="/families/fridges" render={()=>{
                        return(
                            <div>
                                {this.arrayOfFridgeCards()}
                            </div>
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

export default withRouter(connect(msp, null)(FamilyComponent))