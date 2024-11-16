import { createSlice } from "@reduxjs/toolkit";

export const education = {
    courseName: '',
    competitionYear: '',
    collegeSchool: '',
    percentage:''
};

export const miniProject = {
    name: '',
    techStack: '',
    description: '',
};

const initialState = {
    resumeData: {
        profileSection: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            adress: '',
            imgUrl: ''
        },
        educationSection: [education],
        skillsSection: [],
        miniProjects: [miniProject],
        socialSection: []
    },
    resumeId: '1234567890',
};

const resumeInfoSlice = createSlice({
    name: 'resumeInfo',
    initialState,
    reducers: {
        setProfileSection: (state, action) => {
            state.resumeData.profileSection = action.payload;
        },
        setResumeId: (state) => {
            // state.resumeId = new Date().getTime().toString();
        },
        setImgUrl: (state, action) => {
            state.resumeData.profileSection.imgUrl = action.payload;
        },
        setEducationSection: (state, action) => {
            state.resumeData.educationSection = action.payload;
        },
        setMiniProjectSection: (state, action) => {
            state.resumeData.miniProjects = action.payload;
        },
        setSkillsSection: (state, action) => {
            state.resumeData.skillsSection = action.payload;
        },
        setSocialSection: (state, action) => {
            state.resumeData.socialSection = action.payload;
        },
    },
})

export default resumeInfoSlice.reducer;
export const { setProfileSection, setResumeId, setImgUrl, setEducationSection, setMiniProjectSection, setSkillsSection, setSocialSection } = resumeInfoSlice.actions;