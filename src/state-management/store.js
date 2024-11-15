import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../state-management/slices/userProfile';
import resumeInfoReducer from '../state-management/slices/ResumeInfo';
import mainReducer from '../state-management/slices/mainSlice';

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        resumeInfo: resumeInfoReducer,
        main: mainReducer,
    }
});

