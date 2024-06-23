import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { SIGNUP, SIGNIN, PROFILEPICS } from "./URL";

const initialState = {
  user: null,
  loading: false,
  error: null,
  accessToken: null,
  refreshToken: null,
};
export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { fullname, username, telephone, email, password },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(SIGNUP, {
        fullname,
        username,
        telephone,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(SIGNIN, {
        email,
        password,
      });
      const { fullname, username, access_token, refresh_token } = response.data;
      // Store tokens in AsyncStorage
      await AsyncStorage.setItem("accessToken", access_token);
      await AsyncStorage.setItem("refreshToken", refresh_token);
      await AsyncStorage.setItem("fullname", fullname);
      await AsyncStorage.setItem("username", username);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadProfile = createAsyncThunk(
  "auth/uploadProfile",
  async ({ profileImage }, { rejectWithValue }) => {
    try {
      const response = await axios.post(PROFILEPICS, { profileImage });
      const { message } = response.data;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      AsyncStorage.removeItem("accessToken");
      AsyncStorage.removeItem("refreshToken");
      AsyncStorage.removeItem("fullname");
      AsyncStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.accessToken = action.payload.data.access_token;
        state.refreshToken = action.payload.data.refresh_token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadProfile.pending, (state) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(uploadProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadProfile.rejected, (state) => {
        state.loading = false;
      });
  },
});

//export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { logout } = authSlice.actions;
export default authSlice.reducer;
