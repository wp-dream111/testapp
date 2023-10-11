import { createSlice } from '@reduxjs/toolkit';

// create slice

const name = 'auth';
const initialState = createInitialState();
const reducers = createReducers();
const extraActions = createExtraActions();
const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: builder => {
    builder
      .addCase('action', (state, action) => {
      })
      .addCase('anotherAction', (state, action) => {
      })
  }
});

// exports

export const authActions = { ...slice.actions, ...extraActions };
export const authReducer = slice.reducer;

// implementation

function createInitialState() {
  return {}
}

function createReducers() {
  return {};
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

  return {
  };
}
