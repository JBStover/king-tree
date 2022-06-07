import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer, } from 'react-router-bootstrap';

import { useDispatch, useSelector } from 'react-redux'; 



function TitleBar() {
    const dispatch = useDispatch();
  
    async function handleLogoutClick () {
      
      
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
          </Navbar.Collapse>
      </Container>
      </Navbar>
      
      
      
      );
  }
  export default TitleBar;