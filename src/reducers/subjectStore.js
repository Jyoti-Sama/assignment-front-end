import { createSlice } from '@reduxjs/toolkit'


export const SubjectDataSlice = createSlice({
    name:"subjectData",

    initialState: {
        value: [{
            _id:"1",
            subject:"subject name",
            year:2022,
            image:null,
            exam:"exam type",
            AboutPaper:"its a example"
          }],
        
    },

    reducers: {
        setSubjectData: (state, action)=>{
            state.value = action.payload
        }
    }
})

export const {setSubjectData} = SubjectDataSlice.actions;
export default SubjectDataSlice.reducer;