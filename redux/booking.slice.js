import { createSlice } from '@reduxjs/toolkit';

// create slice

const name = 'booking';
const initialState = createInitialState();
const extraActions = createExtraActions();
const slice = createSlice({
  name,
  initialState,
  reducers: {
    initializeState(state) {
			state = initialState
		},
    setOrigin(state, action) {
      state.origin = action.payload
    },
    setDestination(state, action) {
      state.destination = action.payload
    },
    setDepartureDate(state, action) {
      state.departureDate = action.payload
    },
    setReturnDate(state, action) {
      state.returnDate = action.payload
    },
    setIsDetail(state, action) {
      state.isDetail = action.payload
    },
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

export const bookingActions = { ...slice.actions, ...extraActions };
export const bookingReducer = slice.reducer;

// implementation

function createInitialState() {
  return {
    bookings: [],
    origin: '',
    destination: '',
    departureDate: new Date().getTime(),
    returnDate: new Date().getTime(),
    isDetail: false,
  }
}

function createExtraActions() {
  return {};
}
