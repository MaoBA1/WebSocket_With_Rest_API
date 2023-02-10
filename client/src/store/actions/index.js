export const SET_CURRENT_USER = "SET_CURRENT_USER";


export const SetCurrentUserAction = (user) => {
    return dispatch => {
        dispatch({ type: SET_CURRENT_USER, user: user });
    }
}
