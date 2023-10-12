import { createSlice } from '@reduxjs/toolkit';

// create slice

const name = 'auth';
const initialState = createInitialState();
const extraActions = createExtraActions();
const slice = createSlice({
  name,
  initialState,
  reducers: {
    initializeState(state) {
      state = initialState
    },
    setLoadingTitle(state, action) {
      state.loadingTitle = action.payload
    }
  },
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
  return {
    loadingTitle: '',
    firstName: '',
    lastName: '',
    phonenumber: '',
  }
}

function createExtraActions() {
  const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

  return {
  };
}
