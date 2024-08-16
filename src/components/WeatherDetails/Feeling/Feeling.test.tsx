import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, MockedFunction, vi } from 'vitest';
import { useGetFeelsLikeInfo, useWeatherData } from '../../../context/WeatherData.context';
import { IFeelsLikeInfo } from '../../../context/WeatherData.types';
import withLoading from '../../UI/WithLoading';
import { Feeling } from './Feeling';

vi.mock('../../../context/WeatherData.context', () => ({
	useGetFeelsLikeInfo: vi.fn(),
	useWeatherData: vi.fn(() => {
		return {
			status: 'success',
			weatherData: undefined,
			error: null,
		};
	}),
}));

// vi.mock('../../../components/UI/WithLoading', () => {
// 	const withLoadingMock = vi.fn((Component, dataHook) => {
// 		return () => {
// 			const data = dataHook ? dataHook() : undefined;
// 			return <Component data={data} />;
// 		};
// 	});

// 	return {
// 		__esModule: true,
// 		default: withLoadingMock,
// 		withLoading: withLoadingMock,
// 	};
// });

// describe('Feeling', () => {
// 	const mockFeelsLikeInfo: IFeelsLikeInfo = {
// 		temperature: { value: 20, units: '°C' },
// 		feelsLike: 'colder',
// 	};

// 	beforeEach(() => {
// 		(useGetFeelsLikeInfo as MockedFunction<typeof useGetFeelsLikeInfo>).mockReturnValue(
// 			mockFeelsLikeInfo
// 		);
// 	});

// 	test('should render the component correctly with valid temperature and feelsLike data', () => {
// 		const { getByText } = render(<Feeling />);

// 		const temperatureElement = getByText('20°C');
// 		const feelsLikeElement = getByText('colder');

// 		expect(temperatureElement).toBeInTheDocument();
// 		expect(feelsLikeElement).toBeInTheDocument();
// 	});

// 	test('should display the correct temperature value in the content component', () => {
// 		const mockFeelsLikeInfo: IFeelsLikeInfo = {
// 			temperature: { value: 25, units: '°F' },
// 			feelsLike: 'warmer',
// 		};

// 		(useGetFeelsLikeInfo as MockedFunction<typeof useGetFeelsLikeInfo>).mockReturnValue(
// 			mockFeelsLikeInfo
// 		);

// 		const { getByText } = render(<Feeling />);

// 		const temperatureElement = getByText('25°F');
// 		expect(temperatureElement).toBeInTheDocument();
// 	});

// 	test('should display the correct feelslike description in the wrapper component', () => {
// 		const mockFeelsLikeInfo: IFeelsLikeInfo = {
// 			temperature: { value: 20, units: '°C' },
// 			feelsLike: 'much warmer',
// 		};

// 		(useGetFeelsLikeInfo as MockedFunction<typeof useGetFeelsLikeInfo>).mockReturnValue(
// 			mockFeelsLikeInfo
// 		);

// 		const { getByText } = render(<Feeling />);

// 		const feelsLikeElement = getByText('much warmer');
// 		expect(feelsLikeElement).toBeInTheDocument();
// 	});
// 	test('should render the icon component without errors', () => {
// 		const mockFeelsLikeInfo: IFeelsLikeInfo = {
// 			temperature: { value: 20, units: '°C' },
// 			feelsLike: 'colder',
// 		};

// 		(useGetFeelsLikeInfo as MockedFunction<typeof useGetFeelsLikeInfo>).mockReturnValue(
// 			mockFeelsLikeInfo
// 		);

// 		const { getByRole } = render(<Feeling />);

// 		const iconElement = getByRole('feeling-icon');
// 		expect(iconElement).toBeInTheDocument();
// 	});
// 	test('should handle missing temperature data gracefully', () => {
// 		const mockFeelsLikeInfo: IFeelsLikeInfo = {
// 			temperature: undefined,
// 			feelsLike: 'colder',
// 		};

// 		(useGetFeelsLikeInfo as MockedFunction<typeof useGetFeelsLikeInfo>).mockReturnValue(
// 			mockFeelsLikeInfo
// 		);

// 		const { queryByText } = render(<Feeling />);

// 		const temperatureElement = queryByText('undefined');
// 		expect(temperatureElement).not.toBeInTheDocument();

// 		const feelsLikeElement = queryByText('colder');
// 		expect(feelsLikeElement).toBeInTheDocument();
// 	});

// 	test('should handle missing feelsLike data gracefully', () => {
// 		const mockFeelsLikeInfo: IFeelsLikeInfo = {
// 			temperature: { value: 20, units: '°C' },
// 			feelsLike: undefined,
// 		};

// 		(useGetFeelsLikeInfo as MockedFunction<typeof useGetFeelsLikeInfo>).mockReturnValue(
// 			mockFeelsLikeInfo
// 		);

// 		const { queryByText } = render(<Feeling />);

// 		const feelsLikeElement = queryByText('undefined');
// 		expect(feelsLikeElement).not.toBeInTheDocument();

// 		const temperatureElement = queryByText('20°C');
// 		expect(temperatureElement).toBeInTheDocument();
// 	});

// 	test('should display a loading state when data is being fetched', () => {
// 		vi.mock('../../context/WeatherData.context', () => ({
// 			useWeatherData: () => ({ status: 'pending' }),
// 			useGetFeelsLikeInfo: vi.fn(),
// 		}));

// 		const { getByRole } = render(<Skeleton />);

// 		expect(getByRole('img', { name: /loader/i })).toBeInTheDocument();
// 	});
// });

