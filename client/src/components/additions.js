import {Form, Button, Row, Col, Card, radio, InputGroup, FormControl } from 'react-bootstrap';
import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import {addNewCharacter, postCharacter} from '../slices/characterSlice';
import {addNewLiterature, postLiterature} from '../slices/literatureSlice';
import { useDispatch, useSelector } from 'react-redux'; 


const additions = () => {
    const [radioState, setRadioState] = useState("");
    
    const [title, setTitle] = useState("");
    const [releaseDate, setReleaseDate] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstAppearance, setFirstAppearance] = useState("");
    const [lastAppearance, setLastAppearance] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(radioState);
    }, [radioState]);

    function handleLitSubmitClick(data) {
        dispatch(addNewLiterature({title: title, releaseDate: releaseDate}))
    };
    
    function handleCharSubmitClick() {
        dispatch(addNewCharacter({firstName: firstName, lastName: lastName, firstAppearance: firstAppearance, lastAppearance: lastAppearance}))
    };

    function renderCreation() {
        if (radioState === "Literature") {
            return(
                <div>
                <FullContainer>
                    <InputGroup onChange={event => setTitle(event.target.value)}>
                        <InputGroup.Text id="Book Title">Book Title</InputGroup.Text>
                        <FormControl placeholder='Title' />
                    </InputGroup>
                    <InputGroup onChange={event => setReleaseDate(event.target.value)}>
                        <InputGroup.Text id="Release Date">Release Date</InputGroup.Text>
                        <FormControl placeholder='Format MM/DD/YYYY'/>                           
                    </InputGroup>                    
                    
                </FullContainer>
                <Button type="submit" variant="primary" size="lg" onClick={() => handleLitSubmitClick()}>Submit</Button>
                </div>
            )
        } else if (radioState === "Character") {
            return(
                <div>
                <FullContainer>
                    <InputGroup onChange={event => setFirstName(event.target.value)}>
                        <InputGroup.Text id="Character First Name">First Name</InputGroup.Text>
                        <FormControl placeholder='First Name' />
                    </InputGroup>
                    <InputGroup onChange={event => setLastName(event.target.value)}>
                        <InputGroup.Text id="Character Last Name">Last Name</InputGroup.Text>
                        <FormControl placeholder='Last Name'/>                           
                    </InputGroup>
                    <InputGroup onChange={event => setFirstAppearance(event.target.value)}>
                        <InputGroup.Text id="Character First Appearance">First Appearance</InputGroup.Text>
                        <FormControl placeholder='Book title'/>                           
                    </InputGroup>
                    <InputGroup onChange={event => setLastAppearance(event.target.value)}>
                        <InputGroup.Text id="Character Last Appearance">Last Appearance</InputGroup.Text>
                        <FormControl placeholder='Last Appearance'/>                           
                    </InputGroup>
                    
                </FullContainer>
                <Button type="submit" onClick={() => handleCharSubmitClick()}>Submit</Button>
                </div>
            )
        }
    }

    return (
        <FullContainer>
        <Form>
        <Form.Group>
            <Form.Label>What are you adding?</Form.Label><br />
            <Form.Check  type="radio" name="charOrLit" label="Character" onClick={() => {setRadioState("Character")}}/>
            <Form.Check  type="radio" name="charOrLit" label="Literature" onClick={() => {setRadioState("Literature")}}/>
        </Form.Group>
        </Form>
        {renderCreation()}  
        </FullContainer>  
           
    )

    
};

export default additions;

const QuartContainer = styled.div`
display: flex;
justify-content: center;
margin: 30px;
max-width: 25%;
`

const FullContainer = styled.div`
display: flex;
justify-content: center;
margin: 30px;
max-width: 100%;
`
