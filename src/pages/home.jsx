import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import CarouselRecipe from '../components/carousel-recipe';
import config from '../config';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    };
  }

  componentDidMount() {
    const orderField = 'id';
    const params = { order_field: orderField };
    const url = new URL(`${config.apiUrl}/recipes/filter`);
    url.search = new URLSearchParams(params);
    fetch(url, { method: 'GET' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok');
      })
      .then((json) => {
        this.setState({ recipes: json });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showRecipes = () => {
    const Recipes = [];
    for (let i = this.state.recipes.length - 1; i > this.state.recipes.length - 12 && i > 0; i -= 1) {
      Recipes.push(
        <CarouselRecipe
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
          {...this.props}
        />,
      );
    }
    return Recipes;
  };

  render() {
    return (
      <div>
        <h2>Home</h2>
        <h3>Last Recipes</h3>
        <Carousel centerMode interval={2500} selectedItem={3} centerSlidePercentage={35} emulateTouch showThumbs={false} autoPlay infiniteLoop className="home__carousel" showStatus={false} showIndicators={false}>
          {this.showRecipes()}
        </Carousel>
      </div>
    );
  }
}

// export default HOC.forLogin(Home);
export default Home;
