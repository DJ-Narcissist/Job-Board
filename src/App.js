import React, { useEffect, useState } from 'react';
import './App.css';
import useLocalStorage from './components/hooks/useLocalStorage';
import JoblyApi from './api';
import LoadingCursor from './components/Misc/LoadingCursor';
import { BrowserRouter as Router } from 'react-router-dom'; 
import token from 'jsonwebtoken';

import NavBar from './components/routes-nav/Nav';
import RoutesList from './components/routes-nav/Routes';

export const TOKEN_STORAGE_ID = "jobs!";

function App() {
  const [appIds, setAppIds] = useState();
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug("App", "appIds=", appIds, "currentUser=", currentUser, "token=", token);

  useEffect(() => {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = token(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);

          setCurrentUser({
            infoLoaded: true,
            data: currentUser
          });
          setAppIds(new Set(currentUser.app));
        } catch (err) {
          console.error("App loadUserInfo problem loading", err);
          setCurrentUser({
            infoLoaded: true,
            data: null
          });
        }
      }
    }

    getCurrentUser();
  }, [token]);

  /**site-wide log out */
  const logout = () => {
    setAppIds(new Set([]));
    setCurrentUser({
      infoLoaded: true,
      data: null
    });
    setToken(null);
  };

  /**Site-wide sign up */
  async function signup(signupData) {
    let token = await JoblyApi.signup(signupData);
    setToken(token);
  }

  /**Site-wide Login */
  async function login(loginData) {
    let token = await JoblyApi.login(loginData);
    setToken(token);
  }

  /**Shows if a job has been applied to */
  const hasApplied = (id) => {
    return appIds.has(id);
  };

  /**Apply to a job: Call thru API and update the App Ids */
  const applyToJob = (id) => {
    if (hasApplied(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setAppIds(new Set([...appIds], id));
  };

  if (!currentUser.infoLoaded) return <LoadingCursor />;

  return (
    <Router>
      <div className="App">
        <NavBar logout={logout} />
        <RoutesList currentUser={currentUser.data} login={login} signup={signup} />
      </div>
    </Router>
  );
}

export default App;
