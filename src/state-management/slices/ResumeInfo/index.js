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
    resumeId: new Date().getTime().toString(),
};

const resumeInfoSlice = createSlice({
    name: 'resumeInfo',
    initialState,
    reducers: {
        setProfileSection: (state, action) => {
            state.resumeData.profileSection = action.payload;
        },
        setResumeId: (state) => {
            state.resumeId = new Date().getTime().toString();
        },
    },
})

export default resumeInfoSlice.reducer;
export const { setProfileSection, setResumeId } = resumeInfoSlice.actions;