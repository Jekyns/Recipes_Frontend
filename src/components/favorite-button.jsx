import React, { Component } from 'react';
import cookie from 'react-cookies';
import config from '../config';

export default class FavoriteButton extends Component {
  ClickHandler = ({ setUser, id }) => {
    let formBody = [];
    const token = cookie.load('token');
    formBody.push(`token=${token}`);
    formBody = formBody.join('&');
    fetch(`${config.apiUrl}/recipes/favorite/${id}`, {
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
      .then((json) => {
        if (!json.error) {
          setUser({ favorites: json.favorites });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  favoriteButton = ({ favorite }) => {
    const text = (favorite) ? 'remove from favorite' : 'add to favorite';
    return (
      <div className="item__text-favorite">
        <p className="item__text-name-p">
          <button type="button" onClick={() => this.ClickHandler(this.props)}>{text}</button>
        </p>
      </div>
    );
  }

  render() {
    // debugger
    return (
      <div>
        {this.favoriteButton(this.props)}
      </div>
    );
  }
}
