import {React, useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { LinkContainer, } from 'react-router-bootstrap';
import {getCharacter} from '../slices/characterSlice';
import { useDispatch, useSelector } from 'react-redux'; 



function TitleBar() {
    const characters = useSelector(state => state.characters.characters)
    const [searchParam, setSearchParam] = useState("");
    
    const dispatch = useDispatch();
  
    async function handleLogoutClick () {      
    };

    async function handleSearchClick (data) {
        const searchString = data.split(" ");
        
        const firstName = searchString[0];
        const lastName = searchString[1];
        console.log(firstName + lastName)
        dispatch(getCharacter({firstName: firstName, lastName: lastName}));
    };
  
  
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
      <Navbar.Brand href="home">King Tree</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to="/">
          <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/updates">
          <Nav.Link>Updates</Nav.Link>
          </LinkContainer>        
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <LinkContainer to="/login"><NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item></LinkContainer>
            <LinkContainer to="/about"><NavDropdown.Item href="#action/3.2">About</NavDropdown.Item></LinkContainer>          
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" onClick={() => handleLogoutClick()}>Logout</NavDropdown.Item>
          </NavDropdown>
          </Nav>
          <Form className="d-flex">
        <FormControl
          onChange={event => setSearchParam(event.target.value)}
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
        <Button variant="outline-success" onClick={() => handleSearchClick(searchParam)}>Search</Button>
      </Form>
          </Navbar.Collapse>
      </Container>
      </Navbar>
      
      
      
      );
  }
  export default TitleBar;