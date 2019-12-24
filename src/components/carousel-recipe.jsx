import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Slide } from '@material-ui/core';
import PropTypes from 'prop-types';
import IngredientsShow from './show-ingredients';
import config from '../config';

export default class CarouselRecipe extends Component {
  render() {
    const {
      images,
      id,
      title,
      ingredients,
      difficult,
      duration,
      steps,
      favoriteCount,
      authorId,
      author } = this.props;
    return (
      <Slide in="true" direction="left" mountOnEnter unmountOnExit>
        <Box display="flex" flexDirection="row" className="list__name">
          <div className="carousel__image">
            <img className="carousel__image-img" src={`${config.apiUrl}/${images[0]}`} alt="index img" />
          </div>
          <div className="carousel__content">
            <div className="carousel__content-recipeId">
              <p className="carousel__content-name-p">
                Recipe
                {id}
              </p>
            </div>
            <div className="carousel__content-name">
              <p className="carousel__content-name-p">
                <Link class="carousel__content-name-p-a" to={`recipes/${id}`}>
                  {title}
                </Link>
              </p>
            </div>
            <Box display="flex" flexDirection="row" className="carousel__content-ingredients">
              <span className="carousel__content-ingredients-span">
                Ingredients: &nbsp;
              </span>
              <IngredientsShow ingredients={ingredients} />
            </Box>
            <div className="carousel__content-difficulty">
              <span className="carousel__content-difficulty-span">
                Difficult:&nbsp;
                {difficult}
              </span>
              <div className="'rait_'+difficult aside__rating aside__rating" />
            </div>
            <div className="carousel__content-duration">
              <span className="carousel__content-duration-span">
                Duration:&nbsp;
                {duration}
                h.
              </span>
            </div>

            <div className="carousel__content-description">
              <span className="carousel__content-description-span">
                Steps:&nbsp;
                {steps[0]
                  ? steps[0].text
                  : 'None'}
              </span>
            </div>
            <div className="carousel__content-author">
              <span className="carousel__content-author-link">
                Author:&nbsp;
                <Link class="carousel__content-name-p-a" to={`profile/${authorId}`}>
                  {author}
                </Link>
              </span>
            </div>
            <div className="carousel__content">
              <span className="carousel__content">
                Favorites count:&nbsp;
                {+favoriteCount}
              </span>
            </div>
          </div>
          <div className="carousel__buttons">
            <div className="carousel__buttons-button">
              <a href>
                <div className="carousel__buttons-button-img disactive" />
              </a>
            </div>
          </div>
        </Box>
      </Slide>
    );
  }
}
CarouselRecipe.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficult: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  authorId: PropTypes.number.isRequired,
  favoriteCount: PropTypes.number.isRequired,
};
