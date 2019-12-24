import React from 'react';
import cookie from 'react-cookies';
import config from '../config';

export default class DeleteRecipe extends React.Component {
  delete = ({ id, onDeleted }) => {
    const url = new URL(`${config.apiUrl}/recipes/${id}`);
    const params = { token: cookie.load('token') };
    url.search = new URLSearchParams(params);
    fetch(url, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        if (!json.error) {
          onDeleted(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showButton = ({ active }) => {
    if (active) {
      return <button type="button" onClick={() => this.delete(this.props)}>Delete recipe</button>;
    }
    return null;
  };

  render() {
    return <div>{this.showButton(this.props)}</div>;
    // return <div>{this.props.active}</div>;
  }
}
