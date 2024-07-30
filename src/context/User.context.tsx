import { createContext, useContext, useEffect, useReducer } from 'react';
import { TimeService } from '../utils/services/time/time.service';

export interface ICityList {
	city: string;
	country: string;
	state: string;
	lat: string | number;
	lon: string | number;
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
	data: IUserData;
	error: string;
	query: string;
}

type UserAction =
	| { type: 'TOGGLE_THEME' }
	| { type: 'TOGGLE_DELETE' }
	| { type: 'TOGGLE_METRICS' }
	| { type: 'DELETE_CITY'; payload: { city: string; country: string } }
	| { type: 'ADD_CITY'; payload: ICityList }
	| { type: 'SET_USER_DATA'; payload: IUserData }
	| { type: 'SET_QUERY'; payload: string };

const userReducer = (state: IUserData, action: UserAction): IUserData => {
	switch (action.type) {
		case 'TOGGLE_THEME':
			const newTheme = state.userTheme === 'dark' ? 'light' : 'dark';
			const updatedThemeState = {
				...state,
				userTheme: newTheme,
			};
			document.body.setAttribute('data-theme', newTheme);
			localStorage.setItem('userData', JSON.stringify(updatedThemeState));
			return { ...updatedThemeState } as IUserData;
		case 'TOGGLE_DELETE':
			return {
				...state,
				userCityList: {
					...state.userCityList,
					showDelete: !state.userCityList.showDelete,
				},
			};
		case 'TOGGLE_METRICS':
			const newMetrics = state.userMetrics === 'metric' ? 'imperial' : 'metric';
			const updatedMetricsState = {
				...state,
				userMetrics: newMetrics,
			};

			const currentUserData = JSON.parse(localStorage.getItem('userData') || '{}');

			const updatedUserData = {
				...currentUserData,
				userMetrics: newMetrics,
			};

			// Сохраняем обновленные данные в localStorage
			localStorage.setItem('userData', JSON.stringify(updatedUserData));
			return { ...updatedMetricsState } as IUserData;
		case 'DELETE_CITY':
			console.log('currect city list', state.userCityList.list);
			return {
				...state,
				userCityList: {
					...state.userCityList,
					list: state.userCityList.list.filter(
						(location) =>
							action.payload.city !== location.city || action.payload.country !== location.country
					),
				},
			};
		case 'ADD_CITY':
			const newCity = action.payload;
			const uptatedCityList = {
				...state,
				userCityList: {
					...state.userCityList,
					list: [...state.userCityList.list, newCity],
				},
			};
			return { ...uptatedCityList } as IUserData;
		// return {
		// 	...state,
		// 	userCityList: {
		// 		...state.userCityList,
		// 		list: [...state.userCityList.list, action.payload],
		// 	},
		// };
		case 'SET_USER_DATA':
			return action.payload;
		default:
			return state;
	}
};

const UserContext = createContext<
	| {
			state: IUserData;
			dispatch: React.Dispatch<UserAction>;
	  }
	| undefined
>(undefined);

const themeDefine = (value?: string): UserTheme => {
	console.log('User theme detected:', value);
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

const initialState: IUserData = {
	userTheme: themeDefine(),
	userCityList: {
		showDelete: false,
		list: [],
	},
	userMetrics: 'metric',
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(userReducer, {
		...initialState,
	});

	useEffect(() => {
		const loadUserData = () => {
			try {
				const userData = localStorage.getItem('userData');
				console.log('useEffect');
				if (userData) {
					let user = JSON.parse(userData);

					user = { ...user, userCityList: { ...user.userCityList, showDelete: false } };
					localStorage.setItem('userData', JSON.stringify(user));
					document.body.setAttribute('data-theme', user.userTheme);
					dispatch({ type: 'SET_USER_DATA', payload: user });
					return user;
				}
				console.log('No user data found, initializing with default values');
				localStorage.setItem('userData', JSON.stringify(initialState));

				dispatch({ type: 'SET_USER_DATA', payload: initialState });
			} catch (error) {
				console.error('Failed to load user data', error);
			}
		};
		loadUserData();
	}, []);

	return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};

export const useUserCityList = () => {
	const { state } = useUser();
	return state.userCityList;
};

export const useUserControls = () => {
	const { state } = useUser();
	return {
		theme: state.userTheme,
		units: state.userMetrics,
		timeLastUpdate: new TimeService().getTime('hoursAndMinutes').result(),
	};
};

export const useUserMetrics = () => {
	const { state } = useUser();
	return state.userMetrics;
};
