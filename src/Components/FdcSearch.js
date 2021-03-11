import React from 'react'

class FdcSearch extends React.Component {

    componentDidUpdate(){
        if(!this.props.fetched){
            if(this.props.query.length >= 4 ){
                this.props.searchFetch()
            }
        }
    }

    localChangeHandler = (e) => {
        this.props.changeHandler(e)
    }
    
    localSubmitHandler = (e) => {
        e.preventDefault()
    }

    render(){
        return(
            <>
            <form onSubmit={this.localSubmitHandler} className="form" >
                <input type="text" name="query" placeholder="Search Food Database" value={this.props.query} onChange={this.localChangeHandler} />
            </form>
            </>
        )
    }
}

export default FdcSearch