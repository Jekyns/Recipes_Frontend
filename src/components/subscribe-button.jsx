import { connect } from 'react-redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import config from '../config';
import { setUser, deleteUser } from '../store/user/actions';

class SubscribeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribe: false,
    };
  }

  componentDidMount() {
    this.props.user.subscribs.map((subscribe) => {
      if (subscribe.id === this.props.id) {
        this.setState({ subscribe: true });
      }
      return null;
    });
  }

  ClickHandler = () => {
    let formBody = [];
    const token = cookie.load('token');
    formBody.push(`token=${token}`);
    formBody = formBody.join('&');
    fetch(`${config.apiUrl}/users/subscribe/${this.props.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: formBody,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then(async (json) => {
        if (!json.error) {
          // const subscribs = json.subscribs;
          const { subscribs } = json;
          this.props.setUser({ subscribs });
          this.setState({ subscribe: !this.state.subscribe });
          console.log(this.props.id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  favoriteButton = () => {
    const text = (this.state.subscribe) ? 'unsubscribe' : 'subscribe';
    return (
      <div className="item__text-favorite">
        <p className="item__text-name-p">
          <button type="button" onClick={this.ClickHandler}>{text}</button>
        </p>
      </div>
    );
  }

  render() {
    // debugger
    return (
      <div>
        {this.favoriteButton()}
      </div>
    );
  }
}
SubscribeButton.propTypes = {
  id: PropTypes.number.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};
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

export default enchancer(SubscribeButton);
