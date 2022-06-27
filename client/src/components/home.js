import {Form, Button, Row, Col, Card } from 'react-bootstrap';
//import styled from 'styled-components';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const characters = useSelector(state => state.characters.characters);
    const books = useSelector(state => state.literature.books);
    
    console.log(characters)
    console.log(books)
    
    if (!_.isEmpty(characters) && _.isEmpty(books)) {
        return (
            <div>
                    <h3>Character Results</h3>
                    <FullContainer>
                    <Row className = 'mb-5 mt-5' md={5}>            
                        {characters.slice(0, 5).map((results) =>              
                        <Col>
                        <Card style={{ width: '18rem' }}>                        
                            <Card.Body>
                                <Card.Title>First Name: {results.firstName}</Card.Title>
                                <Card.Subtitle>Last Name: {results.lastName}</Card.Subtitle>
                                <Card.Text>Date of Birth: {results.dob}</Card.Text>                            
                            </Card.Body>                            
                        </Card>  
                        </Col>         
                      
                         )}                             
                    </Row>
                    </FullContainer>
            </div>
        );
    } else if (!_.isEmpty(books) && _.isEmpty(characters)) {
        return (<div>
            <h3>Books Results</h3>
            <FullContainer>
            <Row className = 'mb-5 mt-5' md={5}>            
                {characters.slice(0, 5).map((results) =>              
                <Col>
                <Card style={{ width: '18rem' }}>                        
                    <Card.Body>
                        <Card.Title> Title: {results.title}</Card.Title>
                        <Card.Subtitle>Release Date: {results.releaseDate}</Card.Subtitle>                                                    
                    </Card.Body>                    
                </Card>  
                </Col>         
              
                 )}                             
            </Row>
            </FullContainer>
    </div>)        
    } else {
        return (<div>Both pieces of state are empty</div>)
    }
    
   
};

export default Home;

const FullContainer = styled.div`
display: flex;
justify-content: center;
margin: 30px;
max-width: 100%;
`

const QuartContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 30px;
max-width: 100%;
`