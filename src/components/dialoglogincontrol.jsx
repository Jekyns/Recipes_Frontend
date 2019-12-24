import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import RegisterPopup from './register';
import LoginPopup from './login';
import { setUser } from '../store/user/actions';

class ControllerLoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      register: false,
    };
  }

  handleClickOpen = () => {
    this.setState({ login: true });
  };

  handleClose = () => {
    this.setState({ login: false, register: false });
  }

  handleChangetoRegister = () => {
    this.setState({ register: true, login: false });
  }

  handleChangetoLogin = () => {
    this.setState({ register: false, login: true });
  }

  controller = ({ login, register }) => {
    if (login) {
      return (
        <LoginPopup
          onClose={this.handleClose}
          onRegister={this.handleChangetoRegister}
          {...this.props}
        />
      );
    }
    if (register) {
      return (
        <RegisterPopup
          onClose={this.handleClose}
          onLogin={this.handleChangetoLogin}
          {...this.props}
        />
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Login/Register
        </Button>
        {this.controller(this.state)}
      </div>
    );
  }
}
ControllerLoginPopup.propTypes = {
  onAuth: PropTypes.func,
};
ControllerLoginPopup.defaultProps = {
  onAuth: null,
};
const mapStateToProps = (state) => {
  return {
    user: state.userStore.user,
  };
};
const mapDispatchToProps = {
  setUser,
};
const enchancer = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enchancer(ControllerLoginPopup);
