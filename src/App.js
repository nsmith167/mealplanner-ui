import React, { Component } from 'react';
import Recipes from './Recipes';
import RecipeForm from './RecipeForm';
import Schedule from './Schedule';
import RecipeView from  './RecipeView';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Recipes} />
          <Route path='/recipes' exact={true} component={Recipes} />
          <Route path='/recipe/:id' exact={true} component={RecipeForm} />
          <Route path='/schedule' exact={true} component={Schedule} />
          <Route path='/recipe/:id/view' exact={true} component={RecipeView} />
        </Switch>
      </Router>
    )
  }
}

export default App;
