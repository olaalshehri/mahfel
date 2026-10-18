
import { createSlice } from "@reduxjs/toolkit";

// The name of the booking state
const bookingSlice = createSlice({
  name: "booking",

  // Set the initial booking state
  initialState: {
    quantity: 1,
  },

  // Functions to update add the booking state

  reducers: {
    addTicket: (state) => {
      state.quantity += 1;
    },

  // Remove one ticket, but keep at least one
    removeTicket: (state) => {
      if (state.quantity > 1) {
        state.quantity -= 1;
      }  
    },
  },
});

export const {
  addTicket,
  removeTicket,
} = bookingSlice.actions;

export default bookingSlice.reducer;
