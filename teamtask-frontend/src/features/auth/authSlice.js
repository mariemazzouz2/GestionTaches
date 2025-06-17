import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

export const loginUser = createAsyncThunk('auth/loginUser', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/login`, data);
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export const registerUser = createAsyncThunk('auth/registerUser', async (data, thunkAPI) => {
  try {
    const res = await axios.post(`${API_URL}/register`, data);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: user || null,
    token: token || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
