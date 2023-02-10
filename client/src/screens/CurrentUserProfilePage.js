// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function CurrentUserProfileScreen(props) {
    const userSelector = useSelector(state => state.Reducer.User);
    // const {
    //     _id,
    //     email,
    //     fname,
    //     lname,
    //     posts,
    //     profileImage
    // } = userSelector;
    console.log(userSelector);
    return (
        <div>
            Current User Profile
        </div>
    );
}

export default CurrentUserProfileScreen;