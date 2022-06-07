import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ROOT_URL = 'http://localhost:7000';

const initialState = {
    characters: [],
    status: null
};

export const fetchCharacter = createAsyncThunk('character/getCharacter', async () => {
    try {
        const response = await axios.get(`${ROOT_URL}/character`);
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
            .addCase(fetchCharacter.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchCharacter.fulfilled, (state, action) => {
                state.status = 'action successful'
                return action.payload;
            })
            .addCase(fetchCharacter.rejected, (state, action) => {
                state.status = 'action failed'   
                return action.payload;
            })
            
    }
})



export default characterSlice;