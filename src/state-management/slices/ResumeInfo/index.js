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
        socialSection: {
            instagram: '',
            facebook: '',
            twitter: '',
            linkedin: ''
        },
        created: false
    },
    resumeId: '',
};

const resumeInfoSlice = createSlice({
    name: 'resumeInfo',
    initialState,
    reducers: {
        setProfileSection: (state, action) => {
            state.resumeData.profileSection = action.payload;
        },
        setResumeId: (state, action) => {
            state.resumeId = action.payload;
        },
        setCreated: (state) => {
            state.resumeData.created = true;
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
        resumeInfoRender: () => initialState,
    },
})

export default resumeInfoSlice.reducer;
export const { setProfileSection, setResumeId, setImgUrl, setEducationSection, setMiniProjectSection, setSkillsSection, setSocialSection, resumeInfoRender, setCreated } = resumeInfoSlice.actions;