import { createSlice } from "@reduxjs/toolkit";

const selectedTopicsSlice = createSlice({
    name : "selectedTopics" ,
    initialState : {
        selectedTopicsArray : []
    },
    reducers : {
        addSelectedTopics : (state , action)=>{
            state.selectedTopicsArray.push(action.payload)
        } ,
        removeSelectedTopics : (state , action) =>{
            state.selectedTopicsArray = state.selectedTopicsArray.filter((topics)=>topics!==action.payload)
        }
    }
})

export const {addSelectedTopics , removeSelectedTopics} = selectedTopicsSlice.actions;
export default selectedTopicsSlice.reducer;