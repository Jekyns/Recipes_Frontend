import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class IngredientsShow extends Component {
  showIngredients = () => {
    const ingredients = [];
    for (let ingredient in this.props.ingredients) {
      if (ingredient < this.props.ingredients.length - 1) {
        ingredients.push(
          <span className="item__text-ingredients-span">{this.props.ingredients[ingredient].title}, </span>
        );
      }
      else {
        ingredients.push(
          <span className="item__text-ingredients-span">{this.props.ingredients[ingredient].title}</span>
        );
      }
    }
    return ingredients;
  }

  render() {
    // const [open, setOpen] = React.useState(false);
    return (
      <div className="wrapper">
        {this.showIngredients()}
      </div>
    );
  }
}
IngredientsShow.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
