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
		if (status === 'error')
			return (
				<svg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
					<circle cx='50' cy='50' r='40' fill='#b0bec5' stroke='#90a4ae' strokeWidth='3' />
					<circle cx='35' cy='40' r='5' fill='#000' />
					<circle cx='65' cy='40' r='5' fill='#000' />
					<path d='M 30 60 Q 50 70, 70 60' stroke='#000' strokeWidth='2' fill='none' />

					<line x1='20' y1='30' x2='80' y2='70' stroke='#ff5722' strokeWidth='3' />
				</svg>
			);
		if (useDataHook && data === undefined) return null;
		const safeData = data as NonNullable<T>;

		return React.createElement(WrappedComponent, {
			...props,
			...(useDataHook ? { data: safeData as T } : {}),
		} as P & (T extends never ? {} : { data: T }));
	};

	return WithLoading;
};

export default withLoading;
