import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth.slice';
import { bookingReducer } from './booking.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    booking: bookingReducer
  },
});