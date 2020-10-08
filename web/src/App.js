import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/home';
import {BrowserRouter as Router} from 'react-router-dom'
import Login from './components/login'
import Signup from './components/signup'
import {Route} from 'react-router-dom'
import Index from './components/index'
import Logout from './components/logout';
import ViewPost from './components/viewPost';
import Viewcart from './components/viewcart';
import Vieworder from './components/vieworder';
// const Route = require('react-router-dom').Route

export const apiHost = 8080

function App() {
  return (
    <Router>
    <div className="App">
     <Route path="/" exact strict>
       <Index/>
       </Route>
    <Route path="/signup/form" exact component={Signup}/>
    <Route path="/user/login" exact component={Login}/>
    <Route path="/user/logout" exact component={Logout}/>
    <Route path="/view/post/:postID" exact component={ViewPost}/>
    <Route path="/product/viewcart" exact component={Viewcart}/>
    <Route path="/view/orders" exact component={Vieworder}/>
    </div>

    </Router>
  );
}

export default App;
