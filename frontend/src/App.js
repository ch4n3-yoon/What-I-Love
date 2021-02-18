import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import ListArticle from './pages/ListArticle';
import Publish from "./pages/Publish";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/sign-up" component={SignUp}/>
                <Route exact path="/article" component={ListArticle}/>
                <Route exact path="/article/publish" component={Publish}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;