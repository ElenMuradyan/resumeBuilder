import { createSlice } from "@reduxjs/toolkit";

export const education = {
    courseName: '',
    competitionYear: '',
    collegeSchool: '',
    percentage:''
};

const skill = '';

export const miniProject = {
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
        educationSection: [education],
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
        setEducationSection: (state, action) => {
            state.resumeData.educationSection = action.payload;
        },
        addEducation: state => {
            state.resumeData.educationSection.push(education);
        },
        deleteEducation: state => {
            state.resumeData.educationSection.pop();
        },
        addMiniProject: state => {
            state.resumeData.miniProjects.push(miniProject);
        },
        deleteMiniProject: state => {
            state.resumeData.miniProjects.slice(0, state.resumeData.miniProjects.length-1);
        },
        setMiniProjectSection: (state, action) => {
            state.resumeData.miniProjects = action.payload;
        },
    },
})

export default resumeInfoSlice.reducer;
export const { setProfileSection, setResumeId, setImgUrl, setEducationSection, addEducation, deleteEducation, addMiniProject, deleteMiniProject, setMiniProjectSection } = resumeInfoSlice.actions;