import React, { Component } from 'react';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import Recipe from '../components/recipe';
import { setUser } from '../store/user/actions';
import config from '../config';

class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: {},
      user: 0,
    };
  }

  componentDidMount() {
    fetch(`${config.apiUrl}/recipes/${this.props.match.params.id}`, { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        json.stepItem.sort(
          (a, b) => {
            if (a.index > b.index) {
              return 1;
            }
            if (a.index < b.index) {
              return -1;
            }
            // a должно быть равным b
            return 0;
          },
        );
        this.setState({ recipe: json });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showRecipes = () => {
    const token = cookie.load('token');
    let favorite = false;
    for (let recipeid in this.props.user.favorites) {
      if (this.state.recipe.id === this.props.user.favorites[recipeid].id) {
        favorite = true;
        break
      }
    }
    const result = (
      <Recipe
        title={this.state.recipe.title}
        images={this.state.recipe.images}
        ingredients={this.state.recipe.ingredientsTable}
        steps={this.state.recipe.stepItem}
        id={this.state.recipe.id}
        author={this.state.recipe.author}
        duration={this.state.recipe.duration}
        token={token}
        favorite={favorite}
        favoriteCount={this.state.recipe.favoritesTable}
        difficult={this.state.recipe.difficult}
        calories={this.state.recipe.calories}
        user={this.state.user}
        {...this.props}
      />
    );
    return result;
  }

  render() {
    return (
      <div className="body">
        <h2>Recipes</h2>
        {this.showRecipes()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.userStore.user,
  };
};
const mapDispatchToProps = {
  setUser,
};
const enchancer = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default enchancer(RecipePage);