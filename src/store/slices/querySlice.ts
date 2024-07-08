import { createSlice } from '@reduxjs/toolkit';

const querySlice = createSlice({
	name: 'userQuery',
	initialState: {
		query: '',
	},
	reducers: {
		setQuery: (state, action) => {
			state.query = action.payload;
		},
	},
});

export const { setQuery } = querySlice.actions;

export default querySlice.reducer;
