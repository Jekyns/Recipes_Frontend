import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Link, Redirect } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import FavoriteButton from './favorite-button';
import StepsShow from './stepsShow';
import RecipeEdit from './recipe-edit';
import EditButton from './edit-button';
import DeleteRecipe from './delete-recipe';
import IngredientsShow from './show-ingredients';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import PrivatComponent from './privat-component';
import config from '../config';

export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      redirect: false,
    };
  }

  showImages = () => {
    const images = [];
    for (let i = 0; i < this.props.images.length; i += 1) {
      images.push(
        <div className="item__image">
          <img className="item__image-img" src={`${config.apiUrl}/${this.props.images[i]}`} alt="carousel" />
        </div>,
      );
    }
    return images;
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

  showPage = () => {
    if (this.state.edit === true) {
      return (
        <RecipeEdit
          {...this.props}
        />
      );
    }
    return (
      <div className="recipe__items">
        <div className="recipe__content">
          <Carousel width="550px">
            {this.showImages()}
          </Carousel>
          <div className="item__text">
            <div className="item__text-name">
              <p className="recipe__item item__text-name-p">
                {this.props.title}
              </p>
            </div>
            <DeleteRecipe
              id={this.props.id}
              active={this.props.author === this.props.user.id}
              onDeleted={() => { this.setState({ redirect: true }); }}
            />
            <EditButton
              active={this.props.author === this.props.user.id}
              onEdit={() => { this.setState({ edit: true }); }}
            />
            {/* <FavoriteButton
              {...this.props}
            /> */}
            <PrivatComponent component={FavoriteButton} {...this.props} />
            <div className="recipe__item item__text-ingredients">
              <span className="item__text-ingredients-label">Ingredients:&nbsp;</span>
              <IngredientsShow ingredients={this.props.ingredients} />
            </div>
            <div className="recipe__item item__text-difficulty">
              <span className="item__text-difficulty-span">
                Difficult:&nbsp;
                {this.props.difficult}
              </span>
              <div className="aside__rating" />
            </div>
            <div className="recipe__item item__text-duration">
              <span className="item__text-duration-span">
                Duration:&nbsp;
                {this.props.duration}
                ч.
              </span>
            </div>

            <div className="recipe__item item__text-calories">
              <span className="item__text-description-span">
                Calories:&nbsp;
                {this.props.calories}
              </span>
            </div>
            <div className="recipe__item item__text-author">
              <span className="item__text-author-link">
                Author:
                <Link className="item__text-name-p-a" to={`/profile/${this.props.author}`}>
                  {this.props.author}
                </Link>
              </span>
            </div>
            <div className="item__content">
              <span className="item__content">
                Favorites count:&nbsp;{this.props.favoriteCount.length}
              </span>
            </div>
          </div>
        </div>
        <div className="recipe__steps">
          <StepsShow steps={this.props.steps} />
        </div>
        <div className="item__buttons">
          <div className="item__buttons-button">
            <a href>
              <div className="item__buttons-button-img disactive" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="body__recipe">
        {this.showPage()}
        {this.Redirect()}
      </div>
    );
  }
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string),
  ingredients: PropTypes.arrayOf(PropTypes.string),
  difficult: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  calories: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  author: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  favoriteCount: PropTypes.arrayOf(PropTypes.object),
};
Recipe.defaultProps = {
  images: [],
  steps: [],
  ingredients: [],
  favoriteCount: [],
};
