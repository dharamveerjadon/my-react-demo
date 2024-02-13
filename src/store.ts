import { configureStore } from '@reduxjs/toolkit';
import appReducer from './redux/carSlice';

const store = configureStore({
  reducer: {
    car: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;