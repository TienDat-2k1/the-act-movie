import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './Home/homeSlice';
import userSlice from './user/userSlice';

const store = configureStore({
  reducer: { home: homeSlice, user: userSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
