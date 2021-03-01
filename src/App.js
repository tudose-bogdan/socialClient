import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import themeFile from './util/theme'
import jwtDecode from 'jwt-decode'
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//Redux
import {Provider} from 'react-redux'
import store from './redux/store'
import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser,getUserData} from './redux/actions/userActions';
//Components
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute'
//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import contact from './pages/contact'
import axios from 'axios';
import statistics from './pages/statistics';

const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://europe-west1-socialcritic-ee17c.cloudfunctions.net/api'
const token = localStorage.FBIdToken;
if(token){

    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now() ){
      store.dispatch(logoutUser());
      window.location.href='/login'
     
    }else{
      store.dispatch({type: SET_AUTHENTICATED});
      axios.defaults.headers.common['Authorization'] = token;
      store.dispatch(getUserData());
    }
}


class App extends Component{
  render(){
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
    
    <Router>
    <Navbar/>
      <div className="container">
    <Switch>
      <Route exact path="/" component={home}/>
      <Route exact path="/statistics" component={statistics}/>
      <AuthRoute exact path="/login" component={login} />
      <AuthRoute exact path="/signup" component={signup}  />
      <Route exact path="/users/:handle" component={user} />
      <Route exact path="/users/:handle/critic/:criticId" component={user} />
      <Route exact path="/users/contact" component={contact}/>


    </Switch>
    
      </div>
      </Router>
      </Provider>
    
   
    
    </MuiThemeProvider>
  );
}
}

export default App;
