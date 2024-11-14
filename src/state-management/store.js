import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../state-management/slices/userProfile';
import resumeInfoReducer from '../state-management/slices/ResumeInfo';

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        resumeInfo: resumeInfoReducer
    }
});

