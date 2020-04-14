import React, {Component} from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar color="dark" dark expand="lg">
            <NavbarBrand tag={Link} to="/">Meal Planner</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="#">All Recipes</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">New Recipe</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Schedule</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    }
}