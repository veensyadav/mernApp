import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { reducer as toastrReducer } from 'react-redux-toastr';
import authReducer from './modules/auth';
import dashboardReducer from './modules/table';

export const store = configureStore({
  reducer: {
    toastr: toastrReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
