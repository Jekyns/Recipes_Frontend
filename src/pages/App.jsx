
import React, { Component } from 'react';
import cookie from 'react-cookies';

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Home from './home';
import Profile from './Profile';
import Recipes from './Recipes';
import RecipePage from './RecipePage';
import OtherProfiles from './OtherProfiles';
import RecipeCreate from './RecipeCreate';
import store from '../store/store';
import { authorizeCheck } from '../store/user/actions';
import PrivateRoute from '../components/private-route';
import WorkDates from './WorkDates';
import Total from '../components/Header';

class App extends Component {
  componentDidMount() {
    if (cookie.load('token')) {
      store.dispatch(authorizeCheck());
    }
  }

  render() {
    return (
      <Router>
        <div className="body">
          <Provider store={store}>
            <Total />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/profile/:id" component={OtherProfiles} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact path="/recipes" component={Recipes} />
              <PrivateRoute exact path="/create" component={RecipeCreate} />
              <Route exact path="/recipes/:id" component={RecipePage} />
              <Route exact path="/workdates" component={WorkDates} />
              <Route path="/" component={() => <Redirect to="/" />} />
            </Switch>
          </Provider>
        </div>
      </Router>
    );
  }
}

export default App;
