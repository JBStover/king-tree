import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ROOT_URL = 'http://localhost:7000';

const initialState = {
    books: [],
    status: null
};

//router.get("/character/:firstName/:lastName"

export const getLiterature = createAsyncThunk('literature/getLiterature', async (searchedBook) => {
    const searchedTitle = searchedBook.title;    

    try {        
        const response = await axios.get(`${ROOT_URL}/literature/${searchedTitle}`);
        console.log(response)
        return response.data;
    } catch (err) {
        return err.message;
    }
});

export const addNewLiterature = createAsyncThunk('literature/addNewLiterature', async (newBook) => {  
    
    try {
        const response = await axios.post(`${ROOT_URL}/literature`, newBook)        
        return response.data;
    } catch (err) {
        return err.message;
    }
});

const literatureSlice = createSlice({
    name: 'literature',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getLiterature.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getLiterature.fulfilled, (state, action) => {
                state.status = 'action successful'
                state.books = action.payload;
                
            })
            .addCase(getLiterature.rejected, (state, action) => {
                state.status = 'action failed'   
                return action.payload;
            })
            
    }
})



export default literatureSlice;