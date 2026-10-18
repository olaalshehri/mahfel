
import { configureStore } from "@reduxjs/toolkit";
import ticketReducer from "./bookingSlice";

// Create the Redux store

export const store = configureStore({
  reducer: {
    booking : ticketReducer ,
  },
});
