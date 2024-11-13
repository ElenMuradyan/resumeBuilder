import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '../state-management/slices/userProfile'

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer
    }
});

