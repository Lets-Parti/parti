import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Home from '../src/pages/home'
import About from '../src/pages/about'
import ErrorNotFound from '../src/pages/404'

import CreateEvent from '../src/pages/create-event/create-event'
import Events from './pages/user/events'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/404" component={ErrorNotFound}></Route>
        <Route exact path="/create-event" component={CreateEvent}></Route>
        <Route exact path="/events" component={Events}></Route>
        <Redirect to="/404"></Redirect>
      </Switch>
    </Router>
  )
}


export default App;
