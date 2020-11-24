import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './common/home'
import ErrorNotFound from './common/404'
import About from './common/about'
import CreateEvent from './common/create-event/create-event'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/404" component={ErrorNotFound}></Route>
        <Route exact path="/create-event" component={CreateEvent}></Route>
        <Redirect to="/404"></Redirect>
      </Switch>
    </Router>
  )
}


export default App;
