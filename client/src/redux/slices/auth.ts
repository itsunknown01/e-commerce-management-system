import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types/user";

type AuthStateType = {
  token: string | null;
  isAuthenticated: boolean;
  userInfo: UserType | null;
};

const initialState: AuthStateType = {
  token: null,
  isAuthenticated: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem(
        "authenticated",
        JSON.stringify(state.isAuthenticated)
      );
      state.userInfo = action.payload.userInfo;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("authenticated");
      state.userInfo = null;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     authApiSlice.endpoints.login.matchFulfilled,
  //     (state, action) => {
  //       state.token = action.payload.accessToken;
  //       state.isAuthenticated = true;
  //       state.userInfo = action.payload.userInfo;
  //       localStorage.setItem(
  //         "authenticated",
  //         JSON.stringify(state.isAuthenticated)
  //       );
  //     }
  //   );
  //   builder.addMatcher(
  //     authApiSlice.endpoints.refreshToken.matchFulfilled,
  //     (state, action) => {
  //       state.token = action.payload.accessToken;
  //     }
  //   );
  // },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
