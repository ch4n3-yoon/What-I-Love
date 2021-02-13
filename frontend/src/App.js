import logo from './logo.svg';
import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './pages/Login';

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                {/*<Route exact path="/project" component={DockerCompose}/>*/}
                {/*<Route path="/project/:projectId" component={ProjectView}/>*/}
            </Switch>
        </BrowserRouter>
    );
}

export default App;