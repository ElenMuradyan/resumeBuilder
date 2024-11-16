import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    current: 0
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
        }
    }
})

export default mainSlice.reducer;
export const { decrementCurrent, incrementCurrent, setCurrent } = mainSlice.actions;