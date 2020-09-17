import React, { useState, useEffect } from 'react';
import client, { refreshAuthHeaders } from './api/client';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthState, setProfile, setRedirection } from './store/actions';
import store from './store/store';
import { BrowserRouter, Router, Redirect, Route, Link } from 'react-router-dom';

import MainHeader from './Components/MainHeader';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import NewMessagePage from './Pages/NewMessagePage';
import OutboxPage from './Pages/OutboxPage';
import InboxPage from './Pages/InboxPage';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const redirectAvailable = useSelector((state) => state.redirectAvailable);

  useEffect(() => {
    //Get Current User Profile (IF AVAILABLE)
    client
      .get('/users/profile/')
      .then((response) => {
        console.log(response.data);
        dispatch(setProfile(response.data.user));
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
  }, []);

  let redirectComponent = null;
  if (redirectAvailable) {
    redirectComponent = <Redirect to={redirectAvailable} />;
    dispatch(setRedirection(null));
  } else {
    redirectComponent = null;
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <MainHeader />
        {redirectComponent}
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/signup' component={SignupPage} />
        <Route exact path='/new' component={NewMessagePage} />
        <Route exact path='/outbox' component={OutboxPage} />
        <Route exact path='/inbox' component={InboxPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
