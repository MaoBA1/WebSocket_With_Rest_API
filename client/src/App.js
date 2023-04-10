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
import PrivateChatScreen from './screens/PrivateChatScreen';
import CreatNewChat from './screens/CreatNewChat';
import GroupChatScreen from './screens/GroupChatScreen';

const RootReducer = combineReducers({
      Reducer: Reducer
});

const store = createStore(RootReducer, applyMiddleware(ReduxThunk));
function App() {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem("user_token");
    if (token && !socket) {
      const newSocket = io(serverBaseUrl.productionServerSocketUrl, {
        query: {
          token: token
        },
      });

      newSocket.on("connect", () => {
        console.log("success", "Socket Connected!");
      });

      newSocket.on("disconnect", (reason) => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        console.log("error", "Socket Disconnected due to: " + reason);
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
          <Route path="/Home/chatScreen/:accountId" element={<PrivateChatScreen socket={socket}/>}/>
          <Route path="/Home/GroupChatScreen/:chatId" element={<GroupChatScreen socket={socket}/>}/>
          <Route path="/Home/creatNewChat" element={<CreatNewChat socket={socket}/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
