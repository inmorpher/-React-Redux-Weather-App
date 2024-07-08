import { useParams } from 'react-router-dom';
import { fetchWeather } from '../api';
import { useAppDispatch, useAppSelector } from '../store/hooks.type';
import { selectControls, toggleMetrics, toggleTheme } from '../store/slices/userSlice';

export const useControls = () => {
	const dispatch = useAppDispatch();
	const { city, country } = useParams();
	const { theme, units, timeLastUpdate } = useAppSelector(selectControls);

	const toggleMetricHandler = () => {
		dispatch(toggleMetrics());
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
