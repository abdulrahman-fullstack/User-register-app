import React, { Component } from 'react';
import {BrowserRouter , Switch , Route } from 'react-router-dom';

import './App.css';
import UserForm from './UserForm/UserForm';
import Page404 from './404/Page404';

const Routers = () =>{
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" component={UserForm} exact />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
};

class App extends Component{
  
  render(){      
    return(
      <div className="wrapper">
        <Routers />
      </div>
    )
  }
}

export default App;