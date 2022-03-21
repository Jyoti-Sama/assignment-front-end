import { createSlice } from '@reduxjs/toolkit'


export const EditSubjectDataSlice = createSlice({
    name:"editSubjectData",

    initialState: {
        value: [{
            _id:"",
            subject:"",
            year:2022,
            image:"",
            exam:"",
            AboutPaper:"",
          }],
          isEditClicked: false,
          isMainPartReloaded: false,
          isSubjectAdded: false,
          sem: "",
          selectedSub: "",
          isModalOpen: false
        
    },

    reducers: {
        setEditSubjectData: (state, action)=>{
            state.value = action.payload
        },
        setIsEditClicked: (state, action) => {
            state.isEditClicked = action.payload;
        },
        setIsMainPartReload: (state, action) => {
            state.isMainPartReloaded = action.payload;
        },
        setIsSubjectAdded: (state, action) => {
            state.isSubjectAdded = action.payload;
        },
        setSem : (state, action) => {
            state.theSem = action.payload;
        },
        setSelectedSub: (state, action) => {
            state.selectedSub = action.payload;
        },
        setIsModalOpen: (state, action) => {
            state.isModalOpen = action.payload;
        }, 
    }
})

export const {setEditSubjectData} = EditSubjectDataSlice.actions;
export const {setIsEditClicked} = EditSubjectDataSlice.actions;
export const {setIsMainPartReload} = EditSubjectDataSlice.actions;
export const {setIsSubjectAdded} = EditSubjectDataSlice.actions;
export const {setSem} = EditSubjectDataSlice.actions;
export const {setSelectedSub} = EditSubjectDataSlice.actions;
export const {setIsModalOpen} = EditSubjectDataSlice.actions;


export default EditSubjectDataSlice.reducer;