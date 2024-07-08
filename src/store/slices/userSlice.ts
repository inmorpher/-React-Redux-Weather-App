import { PayloadAction, createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { TimeService } from '../../utils/services/time/time.service';
import { RootState } from '../store';
import { LoadingStatus } from './weatherSlice';

export interface ICityList {
	city: string;
	country: string;
	state: string;
	lat: string;
	lon: string;
}
export interface IWeatherList {
	showDelete: boolean;
	list: ICityList[];
}

export type UserTheme = 'light' | 'dark';

export type UserUnits = 'metric' | 'imperial';

export interface IUserData {
	userTheme: UserTheme;
	userCityList: IWeatherList;
	userMetrics: UserUnits;
}

export interface IUserState {
	loading: LoadingStatus;
	data: IUserData;
	error: string;
	query: string;
}

const initialState: IUserState = {
	loading: false,
	data: {
		userTheme: 'light',
		userCityList: {
			showDelete: false,
			list: [],
		},
		userMetrics: 'imperial',
	} as IUserData,
	error: '',
	query: '',
};
/**
 * Returns the user's theme preference.
 * @returns The user's theme preference.
 */
const themeDefine = (): UserTheme => {
	const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
	let userTheme: UserTheme;
	if (isDarkTheme) {
		userTheme = 'dark';
		document.body.setAttribute('data-theme', userTheme);
		return userTheme;
	} else {
		userTheme = 'light';
		document.body.setAttribute('data-theme', userTheme);
		return userTheme;
	}
};
/**
 * Fetches the user's data from local storage, or creates a new default user data object if no data is found.
 * @returns The user's data, including their theme, units, and city list.
 */
export const fetchUserList = createAsyncThunk('/user', async () => {
	try {
		const response = localStorage.getItem('userData');
		if (response) {
			let res = JSON.parse(response);
			document.body.setAttribute('data-theme', res.userTheme);
			res = { ...res, userCityList: { ...res.userCityList, showDelete: false } };
			localStorage.setItem('userData', JSON.stringify(res));
			return res;
		}
		const localState: IUserData = {
			userTheme: themeDefine(),
			userMetrics: 'metric',
			userCityList: { showDelete: false, list: [] } as IWeatherList,
		};
		localStorage.setItem('userData', JSON.stringify(localState));
	} catch (e) {
		console.log('12312x');
	}
});

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		/**
		 * Toggles the user's theme between light and dark modes.
		 * @param state the current user state
		 */
		toggleTheme: (state) => {
			if (state.data.userTheme === 'dark') {
				document.body.setAttribute('data-theme', 'light');
				state.data.userTheme = 'light';
			} else {
				document.body.setAttribute('data-theme', 'dark');
				state.data.userTheme = 'dark';
			}
			localStorage.setItem('userData', JSON.stringify(state.data));
		},
		/**
		 * Toggles the visibility of the delete button in the city list.
		 * @param state the current user state
		 */
		toggleDelete: (state) => {
			state.data.userCityList.showDelete = !state.data.userCityList.showDelete;
			localStorage.setItem('userData', JSON.stringify(state.data));
		},
		/**
		 * Toggles between metric and imperial units.
		 * @param state the current user state
		 */
		toggleMetrics: (state) => {
			if (state.data.userMetrics === 'metric') {
				state.data.userMetrics = 'imperial';
			} else {
				state.data.userMetrics = 'metric';
			}
			localStorage.setItem('userData', JSON.stringify(state.data));
		},
		/**
		 * Deletes a city from the user's list.
		 * @param state the current user state
		 * @param action the action payload, containing the city and country information
		 */
		deleteCity: (state, action) => {
			const cityList = state.data.userCityList.list.filter((location) => {
				return (
					action.payload.city !== location.city ||
					action.payload.country !== location.country
				);
			});

			state.data.userCityList.list = cityList;
			localStorage.setItem('userData', JSON.stringify(state.data));
		},
		/**
		 * Adds a city to the user's list.
		 * @param state the current user state
		 * @param action the action payload, containing the city and country information
		 */
		addCity: (state, action) => {
			const city: ICityList = action.payload;
			const isExist = state.data.userCityList?.list.find(
				(location) => location.lat === city.lat && location.lon === city.lon,
			);
			if (isExist === undefined) {
				state.data.userCityList.list.push(city);
				localStorage.setItem('userData', JSON.stringify(state.data));
			}
		},
		setQuery: (state, action) => {
			const query = action.payload;
			state.query = query;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserList.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(fetchUserList.rejected, (state) => {
			state.error = 'error';
			state.loading = false;
		});
		builder.addCase(fetchUserList.fulfilled, (state, action: PayloadAction<IUserData>) => {
			state.data = action.payload;
			state.error = '';
			state.loading = false;
		});
	},
});
/**
 * Selects the user's city list from the store state.
 * @param state the current store state
 * @returns the user's city list
 */
export const selectUserCityList = createSelector(
	(state: RootState) => state.user.data.userCityList,
	(userCityList) => {
		return userCityList;
	},
);
/**
 * Returns the user's theme and units preferences.
 * @param state the current store state
 * @returns an object containing the user's theme and units preferences
 */
export const selectControls = createSelector(
	(state: RootState) => state.user.data.userTheme,
	(state: RootState) => state.user.data.userMetrics,
	(userTheme, userMetric) => {
		return {
			theme: userTheme,
			units: userMetric,
			timeLastUpdate: new TimeService().getTime('hoursAndMinutes').result(),
		};
	},
);

export const selectUserMetrics = createSelector(
	(state: RootState) => state.user.data.userMetrics,
	(userMetric) => userMetric,
);

export const { toggleTheme, toggleMetrics, deleteCity, addCity, toggleDelete, setQuery } =
	userSlice.actions;
export default userSlice.reducer;
