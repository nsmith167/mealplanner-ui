import React, { Component } from 'react';
import './App.scss';
import AppNavbar from './AppNavbar';
import { Container, Table } from 'reactstrap'


class Schedule extends Component {

    constructor(props) {
        super(props);
        this.state = {meals: [], isLoading : true};
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('recipes/schedule')
            .then(response => response.json())
            .then(data => this.setState({meals: data, isLoading: false}));
    }

    render() {

        const {meals, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const schedule = meals.map(meal => {
            return <tr key={meal.id}>
                <td>{meal.day}</td>
                <td>{meal.recipe.name}</td>
            </tr>
        });
        
        return (
            <div>
                <AppNavbar />
                <Container>
                    <h1>Meal Schedule</h1>
                        <Table>
                            <thead>
                                <th scope="col">Day</th>
                                <th scope="col">Name</th>
                            </thead>
                            <tbody id="recipes">
                                {schedule}
                            </tbody>
                        </Table>
                </Container>
            </div>
        );
    }
}

export default Schedule;