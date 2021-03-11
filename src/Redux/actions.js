import { LOGIN } from './actionTypes'

export function loginUser() {
    return function (dispatch) {
        fetch(`http://localhost:3000/users`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        })
            .then(r => r.json())
            .then(users => {
                dispatch({type: LOGIN, payload: users[0] })
            })
    }
}