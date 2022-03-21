import { createSlice } from '@reduxjs/toolkit'


export const SubjectDataSlice = createSlice({
    name:"subjectData",

    initialState: {
        value: [{
            _id:"1",
            sem:"sem_06",
            subject:"control",
            year:2022,
            image:"",
            exam:"It's a default card",
            AboutPaper:"please select subject and sem then press search to load assignments"
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