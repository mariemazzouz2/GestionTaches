import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const TASK_URL = 'http://localhost:5000/api/tasks';

const getToken = () => localStorage.getItem('token');

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, thunkAPI) => {
  try {
    const res = await axios.get(TASK_URL, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

export const createTask = createAsyncThunk('tasks/createTask', async (task, thunkAPI) => {
  try {
    const res = await axios.post(TASK_URL, task, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.msg);
  }
});

// **AJOUT DE updateTask**
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }, thunkAPI) => {
    try {
      const res = await axios.put(`${TASK_URL}/${id}`, updates, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // Gérer updateTask ici
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(task => task._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
