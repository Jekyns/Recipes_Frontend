import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import ControllerLoginPopup from './dialoglogincontrol';
import PrivatComponent from './privat-component';


export default class Total extends Component {
  ProfileController = () => {
    return (
      <Link activeClassName="active" className="header__item-a" to="/profile">Profile</Link>
    );
  }

  LoginPopup = () => {
    return (<ControllerLoginPopup />);
  }

  CreateController = () => {
    return (
      <Link activeClassName="active" className="header__item-a" to="/create">Create recipe</Link>
    );
  }


  render() {
    return (
      <Box display="flex" flexDirection="row" className="header">
        <div className="head__link"><Link activeClassName="active" className="header__item-a" to="/">Home</Link></div>
        <PrivatComponent component={this.ProfileController} HandlerUnAuth={this.LoginPopup} />
        <PrivatComponent component={this.CreateController} />
        <div className="head__link">
          <Link activeClassName="active" className="header__item-a" to="/workdates">Work days</Link>
        </div>
        <div className="head__link">
          <Link activeClassName="active" className="header__item-a" to="/recipes">Recipes</Link>
        </div>
      </Box>
    );
  }
}
