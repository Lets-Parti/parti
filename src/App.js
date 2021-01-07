import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

//Pages
import Home from '../src/pages/home'
import AboutUs from './pages/aboutus'
import ErrorNotFound from '../src/pages/404'
import SignUp from '../src/pages/signup'
import Login from '../src/pages/login'
import NewEvent from './pages/events/newevent'
import Events from './pages/events/events'
import Discover from './pages/discover/discover'
import DiscoverEvents from './pages/discover/discover-events'
import User from './pages/user'
import Feedback from './pages/feedback'
import AccountEdit from './pages/user/accountedit'
import NewContract from './pages/contracts/newcontract'
import Contracts from './pages/contracts/contracts'
import EventByID from './pages/events/event-by-id'
import Connections from './pages/connections/connections'
import PrivacyPolicy from './pages/legal/privacy'
import Terms_Conditions from './pages/legal/terms'
import FAQ from './pages/faq'

//Components
import Navbar from '../src/components/navbar'
// import NavbarBeta from '../src/components/navbar-beta'

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
import FunctionsConfig from './static/config';
import Footer from './components/footer';

axios.defaults.baseURL = FunctionsConfig.FUNCTIONS_DEVELOPMENT_URL; 

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
              {/* <Route exact path="/" component={Beta} /> */}
              <Route exact path="/about" component={AboutUs} />
              <Route exact path="/feedback" component={Feedback} />
              <Route exact path="/user/:userhandle" component={User} />
              <ProtectedClientRoute exact path="/events/new" component={NewEvent} />
              <ProtectedRoute exact path="/events" component={Events} />
              <ProtectedRoute exact path="/events/:eventID" component={EventByID} />
              <ProtectedRoute exact path="/contracts" component={Contracts} />
              <ProtectedRoute exact path="/account/edit" component={AccountEdit} />
              <Route exact path="/discover" component={Discover} />
              <Route exact path="/discover/:query" component={Discover} />
              <ProtectedServiceRoute exact path="/discover-events" component={DiscoverEvents} />
              <ProtectedServiceRoute exact path="/contracts/new" component={NewContract} />
              <ProtectedRoute exact path="/connections" component={Connections} />
              <AuthRoute exact path="/signup/:userType" component={SignUp} />
              <AuthRoute exact path="/signup/" component={SignUp} />
              <AuthRoute exact path="/login" component={Login} />
              <Route exact path="/privacy" component={PrivacyPolicy} />
              <Route exact path="/terms-and-conditions" component={Terms_Conditions} />
              <Route exact path="/faq" component={FAQ} />
              <Route exact path="/404" component={ErrorNotFound} />
              <Redirect to="/404"></Redirect>
            </Switch>
            </div>
            <Footer />
        </Router>
      </Provider>
      </ThemeProvider>
    )
  }
}

export default App;
