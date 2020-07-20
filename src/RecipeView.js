import React, { Component } from 'react';
import './App.scss';
import './RecipeForm.scss';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';
import { Container, Button } from 'reactstrap'

class RecipeView extends Component {
    emptyRecipe = {
        name: '',
        instructions: '',
        ingredients: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            recipe: this.emptyRecipe
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    async componentDidMount() {
        const returnedRecipe = await (await fetch(`/recipes/recipe/${this.props.match.params.id}`)).json();
        this.setState({recipe: returnedRecipe});
    }

    async handleDelete(event) {
        event.preventDefault();
        const {recipe} = this.state;

        if (window.confirm('Are you sure you want to delete this recipe?')) {
            await fetch('/recipes/recipe/' + recipe.id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            this.props.history.push('/recipes');
        }
    }

    render() {
        const {recipe} = this.state;

        return (
            <div>
                <AppNavbar />
                <Container>
                    <h1>{recipe.name || 'Unnamed recipe'}</h1>
                    <h3>Ingredients</h3>
                    <pre>{recipe.ingredients}</pre>
                    <h3>Instructions</h3>
                    <pre>{recipe.instructions}</pre>
                    <div>
                        <Button color="primary" tag={Link} to={'/recipe/' + recipe.id}>Edit</Button>
                        <Button color="secondary" tag={Link} to='/recipes' className="cancelButton">Cancel</Button>
                        <Button color="danger" className="deleteButton" onClick={this.handleDelete}>Delete</Button>
                    </div>
                </Container>
            </div>
        );
    }
}

export default withRouter(RecipeView);