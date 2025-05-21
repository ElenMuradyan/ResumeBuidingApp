import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserResumes } from "@/services/firebase/databeseActions";
import { Resume, SliceState } from "./types";

const initialState: SliceState = {
    loading: false,
    resumes: [],
    error: null
}

export const fetchUserResumes = createAsyncThunk<Resume[], string>(
    'user/fetchUserResumes',
    async (uid: string, { rejectWithValue }) => {
        console.log(uid);
        
      try {
        const data = await getUserResumes(uid);
        console.log(data);
        
        return data;  
      }catch(err: any){
        return rejectWithValue("Failed to fetch user resumes");
    }
    }
  );
  
const userResumeSlice = createSlice({
    name:'userResumes',
    initialState,
    reducers: {},
    extraReducers:(promise) => {
        promise
        .addCase(fetchUserResumes.pending, (state) =>{
            state.loading = true;
        })
        .addCase(fetchUserResumes.fulfilled, (state, action) =>{
            state.loading = false;
            state.resumes = action.payload as Resume[];
        })
        .addCase(fetchUserResumes.rejected, (state, action) =>{          
            state.loading = false;
            state.error = "Failed to fetch resumes"; 
            state.resumes = [];
        })
    }
})

export default userResumeSlice.reducer;
export const {  } = userResumeSlice.actions;