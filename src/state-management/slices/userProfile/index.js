import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_PATH_NAMES } from "../../../core/utils/constants";
import { db } from "../../../services/firebase";

const initialState = {
    loading: true,
    error: null,
    userProfileInfo: {
        isAuth: false,
        userData: {},
    }
}

export const fetchUserProfileInfo = createAsyncThunk(
    'data/fetchUserProfileInfo',
    async () => {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(auth, user => {
                if (user) {
                    const { uid } = user;
                    const userRef = doc(db, FIRESTORE_PATH_NAMES.REGISTER_USERS, uid);
                    getDoc(userRef)
                    .then(userData => {
                        if (userData.exists()){
                            resolve(userData.data());
                        }else{
                            resolve(null);
                        }
                    })
                }else{
                    reject('Something is wrong');
                }
            })
        })
    }
)
const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.userProfileInfo.isAuth = action.payload;
        }
    },
    extraReducers: promise => {
        promise
        .addCase(fetchUserProfileInfo.pending, state => {
            state.loading = true;
        })
        .addCase(fetchUserProfileInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.userProfileInfo.userData = action.payload;
            state.userProfileInfo.isAuth = true;
        })
        .addCase(fetchUserProfileInfo.rejected, (state, action) => {
            state.loading = false;
            state.userProfileInfo.userData = {};
            state.userProfileInfo.isAuth = false;
            state.error = action.payload;
        })
    }
})

export default userProfileSlice.reducer;
export const { setIsAuth } = userProfileSlice.actions;