import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {
  SIGNUP,
  SIGNIN,
  LOGIN_WITH_GOOGLE,
  CREATE_REPORT,
  AUTH_FEEDS,
} from "./URL";

const initialState = {
  user: null,
  loading: false,
  error: null,
  access_token: null,
  refresh_token: null,
  status: "",
  report: null,
  auth_feed: null,
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

      console.log("Signup response data:", response.data);
      return response.data;
    } catch (error) {
      console.log("Signup error response data:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Make a report endpoint
export const createReport = createAsyncThunk(
  "auth/createReport",
  async (
    {
      token,
      insidentType,
      textInput,
      date,
      selectedState,
      selectedLocalGov,
      albums,
      address,
      selectedId,
      isEnabled,
      storedRecording,
      photoUri,
      videoMedia,
      location,
      causeOfAccident,
      checkboxValue,
      airportName,
      time,
      country,
      ambassedor,
      stateEmbassey,
      hospitalName,
      hospitaleAddress,
      departmentNameHead,
      productName,
      autageLength,
      roadName,
      schoolName,
      schoolHead,
      terminal,
      queueTime,
      airline,
      categ,
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      if (insidentType) {
        formData.append("sub_report_type", insidentType);
      }
      if (categ) {
        formData.append("category", categ);
      }
      formData.append("description", textInput);
      formData.append("date_of_incidence", date);
      if (selectedState) {
        formData.append("state_name", selectedState);
        formData.append("lga_name", selectedLocalGov);
      }
      if (address) {
        formData.append("landmark", address);
      }
      if (selectedId) {
        formData.append("rating", selectedId);
      }
      if (isEnabled) {
        formData.append("is_anonymous", isEnabled);
      }
      if (location) {
        if (location.latitude) {
          formData.append("latitude", location.latitude);
        }
        if (location.longitude) {
          formData.append("longitude", location.longitude);
        }
      }
      if (causeOfAccident) {
        formData.append("accident_cause", causeOfAccident);
      }
      if (checkboxValue) {
        formData.append("is_response", checkboxValue);
      }
      if (airportName) {
        formData.append("airport_name", airportName);
      }
      if (time) {
        formData.append("time_of_incidence", time);
      }
      if (country) {
        formData.append("country", country);
      }
      if (stateEmbassey) {
        formData.append("state_embassy_location", stateEmbassey);
      }
      if (ambassedor) {
        formData.append("ambassedor_name", ambassedor);
      }

      if (terminal) {
        //TODO: fill in later
      }
      if (queueTime) {
        //TODO: fill in later
      }
      if (airline) {
        formData.append("airline_name", airline);
      }

      if (schoolName) {
        formData.append("school_name", schoolName);
      }
      if (hospitalName) {
        formData.append("hospital_name", hospitalName);
      }
      if (hospitaleAddress) {
        formData.append("hospital_address", hospitaleAddress);
      }
      if (roadName) {
        formData.append("road_name", roadName);
      }
      if (schoolHead) {
        formData.append("vice_principal", schoolHead);
      }
      if (department) {
        formData.append("department", department);
      }
      if (departmentNameHead) {
        formData.append("department_head_name", departmentNameHead);
      }
      if (productName) {
        formData.append("product_name", productName);
      }
      if (autageLength) {
        formData.append("outage_length", autageLength);
      }
      if (albums) {
        const fileType = albums.substring(albums.lastIndexOf(".") + 1);
        const mimeType =
          fileType === "jpg" || fileType === "jpeg"
            ? "image/jpeg"
            : fileType === "png"
            ? "image/png"
            : fileType === "mp4"
            ? "video/mp4"
            : "audio/mpeg";
        formData.append("media_type", {
          uri: albums,
          type: mimeType,
          name: albums,
        });
      }

      const appendFileToFormData = (uri, index, typePrefix) => {
        if (uri) {
          const fileType = uri.substring(uri.lastIndexOf(".") + 1);
          const mimeType =
            fileType === "jpg" || fileType === "jpeg"
              ? "image/jpeg"
              : fileType === "png"
              ? "image/png"
              : fileType === "mp4"
              ? "video/mp4"
              : "audio/mpeg";
          formData.append(`mediaFiles`, {
            uri: uri,
            type: mimeType,
            name: `${typePrefix}_${index}.${fileType}`,
          });
        }
      };

      if (photoUri) {
        appendFileToFormData(photoUri, 0, "photo");
      }

      if (videoMedia) {
        appendFileToFormData(videoMedia, 1, "video");
      }

      if (storedRecording) {
        appendFileToFormData(storedRecording, 2, "audio");
      }

      const response = await axios.post(CREATE_REPORT, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("report created successfully:", response.data);
      return response.data;
    } catch (error) {
      console.log("report error:", error.response.data);
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
      const { access_token, refresh_token } = response.data.data;

      await AsyncStorage.setItem("access_token", access_token);
      await AsyncStorage.setItem("refresh_token", refresh_token);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authFeed = createAsyncThunk(
  "auth/authFeed",
  async ({ access_token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(AUTH_FEEDS, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      });
      console.log("Auth Feeds successfully gotten:", response.data);
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
      state.access_token = null;
      state.refresh_token = null;
      AsyncStorage.removeItem("access_token");
      AsyncStorage.removeItem("refresh_token");
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
        state.user = action.payload.data;
        state.status = action.payload.status;
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
        state.access_token = action.payload.data.access_token;
        state.refresh_token = action.payload.data.refresh_token;
      })
      .addCase(login.rejected, (state, action) => {
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
      .addCase(createReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(createReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(authFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authFeed.fulfilled, (state, action) => {
        state.loading = false;
        state.auth_feed = action.payload.data;
        //state.status = action.payload.status;
      })
      .addCase(authFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
