import { createSlice,PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    chat : []
}

export const promptSlice = createSlice({
    name:'promptSlice',
    initialState:initialState,
    reducers:{
        setChatArray:function(state,action){
            console.log('state',state)
            console.log('action',action)
        }
    }
})

export const {
    setChatArray
} = promptSlice.actions
export default promptSlice.reducer