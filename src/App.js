import React, { Component } from 'react';
import Recipes from './Recipes';
import NewRecipe from './NewRecipe';
import Schedule from './Schedule';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Recipes} />
          <Route path='/recipes' exact={true} component={Recipes} />
          <Route path='/new-recipe' exact={true} component={NewRecipe} />
          <Route path='/schedule' exact={true} component={Schedule} />
        </Switch>
      </Router>
    )
  }
}

export default App;
