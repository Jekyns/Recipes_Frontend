import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import cookie from 'react-cookies';
import CreateRecipeForm from './recipe-creator-form';
import config from '../config';

export default class RecipeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  Back = () => {
    this.setState({ redirect: true });
  }

  showPage = () => {
    return (
      <div>
        <CreateRecipeForm
          onSubmit={this.handleSubmit}
          onBack={this.Back}
          id={this.props.id}
          author={this.props.author}
          title={this.props.title}
          images={this.props.images}
          ingredients={this.props.ingredients}
          steps={this.props.steps}
          duration={this.props.duration}
          difficult={this.props.difficult}
          calories={this.props.calories}
        />
      </div>
    );
  }

  Redirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect to={{
          pathname: '/recipes',
          // state: { from: props.location }
        }}
        />
      );
    }
    return null;
  }

  handleSubmit = (event, files, stepsimages) => {
    event.preventDefault();
    let ingredients = [];
    let steps = [];
    for (let element in event.target.elements) {
      try {
        if (event.target.elements[element].id.split(" ")[0] === "ingredient") {
          ingredients.push(event.target.elements[element].value)
        }
        if (event.target.elements[element].id.split(" ")[0] === "step") {
          steps.push(event.target.elements[element].value)
        }
      }
      catch (error) {
        console.log(error)
      }
    }
    ingredients.length -= 1;
    steps.length -= 1;
    ingredients = ingredients.join('|');
    steps = steps.join('|');
    const formData = new FormData();
    for (let fileId in files) {
      formData.append('images', files[fileId]);
    }
    for (let fileId in stepsimages) {
      formData.append("stepsimages", stepsimages[fileId]);
      formData.append("ImageNumber", fileId);
    }
    formData.append('ingredients', ingredients);
    formData.append('title', event.target.elements['title'].value);
    formData.append('calories', event.target.elements['calories'].value);
    formData.append('difficult', event.target.elements['difficult'].value);
    formData.append('duration', event.target.elements['duration'].value);
    formData.append('steps', steps);
    formData.append('token', cookie.load('token'));
    fetch(`${config.apiUrl}/recipes/${this.props.id}`, {
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
        if (!json.error) {
          this.setState({ redirect: true });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        {this.showPage()}
        {this.Redirect()}
      </div>
    );
  }
}
RecipeEdit.propTypes = {
  title: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficult: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  calories: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  images: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
