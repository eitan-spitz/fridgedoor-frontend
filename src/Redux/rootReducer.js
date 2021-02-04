import {combineReducers} from 'redux'

const defaultState = {
    user: null
}

function userReducer(prevState = defaultState.user, action) {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        default:
            return prevState
    }
}

const rootReducer = combineReducers({
    user: userReducer
})

export default rootReducer 