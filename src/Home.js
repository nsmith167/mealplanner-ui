import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Container } from 'reactstrap'


class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <Container fluid>
                    <h1>Welcome to your meal planner!</h1>
                </Container>
            </div>
        );
    }
}

export default Home;