import React, { Component } from 'react';
import './App.scss';
import AppNavbar from './AppNavbar';
import { Container, Table, UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'


class Recipes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [], 
            isLoading: true,
            dropdownStatuses: []
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('recipes/all')
            .then(response => response.json())
            .then(data => this.setState({recipes: data, isLoading: false}));
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
        const {recipes, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const recipeList = recipes.map(recipe => {
            if (recipe.id !== null) {
                var path = `/recipe/${recipe.id}`;
                return <tr key={recipe.id}>
                    <td>{recipe.name}</td>
                    <td>
                        <UncontrolledButtonDropdown>
                            <DropdownToggle caret>
                                Actions
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href={path}>Edit</DropdownItem>
                                <DropdownItem onClick={this.handleDelete}>Delete</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>
                    </td>
                </tr>
            }
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