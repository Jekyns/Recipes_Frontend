import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import config from '../config';

export default class UpdateUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // setOpen: false
      pass: false,
      err_pass: false,
    };
  }

  handleClickPasswordHide = () => {
    this.setState({ pass: !this.state.pass });
  };

  handleClose = () => {
    this.props.onClose(true);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const params = { ...event.target };
    const formData = new FormData();
    for (var k in params) {
      if (event.target[k].id === "avatar") {
        formData.append(event.target[k].id, params[k]);
        continue;
      }
      formData.append(event.target[k].id, params[k].value);
    }
    fetch(`${config.apiUrl}/users/${this.props.id}`, {
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
        if (json.err_field.length < 1) {
          this.props.onClose(true);
          this.props.setUser(json.user);
        } else {
          for (let err_field of json.err_field) {
            if (err_field === "password") {
              this.setState({ err_pass: true });
              this.props.setUser(json.user);
            }
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changePassword = () => {
    if (!this.state.pass) {
      return (
        <div>
          <Button onClick={this.handleClickPasswordHide} color="primary">
            Change password
          </Button>
        </div>
      );
    }
    return (
      <div className="update__password">
        <TextField
          error={this.state.err_pass}
          margin="normal"
          id="oldpassword"
          label="Old password"
          type="password"
          variant="outlined"
          className="update__password-input"
        />
        <TextField
          id="newpassword"
          label="New password"
          margin="normal"
          variant="outlined"
          type="password"
          className="update__password-input"
        />
        <TextField
          id="renewpassword"
          label="Repeat new password"
          margin="normal"
          variant="outlined"
          type="password"
          className="update__password-input"
        />
        <Button onClick={this.handleClickPasswordHide} color="primary">
          Hide change password
        </Button>
      </div>
    );
  };

  render() {
    return (
      <form className="Update__form" onSubmit={this.handleSubmit}>
        <TextField
          value={this.props.login}
          margin="dense"
          id="login"
          label="Login"
          type="text"
          disabled
        />
        <TextField
          defaultValue={this.props.name}
          margin="dense"
          id="name"
          label="Name"
          type="text"
        />
        <TextField
          defaultValue={this.props.about}
          rows="4"
          id="about"
          label="About"
          margin="normal"
          variant="outlined"
          type="text"
          multiline
        />
        {this.changePassword()}
        <Button onClick={this.handleClose} color="primary">
          Close
        </Button>

        <Button type="submit" color="primary">
          Update
        </Button>
      </form>
    );
  }
}
UpdateUserForm.propTypes = {
  id: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  about: PropTypes.string,
  name: PropTypes.string,
  login: PropTypes.string.isRequired,
};
UpdateUserForm.defaultProps = {
  about: '',
  name: '',
};
