import { configureStore, createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: [],
  reducers: {
    addAppointment: (state, action) => {
      state.push({
        id: Date.now(),
        parent: action.payload.parent,
        doctor: action.payload.doctor,
        status: "pending"
      });
    },
    confirmAppointment: (state, action) => {
      const appt = state.find((a) => a.id === action.payload);
      if (appt) appt.status = "confirmed";
    },
    cancelAppointment: (state, action) => {
      return state.filter((a) => a.id !== action.payload);
    }
  }
});

export const { addAppointment, confirmAppointment, cancelAppointment } =
  appointmentSlice.actions;

export const store = configureStore({
  reducer: { appointments: appointmentSlice.reducer }
});
