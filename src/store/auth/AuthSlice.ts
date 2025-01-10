import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    _id: '',
    phoneNumber: '',
    email: '',
    fullName: '',
    userType: '',
  },
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = {
        _id: action.payload._id,
        phoneNumber: action.payload.phoneNumber,
        email: action.payload.email,
        fullName: action.payload.fullName,
        userType: action.payload.userType,
      };
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    resetAuth: (state) => {
      state.user = {
        _id: '',
        phoneNumber: '',
        email: '',
        fullName: '',
        userType: '',
      };
      state.isAuthenticated = false;
    },
  },
});



// console.log('Payload in setAuth:', authSlice.action.payload);

// console.log("is authenticastef from authslice", state.auth.is);
export const { setAuth, resetAuth } = authSlice.actions;

export const selectIsAuthenticated = (state:any) => state.auth.isAuthenticated;

export const selectUserType = (state:any) => state.auth.userType;

export default authSlice.reducer;
