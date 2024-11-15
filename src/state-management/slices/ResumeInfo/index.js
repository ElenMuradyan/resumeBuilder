import { createSlice } from "@reduxjs/toolkit";

const education = {
    courseName: '',
    competitionYear: '',
    collegeSchool: '',
    percentage:''
};

const skill = '';

const miniProject = {
    name: '',
    techStack: '',
    description: '',
};
const socialLink = '';

const initialState = {
    resumeData: {
        profileSection: {
            firstName: '', 
            lastName: '', 
            phoneNumber: '', 
            adress: '',
            imgUrl: ''
        },
        educationSection: [
            education
        ],
        skillsSection: [skill],
        miniProjects: [miniProject],
        socialSection: [socialLink]
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
    },
})

export default resumeInfoSlice.reducer;
export const { setProfileSection, setResumeId, setImgUrl } = resumeInfoSlice.actions;