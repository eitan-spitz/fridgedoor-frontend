import React from 'react'
import FamilyComponent from '../Components/FamilyComponent'

class FamilyContainer extends React.Component {

    render(){
        return(
            <>
            <div className="familyContainer">
                {/* <h1>family container (choice between families)</h1> */}
                <FamilyComponent />
            </div>
            </>
        )
    }
}

export default FamilyContainer