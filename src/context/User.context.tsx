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

// const initialState: IUserState = {
// 	data: {
// 		userTheme: 'light',
// 		userCityList: {
// 			showDelete: false,
// 			list: [],
// 		},
// 		userMetrics: 'imperial',
// 	} as IUserData,
// 	error: '',
// 	query: '',
// };

interface UserContextProviderProps {
	children: React.ReactNode;
	initialData: IUserState;
}

const initialState: IUserData = {
	userTheme: 'light',
	userCityList: {
		showDelete: false,
		list: [],
	},
	userMetrics: 'imperial',
};

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
			return {
				...state,
				userTheme: state.userTheme === 'dark' ? 'light' : 'dark',
			};
		case 'TOGGLE_DELETE':
			return {
				...state,
				userCityList: {
					...state.userCityList,
					showDelete: !state.userCityList.showDelete,
				},
			};
		case 'TOGGLE_METRICS':
			return {
				...state,
				userMetrics: state.userMetrics === 'metric' ? 'imperial' : 'metric',
			};
		case 'DELETE_CITY':
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
			return {
				...state,
				userCityList: {
					...state.userCityList,
					list: [...state.userCityList.list, action.payload],
				},
			};
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

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [state, dispatch] = useReducer(userReducer, { ...initialState, userTheme: themeDefine() });

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const userData = localStorage.getItem('userData');

				if (userData) {
					let user = JSON.parse(userData);
					document.body.setAttribute('data-theme', user.userTheme);
					user = { ...user, userCityList: { ...user.userCityList, showDelete: false } };
					localStorage.setItem('userData', JSON.stringify(user));
					return user;
				}

				const localState: IUserData = {
					userTheme: themeDefine(),
					userMetrics: 'metric',
					userCityList: { showDelete: false, list: [] } as IWeatherList,
				};
				localStorage.setItem('userData', JSON.stringify(localState));
				console.log(userData, 'Local state:', localState);

				dispatch({ type: 'SET_USER_DATA', payload: localState });
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
	console.log('called useUserMetrics');

	return state.userMetrics;
};
