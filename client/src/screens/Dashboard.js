import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { socket } from '../socket.io';



function Dashboard() {
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        socket.on("recive_posts", (data) => {
            console.log(data); 
        });
    },[socket])
    
    return ( 
        <div>
            <h1>Dashboard Page</h1>
        </div>
    );
}

export default Dashboard;