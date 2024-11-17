import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current: 0,
    pages: {
        ProfileSection: {
            idx: 0,
            saved: false
        },
        EducationSection: {
            idx: 1,
            saved: false
        },
        MiniProjectSection: {
            idx: 2,
            saved: false
        },
        SocialSection: {
            idx: 3,
            saved: false
        },
        SkillsSection: {
            idx: 4,
            saved: false
        }
    }
}

const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        incrementCurrent: (state) => {
            if (state.current === 4 ) {
                state.current = 0;
            }else{
                state.current++;
            }
        },
        decrementCurrent: (state) => {
            if (state.current === 0 ) {
                state.current = 4;
            }else{
                state.current--;
            }
        },
        setCurrent: (state, action) => {
            state.current = action.payload;
        },
        setSavedToTrue: (state, action) => {
            state.pages[action.payload].saved = true;
        },
        setSavedToFalse: (state, action) => {
            state.pages[action.payload].saved = false;
        },
    }
})

export default mainSlice.reducer;
export const { decrementCurrent, incrementCurrent, setCurrent, setSavedToTrue, setSavedToFalse } = mainSlice.actions;