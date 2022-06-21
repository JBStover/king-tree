import {Form, Button, Row, Col, Card } from 'react-bootstrap';
//import styled from 'styled-components';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const characters = useSelector(state => state.characters.characters)
    
    
    if (!_.isEmpty(characters)) {
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
                            <Card.Img variant="top" src={results.imageURL} />
                        </Card>  
                        </Col>         
                      
                         )}                             
                    </Row>
                    </FullContainer>
            </div>
        );
    } else {
        return (<h1>Character state is empty</h1>)        
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