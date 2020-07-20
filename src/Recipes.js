import React, { Component } from 'react';
import './App.scss';
import AppNavbar from './AppNavbar';
import { withRouter } from 'react-router-dom';
import { Container, Table, ListGroup, ListGroupItem } from 'reactstrap'


class Recipes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [], 
            isLoading: true,
            dropdownStatuses: []
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('recipes/all')
            .then(response => response.json())
            .then(data => this.setState({recipes: data, isLoading: false}));
    }

    render() {
        const {recipes, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const recipeList = recipes.map(recipe => {
            if (recipe.id !== null) {
                var path = `/recipe/${recipe.id}/view`;
                return <ListGroupItem tag="a" href={path} action>{recipe.name}</ListGroupItem>
            }
        });

        return (
            <div>
                <AppNavbar />
                <Container>
                    <h1>Recipe List</h1>
                    <ListGroup>
                        {recipeList}
                    </ListGroup>
                </Container>
            </div>
        );
    }
}

export default withRouter(Recipes);