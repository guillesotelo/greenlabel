import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Profile from './components/Profile'
 
function App() {
    return (
        <>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/me" component={Profile} />
            </Switch>
        </>
    );
}

export default App;
