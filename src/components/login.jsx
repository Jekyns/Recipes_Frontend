import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import config from '../config';

export default class LoginPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wrongLogin: false,
      wrongPass: false,
      error: '',
    };
  }

  Register = () => {
    this.setState({ wrongLogin: false, wrongPass: false, error: '' });
  }

  handleClickOpen = () => {
    this.setState({ wrongLogin: false, wrongPass: false, error: '' });
  }

  handleSubmit = (event) => {
    this.setState({ wrongLogin: false, wrongPass: false, error: '' });
    event.preventDefault();
    let formBody = [];
    formBody.push(`login=${event.target.elements.login.value}`);
    formBody.push(`password=${event.target.elements.password.value}`);
    formBody = formBody.join('&');
    fetch(`${config.apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then((response) => {
        if (response.status === 401) {
          return response.json();
        }
        if (response.ok) {
          return response.json();
        }

        throw new Error('Network response was not ok');
      })
      .then((json) => {
        if (json.field === 'password') {
          this.setState({ wrongPass: true, error: json.msg });
        }
        if (json.field === 'login') {
          this.setState({ wrongLogin: true, error: json.msg });
        }
        if (json.token) {
          this.props.setUser(json.user);
          cookie.save('token', json.token, { path: '/' });
          this.props.onClose(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClose = () => {
    this.props.onClose(true);
  }

  handleChange = () => {
    this.props.onRegister(true);
  }

  render() {
    return (
      <div>
        <Dialog open onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <form className="Login__form" onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Login</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your login and password
              </DialogContentText>
              <TextField
                error={this.state.wrongLogin}
                autoFocus
                margin="dense"
                id="login"
                label="Login"
                type="text"
                fullWidth
              />
              <TextField
                error={this.state.wrongPass}
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
              />
            </DialogContent>
            <DialogActions className="popup__buttons">
              <div className="popup__secondary">
                <Button onClick={this.handleChange} color="primary">
                  Register
                </Button>
              </div>
              <div className="popup__control">
                <span className="error">{this.state.error}</span>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Login
                </Button>
              </div>
            </DialogActions>
          </form>
        </Dialog>

      </div>
    );
  }
}
LoginPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
