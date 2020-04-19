import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Container, Form, FormGroup, Label, Input, Row, Col, Button } from 'reactstrap'


class NewRecipe extends Component {
    render() {
        return (
            <div>
                <AppNavbar />
                <Container>
                    <h1>New Recipe</h1>
                    <Form>
                        <FormGroup>
                            <Label for="inputName">Name</Label>
                            <Input type="text" id="inputName" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="inputInstructions">Instructions</Label>
                            <Input type="text" id="inputInstructions" />
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col sm="6">
                                    <Label for="inputIngredient">Ingredient</Label>
                                    <Input type="text" id="inputIngredient" />
                                </Col>
                                <Col sm="3">
                                    <Label for="inputQty">Qty</Label>
                                    <Input type="text" id="inputQty" />
                                </Col>
                                <Col sm="3">
                                    <Label for="inputUnit">Unit</Label>
                                    <Input type="text" id="inputUnit" />
                                </Col>
                            </Row>
                        </FormGroup>
                        <Button>Submit</Button>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default NewRecipe;