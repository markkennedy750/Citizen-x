import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  SIGNUP,
  LOGIN_WITH_GOOGLE,
  AUTH_FEEDS,
  PROFILE,
  USER_REWARD,
  SEARCH,
  BOOKMARK_FEED,
} from "./URL";

const initialState = {
  user: null,
  loading: false,
  bookmarkLoading: false,
  bookmarkError: null,
  error: null,
  access_token: null,
  refresh_token: null,
  status: "",
  report: null,
  auth_feed: null,
  availableCoins: null,
  auth_UserFeed: null,
  search_feed: null,
  bookmark_feed: null,
};

export const signup = createAsyncThunk(
  "auth/signup",
  async (
    { fullname, username, phoneNumber, email, password, profileImage },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("telephone", phoneNumber);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profileImage) {
        const fileType = profileImage.substring(
          profileImage.lastIndexOf(".") + 1
        );
        formData.append("profile_image", {
          uri: profileImage,
          type: `image/${fileType}`,
          name: `profile_image.${fileType}`,
        });
      }

      console.log("Form Data before sending to server:", formData);
      const response = await axios.post(SIGNUP, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const userDetails = {
        fullname,
        username,
        phoneNumber,
        email,
        profileImage,
      };
      console.log("Signup response data:", response.data);
      await AsyncStorage.setItem("user_details", JSON.stringify(userDetails));
      return response.data;
    } catch (error) {
      console.log("Signup error response data:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const authFeed = createAsyncThunk(
  "auth/authFeed",
  async ({ access_token }, { rejectWithValue }) => {
    try {
      if (access_token) {
        const response = await axios.get(AUTH_FEEDS, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        return response.data.incident_reports;
      } else {
        const response = await axios.get(AUTH_FEEDS);
        return response.data.incident_reports;
      }
      // console.log(
      //   "Auth Feeds successfully gotten:",
      //   response.data.incident_reports
      // );
    } catch (error) {
      console.log("Error fetching feed", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSearchFeed = createAsyncThunk(
  "auth/authSearchFeed",
  async (
    { access_token, reportType, selectedState, selectedLocalGov },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(
        `${SEARCH}/category=${reportType}&state=${selectedState}&lga=${selectedLocalGov}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      // console.log(
      //   "Auth Feeds successfully gotten:",
      //   response.data.incident_reports
      // );
      return response.data.reports;
    } catch (error) {
      console.log("Error fetching feed", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookmarkPost = createAsyncThunk(
  "auth/bookmarkPost",
  async ({ access_token, id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BOOKMARK_FEED}/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // console.log(
      //   "Auth Feeds successfully gotten:",
      //   response.data.incident_reports
      // );
      return response.data.message;
    } catch (error) {
      console.log("Error fetching feed", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile_sec = createAsyncThunk(
  "auth/profile_sec",
  async ({ access_token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(PROFILE, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      //console.log("the user details:", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("Error fetching feed", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const rewardCount = createAsyncThunk(
  "auth/rewardCount",
  async ({ access_token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(USER_REWARD, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("user reward count:", response.data);
      return response.data;
    } catch (error) {
      console.log("Error fetching feed", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(LOGIN_WITH_GOOGLE);
      const { access_token, refresh_token } = response.data;

      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);

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
      AsyncStorage.removeItem("access_token");
      AsyncStorage.removeItem("refresh_token");
      AsyncStorage.removeItem("fullname");
      AsyncStorage.removeItem("username");
      AsyncStorage.removeItem("user_details");
    },
    resetUserStatus: (state) => {
      state.user = null;
      state.status = "";
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
        state.user = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        //state.user = action.payload;
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(authFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.auth_feed = action.payload;
      })
      .addCase(authFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(authSearchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authSearchFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.search_feed = action.payload;
      })
      .addCase(authSearchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(profile_sec.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(profile_sec.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(profile_sec.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(rewardCount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rewardCount.fulfilled, (state, action) => {
        state.loading = false;
        state.availableCoins = action.payload;
      })
      .addCase(rewardCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookmarkPost.pending, (state) => {
        state.bookmarkLoading = true;
        state.bookmarkError = null;
      })
      .addCase(bookmarkPost.fulfilled, (state, action) => {
        state.bookmarkLoading = false;
      })
      .addCase(bookmarkPost.rejected, (state, action) => {
        state.bookmarkLoading = false;
        state.bookmarkError = action.payload;
      });
  },
});

export const { logout, resetUserStatus } = authSlice.actions;
export default authSlice.reducer;
