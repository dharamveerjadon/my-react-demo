import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Car } from '../types/Car';

interface AppState {
  cars: Car[];
}

const initialState: AppState = {
  cars: [],
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<any>) => {
      state.cars.push(action.payload);
    },
  },
});

export const { addCar } = carSlice.actions;
export default carSlice.reducer;