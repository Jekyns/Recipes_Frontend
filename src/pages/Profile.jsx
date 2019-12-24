import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';
import ProfileCard from '../components/profileCard';
import UpdateUserForm from '../components/update-user-form';
import { setUser, deleteUser } from '../store/user/actions';
import config from '../config';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: true,
      logout: true,
      token: true,
      deleteAccount: true,
    };
  }

  showProfile = () => {
    if (this.state.showProfile) {
      if (!this.state.update) {
        return (
          <div>
            <ProfileCard
              {...this.props.user}
              logout={this.state.logout}
              deleteAccount={this.state.deleteAccount}
              {...this.props}
              self
            />
          </div>
        );
      }
      return (
        <UpdateUserForm {...this.props.user} onClose={this.handleUpdateClose} {...this.props} />
      );
    }
    return null;
  }

  Redirect = () => {
    if (!this.state.token) {
      return (
        <Redirect to={{
          pathname: '/',
          // state: { from: props.location }
        }}
        />
      );
    }
    return null;
  }

  handleClick = () => {
    this.setState({ update: true });
  }

  handleUpdateClose = () => {
    this.setState({ update: false, showProfile: true });
  }

  updateAvatar = (avatar) => {
    const params = avatar[0];
    const formData = new FormData();
    formData.append('avatar', params);
    fetch(`${config.apiUrl}/users/${this.props.user.id}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        if (json.avatarpath) {
          // const newprofile = { ...this.state.profile };
          // newprofile.avatar = json.avatarpath;
          const user = { ...this.props.user };
          user.avatar = json.avatarpath;
          this.props.setUser({ ...user });
          // this.setState({ profile: newprofile });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ShowUpdateAvatar = () => {
    if (this.props.match.params.id) {
      return null;
    }
    return (
      <div>
        <input
          id="raised-button-file"
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => this.updateAvatar(e.target.files)}
        />
        <label htmlFor="raised-button-file">
          <Button variant="raised" component="span">
            Upload New Avatar
          </Button>
        </label>
      </div>
    );
  }

  ShowUpdateUser = () => {
    return (
      <Button type="button" onClick={this.handleClick} color="primary">
        Update profile
      </Button>
    );
  }

  render() {
    return (
      <div className="body">
        <div className="user__profile">
          {this.showProfile()}
          <div className="update__buttons">
            {this.ShowUpdateAvatar()}
            {this.ShowUpdateUser()}
          </div>
        </div>
        {this.Redirect()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userStore.user,
  };
};
const mapDispatchToProps = {
  setUser,
  deleteUser,
};
const enchancer = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enchancer(Profile);
