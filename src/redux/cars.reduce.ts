import { createSlice } from '@reduxjs/toolkit';

const carsToolkit = createSlice({
  name: 'carsSlice',
  initialState: {
    carsState: [],
    relevantCar: null,
    visibleCars: false,
  },
  reducers: {
    setAllCars(state: any, action: any) {
      state.carsState = action.payload;
    },

    setRelevantCar(state: any, action: any) {
      state.relevantCar = action.payload;
    },

    setVisibleCars(state: any, action: any) {
      state.visibleCars = action.payload;
    },
  },
});

export default carsToolkit.reducer;
export const { setRelevantCar, setAllCars, setVisibleCars } =
  carsToolkit.actions;
