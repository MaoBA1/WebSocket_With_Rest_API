import { SET_CURRENT_USER } from '../actions/index';


const intialState = {
    User: null
}

// eslint-disable-next-line
export default (state = intialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                User: action.user
            }
        default:
            return state
    }
}