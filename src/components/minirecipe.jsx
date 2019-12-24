import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Box, Slide } from '@material-ui/core';
import PropTypes from 'prop-types';
import FavoriteButton from './favorite-button';
import IngredientsShow from './show-ingredients';
import PrivatComponent from './privat-component';
import config from '../config';

export default class Recipeitem extends Component {
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
      <Slide in="true" direction="up" mountOnEnter unmountOnExit>
        <Box display="flex" flexDirection="row" className="list__name">
          <div className="item__image">
            <img className="item__image-img" src={`${config.apiUrl}/${images[0]}`} alt="index img" />
          </div>
          <div className="item__content">
            <div className="item__content-recipeId">
              <p className="item__content-name-p">
                Recipe
                {id}
              </p>
            </div>
            <div className="item__content-name">
              <p className="item__content-name-p">
                <Link class="item__content-name-p-a" to={`recipes/${id}`}>
                  {title}
                </Link>
              </p>
            </div>
            {/* <FavoriteButton {...this.props} /> */}
            <PrivatComponent component={FavoriteButton} {...this.props} />
            <Box display="flex" flexDirection="row" className="item__content-ingredients">
              <span className="item__content-ingredients-span">
                Ingredients: &nbsp;
              </span>
              <IngredientsShow ingredients={ingredients} />
            </Box>
            <div className="item__content-difficulty">
              <span className="item__content-difficulty-span">
                Difficult:&nbsp;
                {difficult}
              </span>
              <div className="'rait_'+difficult aside__rating aside__rating" />
            </div>
            <div className="item__content-duration">
              <span className="item__content-duration-span">
                Duration:&nbsp;
                {duration}
                h.
              </span>
            </div>

            <div className="item__content-description">
              <span className="item__content-description-span">
                Steps:&nbsp;
                {steps[0]
                  ? steps[0].text
                  : 'None'}
              </span>
            </div>
            <div className="item__content-author">
              <span className="item__content-author-link">
                Author:&nbsp;
                <Link class="item__content-name-p-a" to={`profile/${authorId}`}>
                  {author}
                </Link>
              </span>
            </div>
            <div className="item__content">
              <span className="item__content">
                Favorites count:&nbsp;
                {+favoriteCount}
              </span>
            </div>
          </div>
          <div className="item__buttons">
            <div className="item__buttons-button">
              <a href>
                <div className="item__buttons-button-img disactive" />
              </a>
            </div>
          </div>
        </Box>
      </Slide>
    );
  }
}
Recipeitem.propTypes = {
  favoriteCount: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  difficult: PropTypes.string.isRequired,
  duration: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  authorId: PropTypes.number.isRequired,
};
