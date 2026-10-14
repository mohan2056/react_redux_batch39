import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services/userService.js';
import { getApiError } from '../../utils/apiError.js';

export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, { rejectWithValue }) => {
  try {
    return await userService.getAll();
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

export const fetchUserById = createAsyncThunk('users/fetchById', async (id, { rejectWithValue }) => {
  try {
    return await userService.getById(id);
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

export const addUser = createAsyncThunk('users/add', async (values, { rejectWithValue }) => {
  try {
    return await userService.create(values);
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

export const updateUser = createAsyncThunk('users/update', async ({ id, values }, { rejectWithValue }) => {
  try {
    return await userService.update(id, values);
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

export const deleteUser = createAsyncThunk('users/delete', async (id, { rejectWithValue }) => {
  try {
    return await userService.remove(id);
  } catch (error) {
    return rejectWithValue(getApiError(error));
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    current: null,
    listStatus: 'idle',
    currentStatus: 'idle',
    saving: false,
    deleting: false,
    error: null,
  },
  reducers: {
    clearCurrent(state) {
      state.current = null;
      state.currentStatus = 'idle';
    },
    clearUserError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.listStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload;
        state.listStatus = 'succeeded';
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.listStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchUserById.pending, (state) => {
        state.current = null;
        state.currentStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.current = action.payload;
        state.currentStatus = 'succeeded';
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.currentStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(addUser.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.current = action.payload;
        state.saving = false;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.current = action.payload;
        state.saving = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.deleting = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        if (state.current?.id === action.payload) state.current = null;
        state.deleting = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrent, clearUserError } = usersSlice.actions;
export default usersSlice.reducer;
