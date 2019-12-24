import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import config from '../config';
import SubscribeButton from './subscribe-button';
import PrivatComponent from './privat-component';

export default class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Auth: true,
    };
  }

  redirect = () => {
    if (!this.state.Auth) {
      return (
        <Redirect to={{
          pathname: '/',
        }}
        />
      );
    }
    return null;
  }

  logout = () => {
    cookie.remove('token', { path: '/' });
    this.props.deleteUser();
    this.setState({ Auth: false });
  }

  logoutBtn = () => {
    if (this.props.logout) {
      return (
        <span role="link" className="logout" onClick={this.logout} tabIndex="0" onKeyDown={this.logout}>Logout</span>
      );
    }
    return null;
  }

  showFavorites = () => {
    const favorites = [];
    for (let index in this.props.favorites) {
      favorites.push(
        <Link className="user__favorites-link" to={`/recipes/${this.props.favorites[index].id}`}>
          {this.props.favorites[index].title}
        </Link>
      );
    }
    return favorites;
  }

  showSubscribs = () => {
    const subscribs = [];
    for (let index in this.props.subscribs) {
      subscribs.push(
        <Link className="field__subscribs-link" to={`/profile/${this.props.subscribs[index].id}`}>
          <div className="field__subscribs-div">
            <img class="field__subscribs-avatar" src={`${config.apiUrl}/${this.props.subscribs[index].avatar}`} alt="subscriber" />
            {this.props.subscribs[index].login}
          </div>
        </Link>
      );
    }
    if (!this.props.self) {
      subscribs.push(<PrivatComponent component={SubscribeButton} id={this.props.id} className="user__subscribe" />);
    }
    return subscribs;
  }

  showFollowers = () => {
    const followers = [];
    for (let index in this.props.followers) {
      followers.push(
        <Link className="field__followers-link" to={`/profile/${this.props.followers[index].id}`}>
          <div className="field__followers-div">
            <img class="field__followers-avatar" src={`${config.apiUrl}/${this.props.followers[index].avatar}`} alt="follower" />
            {this.props.followers[index].login}
          </div>
        </Link>
      );
    }
    return followers;
  }

  delete = () => {
    const params = { token: cookie.load('token') };
    const url = new URL(`${config.apiUrl}/users/${this.props.id}`);
    url.search = new URLSearchParams(params);
    fetch(url, {
      method: 'DELETE',
    })
      .then((response) => {
        // debugger
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        // debugger
        if (!json.error) {
          this.logout();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteAccountBtn = () => {
    if (this.props.deleteAccount) {
      return (
        <span className="delete" onClick={this.delete} role="button" onKeyDown={this.delete} tabIndex="-1">
          Delete Account
        </span>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="wrapper">
        <div className="user">
          <div className="user__id">
            <span className="user__id-span">
              User&nbsp;
              {this.props.id}
            </span>
          </div>
          <div className="user__avatar">
            <img className="user__avatar-img" src={`${config.apiUrl}/${this.props.avatar}`} alt="avatar" />
          </div>
          <div className="user__field user__login">
            <span className="user__login-span">
              Login:&nbsp;
              {this.props.login}
            </span>
          </div>
          <div className="user__field user__name">
            <span className="user__name-span">
              Name:&nbsp;
              {this.props.name || 'none'}
            </span>
          </div>
          <div className="user__field user__about">
            <span className="user__about-span">
              About:&nbsp;
              {this.props.about || 'none'}
            </span>
          </div>
          <div className="user__field user__favorites">
            <span className="user__favorites-span">
              Favorites:&nbsp;
              {this.showFavorites()}
            </span>
          </div>
          <div className="user__field user__subscribs">
            <span className="user__field-span">Subscribed to&nbsp;</span>
            <div class="user__field-content">
              {this.showSubscribs()}
            </div>
          </div>
          <div className="user__field user__followers">
            <span className="user__field-span">Followers&nbsp;</span>
            <div class="user__field-content">
              {this.showFollowers()}
            </div>
          </div>
          <div className="user__field user__logoutbtn">
            {this.logoutBtn()}
          </div>
          <div className="user__field user__deleteAccountBtn">
            {this.deleteAccountBtn()}
          </div>
        </div>
        <div className="redirect">
          {this.redirect()}
        </div>
      </div>
    );
  }
}

ProfileCard.defaultProps = {
  name: 'None',
  about: 'None',
};
ProfileCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  about: PropTypes.string,
  favorites: PropTypes.arrayOf(PropTypes.string).isRequired,
  deleteUser: PropTypes.func.isRequired,
};
