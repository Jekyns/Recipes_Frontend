import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import cookie from 'react-cookies';
import Recipeitem from '../components/minirecipe';
import Filter from '../components/filter';
import { setUser } from '../store/user/actions';
import Paginathion from '../components/pagination';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: {},
      page: 1,
      pages: 1,
      activePage: 0,
    };
  }

  showRecipes = () => {
    const token = cookie.load('token');
    let Recipes = [];
    for (let i = 0; i < this.state.recipes.length; i += 1) {
      let favorite = false;
      for (let recipeId in this.props.user.favorites) {
        if (this.state.recipes[i].id === this.props.user.favorites[recipeId].id) {
          favorite = true;
        }
      }
      Recipes.push(
        <Recipeitem
          title={this.state.recipes[i].title}
          images={this.state.recipes[i].images}
          ingredients={this.state.recipes[i].ingredientsTable}
          steps={this.state.recipes[i].stepItem}
          id={this.state.recipes[i].id}
          author={this.state.recipes[i].author_user.login}
          authorId={this.state.recipes[i].author}
          duration={this.state.recipes[i].duration}
          difficult={this.state.recipes[i].difficult}
          favoriteCount={this.state.recipes[i].favoritesTable.length}
          favorite={favorite}
          token={token}
          {...this.props}
        />,
      );
    }
    return (
      <Box className="body__list" display="flex" flexDirection="column" justifyContent="space-around" flexWrap="wrap" alignItems="center">
        <Filter onApplyFilter={this.handleFilter} page={this.state.page} />
        <div className="body__list">
          {Recipes}
        </div>
        <Paginathion
          activePage={this.state.activePage - 1}
          pages={this.state.pages}
          clicktoPage={this.handlerPage}
        />
      </Box>
    );
  }

  handleFilter = (recipes, pages, page) => {
    this.setState({ recipes, pages, activePage: page, page });
  }

  handlerPage = (page) => {
    this.setState({ page });
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

export default enchancer(Recipes);
