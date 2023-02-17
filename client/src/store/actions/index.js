export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_ALL_POSTS = "SET_ALL_POSTS";


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


export const setAllPostsDispatch = (posts) => {
    return dispatch => {
        dispatch({ type: SET_ALL_POSTS, posts: posts });
    }
}

export const setAllPosts = async( response, dispatch ) => {
    if(response.posts) {
        let action = setAllPostsDispatch(response.posts);
        try{
            await dispatch(action);
        } catch(error) {
            console.log(error.message);
        }
    }

}

