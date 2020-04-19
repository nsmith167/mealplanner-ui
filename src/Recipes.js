import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Container, Table } from 'reactstrap'


class Recipes extends Component {

    constructor(props) {
        super(props);
        this.state = {recipes: [], isLoading : true};
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
            return <tr key={recipe.id}>
                <td>{recipe.name}</td>
            </tr>
        });

        return (
            <div>
                <AppNavbar />
                <Container>
                    <h1>Recipe List</h1>
                    <Table>
                        <thead>
                            <th scope="col">Name</th>
                        </thead>
                        <tbody id="recipes">
                            {recipeList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Recipes;