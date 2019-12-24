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

export default class RegisterPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      wrongLogin: false,
      wrongPass: false,
      error: '',
    };
    // debugger
    if (props.open) {
      this.setState({ open: props.open });
    }
  }

  handleClickOpen = () => {
    this.setState({ wrongLogin: false, wrongPass: false, error: '' });
    this.setState({ open: true });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ wrongLogin: false, wrongPass: false, error: '' });
    const params = { ...event.target };
    params[0] = event.target[0].files[0];
    const formData = new FormData();
    for (var k in params) {
      if (event.target[k].id === "avatar") {
        formData.append(event.target[k].id, params[k]);
        continue
      }
      formData.append(event.target[k].id, params[k].value);
    }
    fetch(`${config.apiUrl}/users/registration`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        // debugger
        if (response.status === 400) {
          return response.json();
        }
        if (response.ok) {
          return response.json();
        }

        throw new Error('Network response was not ok');
      })
      .then((json) => {
        if (json.error === true) {
          this.setState({ wrongLogin: true, error: json.msg });
        }
        if (json.token) {
          cookie.save('token', json.token, { path: '/' });
          this.props.setUser(json.user);
          this.props.onClose(true);
          this.setState({ open: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleClose = () => {
    this.props.onClose(true);
    this.setState({ open: false });
  }

  handleChange = () => {
    this.props.onLogin(true);
  }

  render() {
    return (
      <div>
        <div>
          <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <form className="Register__form" onSubmit={this.handleSubmit} id="registrationForm">
              <DialogTitle id="form-dialog-title">Registration</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Be sure to fill in the fields with a star
                </DialogContentText>
                <span className="Register__form-avatar-span">avatar: </span>
                <input type="file" id="avatar" />
                <TextField
                  required
                  error={this.state.wrongLogin}
                  autoFocus
                  margin="dense"
                  id="login"
                  label="Login"
                  type="text"
                  fullWidth
                />
                <TextField
                  required
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
                    Login
                  </Button>
                </div>
                <div className="popup__control">
                  <span className="error">{this.state.error}</span>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Register
                  </Button>
                </div>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      </div>
    );
  }
}
RegisterPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};
