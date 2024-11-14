import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profileSection: {
        firstName: '', 
        lastName: '', 
        phoneNumber: '', 
        adress: '',
        imgUrl: ''
    },
    educationSection: {},
    skillsSection: {},
    miniProjects: {},
    socialSection: {}
}

const resumeInfoSlice = createSlice({
    name: 'resumeInfo',
    initialState,
    reducers: {
        setProfileSection: (state, action) => {
            state.profileSection = action.payload;
        }
    },
})

export default resumeInfoSlice.reducer;
export const { setProfileSection } = resumeInfoSlice.actions;