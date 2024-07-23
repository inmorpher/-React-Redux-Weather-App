import { useParams } from 'react-router-dom';
import { fetchWeather } from '../api';
import { useUser } from '../context/User.context';
import { useAppDispatch, useAppSelector } from '../store/hooks.type';
import { selectControls, toggleTheme } from '../store/slices/userSlice';

export const useControls = () => {
	const dispatch = useAppDispatch();
	const { dispatch: dispatch2 } = useUser();
	const { city, country } = useParams();
	const { theme, units, timeLastUpdate } = useAppSelector(selectControls);

	const toggleMetricHandler = () => {
		dispatch2({ type: 'TOGGLE_METRICS' });
	};

	const toggleThemeHandler = () => {
		dispatch(toggleTheme());
	};

	const onUpdateHandler = () => {
		dispatch(fetchWeather(`${city}, ${country}`));
	};

	return {
		theme,
		units,
		timeLastUpdate,
		toggleMetricHandler,
		toggleThemeHandler,
		onUpdateHandler,
	};
};
