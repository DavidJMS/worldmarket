import React, {useState} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Login from './pages/Login';
import Home from './pages/Home';
import Guard from './components/Guard.jsx';

import { AuthProvider } from "./context/AuthContext";
import { useAuth } from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch> 
          <Route exact path="/" render={(props) => <Login {...props} />} />
          <Route path="/home" component={Home} />
          <Route component={Login} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
