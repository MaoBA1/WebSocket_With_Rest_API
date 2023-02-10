import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import './utilities/fonts.css';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import Register from './screens/Register';
import CurrentUserProfileScreen from './screens/CurrentUserProfilePage';

import Reducer from './store/reducers/index';

const RootReducer = combineReducers({
      Reducer: Reducer
});

const store = createStore(RootReducer, applyMiddleware(ReduxThunk));
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/Register" element={<Register/>}/>
          <Route path="/Home" element={<Dashboard/>}/>
          <Route path="/Currentuserprofile" element={<CurrentUserProfileScreen/>}/>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
