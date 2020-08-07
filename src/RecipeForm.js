import React, { Component, useState } from 'react';
import './App.scss';
import './RecipeForm.scss';
import AppNavbar from './AppNavbar';
import {Link, withRouter} from 'react-router-dom';
import { Container, Form, FormGroup, Label, Input, Button, Col } from 'reactstrap'


class RecipeForm extends Component {

    emptyRecipe = {
        name: '',
        recipeType: 'Breakfast',
        instructions: '',
        ingredients: '',
    };

    recipeTypeMap = {
        BREAKFAST: "Breakfast",
        AM_SNACK: "AM Snack",
        LUNCH: "Lunch",
        PM_SNACK: "PM Snack",
        DINNER: "Dinner",
        NIGHT_SNACK: "Night Snack"
    }

    constructor(props) {
        super(props);
        this.state = {
            recipe: this.emptyRecipe,
            recipeTypes: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    async componentDidMount() {
        const returnedRecipeTypes = await (await fetch(`/recipetypes`)).json();
        this.setState({recipeTypes: returnedRecipeTypes.map(type => this.recipeTypeMap[type])});
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
        recipe.recipeType = Object.keys(this.recipeTypeMap).find(key => this.recipeTypeMap[key] === recipe.recipeType);

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
        const {recipe, recipeTypes} = this.state;
        const title = <h1>{recipe.id ? 'Edit Recipe' : 'New Recipe'}</h1>;
        const recipeTypeOptions = recipeTypes.map(type => <option>{type}</option>);

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
                        <FormGroup row>
                            <Col sm={4}>
                                <Label for="typeSelect">Recipe Type</Label>
                                <Input type="select" name="recipeType" id="typeSelect" onChange={this.handleChange} value={this.recipeTypeMap[recipe.recipeType]}>
                                    {recipeTypeOptions}
                                </Input>
                            </Col>
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
                            <Button color="secondary" tag={Link} to={'/'} className="cancelButton">Cancel</Button>
                            <Button color="danger" className="deleteButton" onClick={this.handleDelete}>Delete</Button>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default withRouter(RecipeForm);