describe('Feeling', () => {
	test('should render the component correctly with valid temperature and feelsLike data', () => {
		const mockFeelsLikeInfo: IFeelsLikeInfo = {
			temperature: { value: 20, units: '°C' },
			feelsLike: 'colder',
		};

		const { getByText } = render(<Feeling data={mockFeelsLikeInfo} />);

		const temperatureElement = getByText('20°C');
		const feelsLikeElement = getByText('colder');

		expect(temperatureElement).toBeInTheDocument();
		expect(feelsLikeElement).toBeInTheDocument();
	});

	test('should display the correct temperature value in the content component', () => {
		const mockFeelsLikeInfo: IFeelsLikeInfo = {
			temperature: { value: 25, units: '°F' },
			feelsLike: 'warmer',
		};

		const { getByText } = render(<Feeling data={mockFeelsLikeInfo} />);

		const temperatureElement = getByText('25°F');
		expect(temperatureElement).toBeInTheDocument();
	});

	test('should display the correct feelsLike description in the wrapper component', () => {
		const mockFeelsLikeInfo: IFeelsLikeInfo = {
			temperature: { value: 20, units: '°C' },
			feelsLike: 'much warmer',
		};

		const { getByText } = render(<Feeling data={mockFeelsLikeInfo} />);

		const feelsLikeElement = getByText('much warmer');
		expect(feelsLikeElement).toBeInTheDocument();
	});
	test('should render the icon component without errors', () => {
		const mockFeelsLikeInfo: IFeelsLikeInfo = {
			temperature: { value: 20, units: '°C' },
			feelsLike: 'colder',
		};

		const { getByRole } = render(<Feeling data={mockFeelsLikeInfo} />);

		expect(getByRole('img', { name: 'feeling-icon' })).toBeInTheDocument();
	});
	test('should handle missing temperature data gracefully', () => {
		const mockFeelsLikeInfo: IFeelsLikeInfo = {
			temperature: undefined,
			feelsLike: 'colder',
		};

		const { queryByText } = render(<Feeling data={mockFeelsLikeInfo} />);

		const temperatureElement = queryByText('N/A');
		expect(temperatureElement).not.toBeInTheDocument();

		const feelsLikeElement = queryByText('colder');
		expect(feelsLikeElement).toBeInTheDocument();
	});
	test('should handle missing feelsLike data gracefully', () => {
		const mockFeelsLikeInfo: IFeelsLikeInfo = {
			temperature: { value: 20, units: '°C' },
			feelsLike: undefined,
		};

		const { queryByText } = render(<Feeling data={mockFeelsLikeInfo} />);

		const feelsLikeElement = queryByText('N/A');
		expect(feelsLikeElement).toBeInTheDocument();

		const temperatureElement = queryByText('20°C');
		expect(temperatureElement).toBeInTheDocument();
	});

	test('should display missing data gracefully', () => {
		const { getByText } = render(<Feeling data={undefined} />);

		const temperatureElement = getByText('N/A');
		const feelsLikeElement = getByText('N/A');

		expect(temperatureElement).toBeInTheDocument();
		expect(feelsLikeElement).toBeInTheDocument();
	});
	test('should display a loading state when data is being fetched through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'pending',
			error: null,
			weatherData: undefined,
		});
		(useGetFeelsLikeInfo as MockedFunction<typeof useGetFeelsLikeInfo>).mockReturnValue(
			undefined as unknown as IFeelsLikeInfo
		);

		const WrappedFeeling = withLoading(Feeling, useGetFeelsLikeInfo);
		const { getByRole } = render(<WrappedFeeling />);

		expect(getByRole('img', { name: /loader/i })).toBeInTheDocument();
	});
	test('should display an error message when data fetching fails', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'error',
			error: null,
			weatherData: undefined,
		});
		(useGetFeelsLikeInfo as MockedFunction<typeof useGetFeelsLikeInfo>).mockReturnValue(
			undefined as unknown as IFeelsLikeInfo
		);

		const WrappedFeeling = withLoading(Feeling, useGetFeelsLikeInfo);
		const { getByRole } = render(<WrappedFeeling />);

		expect(getByRole('img', { name: /error-placeholder/i })).toBeInTheDocument();
	});
	test('should display a default error message when data status success but no data provided', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'success',
			error: null,
			weatherData: undefined,
		});
		(useGetFeelsLikeInfo as MockedFunction<typeof useGetFeelsLikeInfo>).mockReturnValue(
			undefined as unknown as IFeelsLikeInfo
		);

		const WrappedFeeling = withLoading(Feeling, useGetFeelsLikeInfo);
		const { getByRole } = render(<WrappedFeeling />);

		expect(getByRole('img', { name: /error-placeholder/i })).toBeInTheDocument();
	});

	test('should render component with data provided through withLoading', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'success',
			error: null,
			weatherData: undefined,
		});
		(useGetFeelsLikeInfo as MockedFunction<typeof useGetFeelsLikeInfo>).mockReturnValue({
			temperature: { value: 25, units: '°F' },
			feelsLike: 'much warmer',
		} as IFeelsLikeInfo);

		const WrappedFeeling = withLoading(Feeling, useGetFeelsLikeInfo);
		const { getByText } = render(<WrappedFeeling />);

		const temperatureElement = getByText('25°F');
		const feelsLikeElement = getByText('much warmer');

		expect(temperatureElement).toBeInTheDocument();
		expect(feelsLikeElement).toBeInTheDocument();
	});
});
