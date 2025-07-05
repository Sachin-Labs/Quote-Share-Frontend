import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "../slice/quoteSlice";
import userReducer from '../slice/userSlice';

const store = configureStore({
    reducer:{
        user: userReducer,
        quote: quoteReducer
    }
})

export default store;