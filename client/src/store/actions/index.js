export const SET_CURRENT_USER = "SET_CURRENT_USER";


export const SetCurrentUserAction = (user) => {
    return dispatch => {
        dispatch({ type: SET_CURRENT_USER, user: user });
    }
}




export const isAuthUser = async(response, dispatch) => {
    if(response.account) {
        let action = SetCurrentUserAction(response.account);
        try{
            await dispatch(action);
        } catch(error) {
            console.log(error.message);
        }
    }
}