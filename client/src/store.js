import { configureStore } from "@reduxjs/toolkit";
import  characterSlice  from "./slices/characterSlice";
import literatureSlice from "./slices/literatureSlice";


const store = configureStore({
    reducer: {
        characters: characterSlice.reducer, 
        literature: literatureSlice.reducer    
    }
});

export default store;