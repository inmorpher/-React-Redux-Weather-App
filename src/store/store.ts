import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/dist/query/react';
import querySlice from './slices/querySlice';
import userReducer from './slices/userSlice';
import { weatherApiSlice } from './slices/weatherApiSlice';
import weatherReducer from './slices/weatherSlice';
export const RootReducer = combineReducers({
	weather: weatherReducer,
	user: userReducer,
	weatherApi: weatherApiSlice.reducer,
	userQuery: querySlice,
	weatherQuery: weatherApiSlice.reducer,
});

export const setupStore = () => {
	return configureStore({
		reducer: RootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weatherApiSlice.middleware),
	});
};

export const store = setupStore();
setupListeners(store.dispatch);
export type RootState = ReturnType<typeof RootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
