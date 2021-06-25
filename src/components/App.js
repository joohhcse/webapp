import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './Home';
import Table from './Table';
import Nav from './Nav';
import '../index.css';



class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Table}/>
                    {/* <Route exact path="/" component={Home}/> */}
                    {/* <Route exact path="/nav" component={Nav}/> */}
                </div>
            </Router>
        );
    }
}

export default App;