import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
  'login/register',
  async (auth, { rejectWithValue }) => {
    try {
      const res = await axios.post(process.env.REACT_APP_REGISTER_URL, auth, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  auth: {
    username: '',
    password: '',
  },
  isLoginView: true,
  loading: false,
  errMessage: {},
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    editUserName: (state, action) => {
      state.auth.username = action.payload;
    },
    editPassword: (state, action) => {
      state.auth.password = action.payload;
    },
    toggleLogin: (state, action) => {
      state.isLoginView = !state.isLoginView;
    },
    inputErrMessage: (state, action) => {
      state.errMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.errMessage = action.payload;
    });
  },
});

export const { editUserName, editPassword, toggleLogin, inputErrMessage } =
  loginSlice.actions;

export const selectAuth = (state) => state.login.auth;
export const selectIsLoginView = (state) => state.login.isLoginView;
export const selectLoading = (state) => state.login.loading;
export const selectLoginErr = (state) => state.login.errMessage;

export default loginSlice.reducer;
