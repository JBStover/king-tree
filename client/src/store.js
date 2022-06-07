import { configureStore } from "@reduxjs/toolkit";
import  characterSlice  from "./slices/characterSlice";


const store = configureStore({
    reducer: {
        characters: characterSlice.reducer     
    }
});

export default store;