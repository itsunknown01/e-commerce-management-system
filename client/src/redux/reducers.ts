import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/auth";
import modalReducer from "./slices/modal";

export const reducers = combineReducers({
  auth: authReducer,
  modal: modalReducer,
});
