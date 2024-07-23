import React from 'react';
import { useWeatherData } from '../../context/WeatherData.context';
import Skeleton from '../UI/SkeletonLoader/Skeleton';

/**
 * A higher-order component that adds loading and error handling to a wrapped component.
 * It uses the weather data context to determine the current status and render appropriate UI.
 *
 * @template P - The props type of the wrapped component
 * @param {React.ComponentType<P>} WrappedComponent - The component to be wrapped
 * @returns {React.FC<P>} A new functional component that includes loading and error handling
 */
export const withLoading = <P extends object, T = never>(
	WrappedComponent: React.ComponentType<P & (T extends never ? {} : { data: T })>,
	useDataHook?: () => T | undefined
): React.FC<P> => {
	const WithLoading: React.FC<P> = (props) => {
		const { status } = useWeatherData();
		const data = useDataHook && useDataHook();

		if (status === 'pending') return <Skeleton />;
		if (status === 'error') return null;
		if (useDataHook && !data) return null;
		const safeData = data as NonNullable<T>;
		return React.createElement(WrappedComponent, {
			...props,
			...(useDataHook ? { data: safeData as T } : {}),
		} as P & (T extends never ? {} : { data: T }));
	};

	return WithLoading;
};

export default withLoading;
