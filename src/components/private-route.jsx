import { connect } from 'react-redux';
import React, { Component } from 'react';
import cookie from 'react-cookies';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { setUser } from '../store/user/actions';


class PrivateRoute extends Component {
  Redirect = () => {
    // cookie.remove('token', { path: '/' });
    return (
      <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
    );
  }

  PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        // render={props => this.props.user.login ? <Component {...props} /> : this.Redirect()
        render={props => cookie.load('token') ? <Component {...props} /> : this.Redirect()
        }
      />
    );
  };

  render() {
    return (
      <div className="body__recipe">
        {/* {this.Auth()} */}
        {this.PrivateRoute(this.props)}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.userStore.user,
});

const mapDispatchToProps = {
  setUser,
};

const enchancer = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enchancer(PrivateRoute);
