import { createSlice } from '@reduxjs/toolkit'


export const UserDataSlice = createSlice({
    name:"userData",

    initialState: {
        value: 10,
        
    },

    reducers: {
        fetchUserData: (state, action)=>{
            state.value = action.payload
        }
    }
})

export const {fetchUserData} = UserDataSlice.actions;
export default UserDataSlice.reducer;