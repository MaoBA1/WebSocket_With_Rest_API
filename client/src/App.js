import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import './utilities/fonts.css';
import { io } from 'socket.io-client';
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';

import serverBaseUrl from './serverBaseUrl';
import Reducer from './store/reducers/index';
import OtherAccount from './screens/OtherAccount';


const RootReducer = combineReducers({
      Reducer: Reducer
});

const store = createStore(RootReducer, applyMiddleware(ReduxThunk));
function App() {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem("user_token");
    if (token && !socket) {
      const newSocket = io(serverBaseUrl.localServerSocketUrl, {
        query: {
          token: token
        },
      });
      
      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log("error", "Socket Disconnected!");
      });

      newSocket.on("connect", () => {
        console.log("success", "Socket Connected!");
      });
      
      setSocket(newSocket);
    }
  }

  

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login setupSocket={setupSocket}/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Home" element={<Dashboard socket={socket} setupSocket={setupSocket} />}/>
          <Route path="/Home/:accountId" element={<OtherAccount socket={socket}/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
