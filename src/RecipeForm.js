import React, { Component } from 'react';
import './App.scss';
import './RecipeForm.scss';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, Button } from 'reactstrap'


class RecipeForm extends Component {

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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const returnedRecipe = await (await fetch(`/recipes/recipe/${this.props.match.params.id}`)).json();
            this.setState({recipe: returnedRecipe});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let recipe = {...this.state.recipe};
        recipe[name] = value;
        this.setState({recipe});
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

    async handleSubmit(event) {
        event.preventDefault();
        const {recipe} = this.state;

        await fetch('/recipes/recipe' + (recipe.id ? '/' + recipe.id : ''), {
            method: (recipe.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recipe)
        });
        var submitPath = ((recipe.id) ? ('/recipe/' + recipe.id + '/view') : '/recipes');
        this.props.history.push(submitPath);
    }

    render() {
        const {recipe} = this.state;
        const title = <h1>{recipe.id ? 'Edit Recipe' : 'New Recipe'}</h1>

        return (
            <div>
                <AppNavbar />
                <Container>
                    {title}
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="inputName">Name</Label>
                            <Input type="text" name="name" id="inputName" onChange={this.handleChange} value={recipe.name || ''}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="inputInstructions">Instructions</Label>
                            <Input type="textarea" name="instructions" id="inputInstructions" onChange={this.handleChange} value={recipe.instructions || ''}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="inputIngredients">Ingredients</Label>
                            <Input type="textarea" name="ingredients" id="inputIngredients" onChange={this.handleChange} value={recipe.ingredients || ''}/>
                        </FormGroup>
                        <FormGroup>
                            <Button color="primary" className="saveButton" type="submit">Save</Button>
                            <Button color="secondary" tag={Link} to={'/recipe/' + recipe.id + '/view'} className="cancelButton">Cancel</Button>
                            <Button color="danger" className="deleteButton" onClick={this.handleDelete}>Delete</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(RecipeForm);