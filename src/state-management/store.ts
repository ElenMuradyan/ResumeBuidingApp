import { configureStore } from "@reduxjs/toolkit";
import userProfileReducer from '@/features/auth/userSlice';
import userResumesReducer from '@/features/resume/resumesSlice';

export const store = configureStore({
    reducer: {
        userProfile: userProfileReducer,
        userResumes: userResumesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;