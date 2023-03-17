import serverBaseUrl from "../../serverBaseUrl";


export const LOGIN = "LOGIN";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const SET_ALL_POSTS = "SET_ALL_POSTS";
export const SET_ALL_CHATS = "SET_ALL_CHATS";


export const setUser = (user) => {
    return dispatch => {
        dispatch({ type: SET_CURRENT_USER, user });
    }
}

export const getUser = ( token ) => {
    return async dispatch => {
        try {
            const response = await fetch(serverBaseUrl.url + "/user/get_user", {
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + token
                },
            })
            const data = await response.json();
            if(data.status) {
                dispatch(setUser(data.account));
            }
        } catch(error) {
            throw new Error(error.message);
        }
    }
}

export const loginAction = async(loginDetails) => {
    try {
        const response = await fetch(serverBaseUrl.url + "/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginDetails)
        })

        const data = await response.json();
        return data;
    } catch(error) {
        throw new Error(error);
    }
}


export const isAuthUser = async(response, dispatch) => {
    if(response.account) {
        let action = setUser(response.account);
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

export const setAllChats = (chats) => {
    return dispatch => {
        dispatch({ type: SET_ALL_CHATS, chats: chats })
    }
}