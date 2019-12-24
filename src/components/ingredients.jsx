import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

let counterId = 0;

export default class IngredientsInputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      ingredients: [
        {
          id: 'ingredient 0',
          value: '',
          key: 0,
        },
      ],
    };
  }

  componentDidMount() {
    if (this.props.ingredients) {
      const newingredients = [];
      for (let ingredientId in this.props.ingredients) {
        let ingredient = {};
        ingredient.key = ++counterId;
        ingredient.id = `ingredient ${counterId}`;
        ingredient.value = this.props.ingredients[ingredientId].title;
        newingredients.push(ingredient);
      }
      const emptyIngredient = {};
      emptyIngredient.key = counterId + 1;
      counterId += 1;
      emptyIngredient.id = `ingredient ${counterId}`;
      emptyIngredient.value = '';
      newingredients.push(emptyIngredient);
      this.setState({ ingredients: newingredients });
    }
  }

  handleClose = () => {
    this.props.onBack(true);
  }

  addIngredient = () => {
    const oldObject = {};
    oldObject.value = '';
    oldObject.key = counterId + 1;
    counterId += 1;
    oldObject.id = `ingredient ${counterId}`;
    this.setState(prevState => ({
      ...prevState,
      ingredients: [...prevState.ingredients, oldObject],
    }));
  }

  deleteIngredient = (item) => {
    const ingredientsList = [...this.state.ingredients]
    for (let ingredientId in ingredientsList) {
      if (ingredientsList[ingredientId].id === item.id) {
        ingredientsList.splice(ingredientId, 1);
        this.setState({ ingredients: ingredientsList });
      }
    }
  }

  BlurController = (event) => {
    if (event.currentTarget.value.length > 0) {
      if (event.currentTarget.id === this.state.ingredients[this.state.ingredients.length - 1].id) {
        return this.addIngredient(event.currentTarget);
      }
    } else {
      if (event.currentTarget.id !== this.state.ingredients[this.state.ingredients.length - 1].id) {
        return this.deleteIngredient(event.currentTarget);
      }
      return null;
    }
    return null;
  }

  onChangeInput = (e, ingredient) => {
    const newIngredient = { ...ingredient };
    newIngredient.value = e.currentTarget.value;
    const newIngredients = [...this.state.ingredients]
      .map(item => item.id === ingredient.id
        ? newIngredient
        : item);
    this.setState({ ingredients: [...newIngredients] });
  }

  ingredients = () => {
    return (
      <div className="create__ingredients">
        {this.state.ingredients.map((ingredient, index) => {
          return (
            <TextField
              required={index === 0}
              className="create__ingredients-input"
              value={ingredient.value}
              margin="dense"
              key={ingredient.key}
              id={ingredient.id}
              label={`Ingredient ${index + 1}`}
              onBlur={this.BlurController}
              onFocus={this.FocusController}
              onChange={(e) => { this.onChangeInput(e, ingredient); }}
            />
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.ingredients()}
      </div>
    );
  }
}
IngredientsInputs.propTypes = {
  onBack: PropTypes.func.isRequired,
};
