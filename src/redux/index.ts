import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';

import userReducer from './user.reducer';
import carsReducer from './cars.reduce';

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  thunk: true,
});

const rootReducer = combineReducers({
  userReducer,
  carsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware,
});
