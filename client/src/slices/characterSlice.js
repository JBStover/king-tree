import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ROOT_URL = 'http://localhost:7000';

const initialState = {
    characters: [],
    status: null
};

//router.get("/character/:firstName/:lastName"

export const getCharacter = createAsyncThunk('character/getCharacter', async (searchedName) => {
    console.log(searchedName)  
    const searchedFirstName = searchedName.firstName;
    const searchedLastName = searchedName.lastName;

    try {        
        const response = await axios.get(`${ROOT_URL}/character/${searchedFirstName}/${searchedLastName}`);
        console.log(response)
        return response.data;
    } catch (err) {
        return err.message;
    }
});

export const addNewCharacter = createAsyncThunk('character/addNewCharacter', async (body) => {
    try {
        const response = await axios.post(`${ROOT_URL}/character`);
        return response.data;
    } catch (err) {
        return err.message;
    }
});

const characterSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getCharacter.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getCharacter.fulfilled, (state, action) => {
                state.status = 'action successful'
                state.characters = state.characters.concat(action.payload);
                
            })
            .addCase(getCharacter.rejected, (state, action) => {
                state.status = 'action failed'   
                return action.payload;
            })
            
    }
})



export default characterSlice;