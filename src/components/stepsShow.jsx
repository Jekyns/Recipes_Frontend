import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import PropTypes from 'prop-types';
import config from '../config';

export default class StepsShow extends Component {
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
    // debugger
    cookie.remove('token', { path: '/' });
    this.setState({ Auth: false });
  }

  steps = () => {
    if (this.props.steps.length) {
      return (
        <div>
          {this.props.steps.map((step, index) => {
            return (
              <div className="step">
                <div className="step__count">
                  Step
                  {index + 1}
                </div>
                <div className="step__content">
                  <div className="step__content-text">{step.text}</div>
                  <div className="step__content-image">
                    <img className="step__content-image-img" src={`${config.apiUrl}/${step.image}`} alt="step" />
                  </div>
                </div>
              </div>
            );
          })
          }
        </div>
      );
    }
    return null;
  }

  render() {
    // const [open, setOpen] = React.useState(false);
    return (
      <div className="wrapper">
        {this.steps()}
      </div>
    );
  }
}
StepsShow.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};
