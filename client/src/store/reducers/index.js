import { 
    SET_ALL_POSTS,
    SET_CURRENT_USER
} from '../actions/index';


const intialState = {
    User: null,
    Posts: null,
}

// eslint-disable-next-line
export default (state = intialState, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                User: action.user
            }
        case SET_ALL_POSTS:
            return {
                ...state,
                Posts: action.posts
            }
        default:
            return state
    }
}