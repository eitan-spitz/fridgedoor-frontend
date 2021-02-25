import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import FridgeContainer from '../Containers/FridgeContainer'
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

    arrayOfFridges = () => {
        return this.state.fridges.map(fridge => <FridgeContainer fridge={fridge} familyId={this.state.familyId} />)
    }

    render(){
        return(
            <>
                <h2>Family component</h2>
                <Switch>
                    <Route path="/families/fridge" render={()=>{
                        return(
                            <>
                                {this.arrayOfFridges()}
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