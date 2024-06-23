import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Redux/authSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
  },
});
