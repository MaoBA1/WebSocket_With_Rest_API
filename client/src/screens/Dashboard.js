import React from 'react';
import { useSearchParams } from 'react-router-dom';




function Dashboard(props) {
    const [ params ] = useSearchParams();
    const socket = params.get("socket");
    console.log(socket);
    return ( 
        <div>
            <h1>Dashboard Page</h1>
        </div>
    );
}

export default Dashboard;