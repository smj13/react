import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './view/home';
import Course from './view/course/';
import Lecturer from './view/lecturer/';
import Login from './view/login';
import Message from './view/message';
import Work from './view/work';
import axios from 'axios';
import PropTypes from "prop-types";
import './common/css/style.css';

class App extends Component {
  state = {
    user: ''
  }
  getChildContext(){
    return {
        user: this.state.user
    }
  }
  constructor(arg) {
    super(arg);
    this.getLoginState();
  }
  getLoginState = () => {
    axios.post(
      '/koocv/user/islogin',
      '',
      {
        withCredentials: true
      }
    ).then((res) => {
      let user;
      if(res.data.code === 1){
          user = ''
      } else if(res.data.code === 0){
        user = res.data.username;
      }
      if (user !== this.state.user) {
        this.setState({
          user
        })
      }
    }).catch((error) => {
      console.log(error);
    })
  }
  componentDidUpdate() {
    this.getLoginState();
  }
  render(){
    return(
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/course' component={Course} />
        <Route exact path='/lecturer' component={Lecturer} />
        <Route exact path='/login' render={()=>{
          if(this.state.user) {
            return <Redirect to='/'/>
          }
          return <Login />
        }} />
        <Route exact path='/message/:id' component={Message} />
        <Route exact path='/work/:id' component={Work} />
      </Switch>
    );
  }
  
}
App.childContextTypes = {
  user: PropTypes.string
}

export default App;
