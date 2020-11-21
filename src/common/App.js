import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import Home from './home'
import ErrorNotFound from './404'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/404" component={ErrorNotFound}></Route>
        <Redirect to="/404"></Redirect>
      </Switch>
    </Router>
  )
}


export default App;
