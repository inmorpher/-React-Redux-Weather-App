import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useGetVisibilityInfo, useWeatherData } from '../../../context/WeatherData.context';
import { IVisibilityReturn } from '../../../utils/services/definitions/visibility.definition';
import withLoading from '../../UI/WithLoading';
import { Visibility } from './Visibility';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetVisibilityInfo: vi.fn(),
	useWeatherData: vi.fn(() => {
		return {
			status: 'success',
			weatherData: undefined,
			error: null,
		};
	}),
}));

describe('Visibility', () => {
	test('should render the visibility component with valid distance and range', () => {
		const mockVisibilityData: IVisibilityReturn = {
			distance: '10km',
			range: 'Good visibility',
		};

		const { getByText, getByRole } = render(<Visibility data={mockVisibilityData} />);

		const distanceElement = getByText('10km');
		const rangeElement = getByText('Good visibility');
		const iconElement = getByRole('img', { name: /visibility-icon/i });

		expect(distanceElement).toBeInTheDocument();
		expect(rangeElement).toBeInTheDocument();
		expect(iconElement).toBeInTheDocument();
	});

	test('should render the visibility component with empty distance and range', () => {
		const mockVisibilityData: IVisibilityReturn = {
			distance: '',
			range: '',
		};

		const { queryByText } = render(<Visibility data={mockVisibilityData} />);

		const distanceElement = queryByText('0');
		const rangeElement = queryByText('N/A');
		expect(distanceElement).toBeInTheDocument();
		expect(rangeElement).toBeInTheDocument();
	});

	test('should render the visibility component with valid data through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'success',
			weatherData: undefined,
			error: null,
		});

		(useGetVisibilityInfo as MockedFunction<typeof useGetVisibilityInfo>).mockReturnValue({
			distance: '10km',
			range: 'Good visibility',
		});

		const WrappedVisibility = withLoading<{}, IVisibilityReturn>(Visibility, useGetVisibilityInfo);

		const { getByText, getByRole } = render(<WrappedVisibility />);

		const distanceElement = getByText('10km');
		const rangeElement = getByText('Good visibility');
		const iconElement = getByRole('img', { name: /visibility-icon/i });

		expect(distanceElement).toBeInTheDocument();
		expect(rangeElement).toBeInTheDocument();
		expect(iconElement).toBeInTheDocument();
	});

	test('should render the visibility component with error data through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'error',
			weatherData: undefined,
			error: null,
		});

		(useGetVisibilityInfo as MockedFunction<typeof useGetVisibilityInfo>).mockReturnValue({
			distance: '',
			range: '',
		});

		const WrappedVisibility = withLoading<{}, IVisibilityReturn>(Visibility, useGetVisibilityInfo);

		const { getByRole } = render(<WrappedVisibility />);

		const errorElement = getByRole('img', { name: /error-placeholder/i });
		expect(errorElement).toBeInTheDocument();
	});

	test('should render loading state through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'pending',
			weatherData: undefined,
			error: null,
		});

		(useGetVisibilityInfo as MockedFunction<typeof useGetVisibilityInfo>).mockReturnValue({
			distance: '',
			range: '',
		});

		const WrappedVisibility = withLoading<{}, IVisibilityReturn>(Visibility, useGetVisibilityInfo);

		const { getByRole } = render(<WrappedVisibility />);

		const loadingElement = getByRole('img', { name: /loader/i });
		expect(loadingElement).toBeInTheDocument();
	});
});
