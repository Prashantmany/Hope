import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./Redux/actions/authActions";
import { Provider } from "react-redux";
import store from "./Redux/store";

import Navbar from "./Components/Navbar.component";
import GetHopelist from "./Components/Get-Hopes.component";
import AddNewHope from "./Components/Add-New.component";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import Dashboard from "./Components/dashboard/dashboard";
import PrivateRoute from "./Components/dashboard/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Navbar />
        </div>
        <br />
        <Route path='/' exact component={GetHopelist} />
        <Route path='/add' component={AddNewHope} />
        <Route path='/Register' component={Register} />
        <Route path='/Login' component={Login} />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </Provider>
  );
}    
export default App;