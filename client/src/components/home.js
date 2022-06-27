import {Form, Button, Row, Col, Card } from 'react-bootstrap';
//import styled from 'styled-components';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import Tree from 'react-d3-tree';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const characters = useSelector(state => state.characters.characters);
    const books = useSelector(state => state.literature.books);
    
    console.log(characters)
    console.log(books)    
    

    if (!_.isEmpty(characters) && _.isEmpty(books)) {
        const resultsChart = {
            name: characters.firstName,
            children: [
              {         
                name: characters.literature[0].title,
                attributes: {
                  'Release Date': characters.literature[0].releaseDate,
                },
                
                      }
               
                    ]}
        
        return (
            
                // `<Tree />` will fill width/height of its container; in this case `#treeWrapper`.
                <div id="treeWrapper" style={{ width: '100em', height: '100em' }}>
                  <Tree data={resultsChart} />
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