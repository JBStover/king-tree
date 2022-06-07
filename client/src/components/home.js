import {Form, Button } from 'react-bootstrap';
//import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <QuartContainer>
        <Form>
            <Form.Group className="mb-3" controlId="formCharacterName">
                <Form.Label>Character Name</Form.Label>
                <Form.Control type="firstname" placeholder="Enter Character Name" />                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formNovelName">
                <Form.Label>Novel Name</Form.Label>
                <Form.Control type="lastname" placeholder="Enter Novel Name" />
            </Form.Group>            
            <Button variant="primary" type="submit">
                Search
            </Button>
        </Form>
        </QuartContainer>
    );
};

export default Home;

const QuartContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 30px;
max-width: 100%;
`