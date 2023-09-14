import { configureStore } from "@reduxjs/toolkit";
import selectedTopicsSlice from "./selectedTopicsSlice";


const store = configureStore({
    reducer : {
        selectedTopics : selectedTopicsSlice
    }
})

export default store;