import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
//Pages
import Home from '../src/pages/home'
import About from '../src/pages/about/about'
import ErrorNotFound from '../src/pages/404'
import SignUp from '../src/pages/signup'
import Login from '../src/pages/login'
import CreateEvent from '../src/pages/create-event/create-event'
import Events from './pages/user/events'
import Discover from './pages/discover/discover'
import DiscoverEvents from './pages/discover/discover-events'
import User from './pages/user'
import Feedback from './pages/feedback'
import AccountEdit from './pages/user/accountedit'
//Components
import Navbar from '../src/components/navbar'
//Theme
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './theme'
//Token decoder 
import jwtDecode from 'jwt-decode'
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
//Axios
import axios from 'axios';
//utils
import AuthRoute from './utils/authroute'                                 
import ProtectedRoute from './utils/protectedroute'
import ProtectedServiceRoute from './utils/protectedserviceroute'
import ProtectedClientRoute from './utils/protectedclientroute'

axios.defaults.baseURL = 'https://us-central1-lets-parti.cloudfunctions.net/api'

const token = localStorage.FBIdToken; 
if(token)
{
  const decodedToken = jwtDecode(token); 
  if(decodedToken.exp * 1000 < Date.now())      //Token expires 
  {
    store.dispatch(logoutUser()); 
    window.location.href = '/'; 
  }else
  {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token; 
    store.dispatch(getUserData()); 
  }
}

class App extends React.Component 
{
  render()
  {
    return (
      <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
        <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/feedback" component={Feedback} />
              <Route exact path="/404" component={ErrorNotFound} />
              <ProtectedRoute exact path="/user/:userhandle" component={User} />
              <ProtectedClientRoute exact path="/create-event" component={CreateEvent} />
              <ProtectedRoute exact path="/events" component={Events} />
              <ProtectedRoute exact path="/account/edit" component={AccountEdit} />
              <Route exact path="/discover" component={Discover} />
              <ProtectedServiceRoute exact path="/discover-events" component={DiscoverEvents} />
              <AuthRoute exact path="/signup" component={SignUp} />
              <AuthRoute exact path="/login" component={Login} />
              <Redirect to="/404"></Redirect>
            </Switch>
            </div>
        </Router>
      </Provider>
      </ThemeProvider>
    )
  }
}

export default App;
