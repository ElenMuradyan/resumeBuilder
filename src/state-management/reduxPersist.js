import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userProfileReducer from '../state-management/slices/userProfile';
import resumeInfoReducer from '../state-management/slices/ResumeInfo';
import mainReducer from '../state-management/slices/mainSlice';

const rootReducer = combineReducers({
    user: userProfileReducer,
    resume: resumeInfoReducer,
    ui: mainReducer,
});

const persistConfig = {
  key: 'root',
  storage, 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
