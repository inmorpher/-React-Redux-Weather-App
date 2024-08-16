import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { useWeatherData } from '../../context/WeatherData.context';
import { useCityName } from '../../hooks/useCityName';
import withLoading from '../UI/WithLoading';
import { CityName } from './CityName';

vi.mock('../../hooks/useCityName');
vi.mock('../../context/WeatherData.context');

describe('CityName', () => {
	test('should render the CityName component correctly when formattedCityName and localTime are provided', () => {
		const mockFormattedCityName = 'New York, NY, USA';
		const mockLocalTime = '10:30 AM';
		const mockHandleAddCity = vi.fn();

		(useCityName as MockedFunction<typeof useCityName>).mockReturnValue({
			formattedCityName: mockFormattedCityName,
			localTime: mockLocalTime,
			handleAddCity: mockHandleAddCity,
		});

		const { getByText, getByRole } = render(<CityName />);

		const cityNameElement = getByText(mockFormattedCityName);
		const localTimeElement = getByText(mockLocalTime);
		const addCityButton = getByRole('button', { name: 'Add city to your list' });

		expect(cityNameElement).toBeInTheDocument();
		expect(localTimeElement).toBeInTheDocument();
		expect(addCityButton).toBeInTheDocument();

		fireEvent.click(addCityButton);
		expect(mockHandleAddCity).toHaveBeenCalledTimes(1);
	});

	test('should render "N/A" when formattedCityName and localTime are not provided', () => {
		(useCityName as MockedFunction<typeof useCityName>).mockReturnValue({
			formattedCityName: undefined,
			localTime: undefined,
			handleAddCity: vi.fn(),
		} as unknown as ReturnType<typeof useCityName>);

		const { getByLabelText } = render(<CityName />);

		const cityNameElement = getByLabelText(/city name/i);
		const localTimeElement = getByLabelText(/local time/i);

		expect(cityNameElement).toBeInTheDocument();
		expect(localTimeElement).toBeInTheDocument();
	});

	test('should call the handleAddCity function when the add button is clicked', () => {
		const mockHandleAddCity = vi.fn();
		(useCityName as MockedFunction<typeof useCityName>).mockReturnValue({
			formattedCityName: 'New York, NY, USA',
			localTime: '10:30 AM',
			handleAddCity: mockHandleAddCity,
		});

		const { getByRole } = render(<CityName />);
		const addCityButton = getByRole('button', { name: 'Add city to your list' });

		fireEvent.click(addCityButton);

		expect(mockHandleAddCity).toHaveBeenCalledTimes(1);
	});

	test('should not render the add button if handleAddCity is not provided', () => {
		(useCityName as MockedFunction<typeof useCityName>).mockReturnValue({
			formattedCityName: 'New York, NY, USA',
			localTime: '10:30 AM',
			handleAddCity: undefined,
		} as unknown as ReturnType<typeof useCityName>);

		const { queryByRole } = render(<CityName />);
		const addCityButton = queryByRole('button', { name: 'Add city to your list' });

		expect(addCityButton).not.toBeInTheDocument();
	});

	test('should render the CityNameWithLoading component with the correct loading state', () => {
		(useCityName as MockedFunction<typeof useCityName>).mockReturnValue({
			formattedCityName: undefined,
			localTime: undefined,
			handleAddCity: undefined,
		} as unknown as ReturnType<typeof useCityName>);

		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'pending',
			weatherData: undefined,
			error: null,
		});
		const WrappedCityName = withLoading(CityName, useCityName);

		const { getByRole } = render(<WrappedCityName />);

		expect(getByRole('img', { name: /loader/i })).toBeInTheDocument();
	});

	test('should handle long city names by truncating and showing an ellipsis', () => {
		const mockFormattedCityName = 'This is a very long city name that should be truncated';
		const mockLocalTime = '10:30 AM';

		(useCityName as MockedFunction<typeof useCityName>).mockReturnValue({
			formattedCityName: mockFormattedCityName,
			localTime: mockLocalTime,
			handleAddCity: vi.fn(),
		});

		const { getByText } = render(<CityName />);

		const cityNameElement = getByText(/^This is a very long city name.../);
		expect(cityNameElement).toBeInTheDocument();
		expect(cityNameElement.classList).toContain('text-ellipsis');
	});

	test('should handle empty strings for formattedCityName and localTime', () => {
		(useCityName as MockedFunction<typeof useCityName>).mockReturnValue({
			formattedCityName: '',
			localTime: '',
			handleAddCity: vi.fn(),
		});

		const { getByLabelText } = render(<CityName />);

		const cityNameElement = getByLabelText('city name');
		const localTimeElement = getByLabelText('local time');

		expect(cityNameElement).toBeInTheDocument();
		expect(cityNameElement).toHaveTextContent('N/A');
		expect(localTimeElement).toBeInTheDocument();
		expect(localTimeElement).toHaveTextContent('N/A');
	});

	test('should render the correct font size and weight for city name and time', () => {
		const mockFormattedCityName = 'New York, NY, USA';
		const mockLocalTime = '10:30 AM';
		(useCityName as MockedFunction<typeof useCityName>).mockReturnValue({
			formattedCityName: mockFormattedCityName,
			localTime: mockLocalTime,
			handleAddCity: vi.fn(),
		});

		const { getByText } = render(<CityName />);

		const cityNameElement = getByText(mockFormattedCityName);
		const localTimeElement = getByText(mockLocalTime);

		expect(cityNameElement).toHaveClass('text-sm font-medium leading-3 sm:text-xl');
		expect(localTimeElement).toHaveClass('text-[0.6rem] font-light underline');
	});

	test('should render the add button with the correct size and variant', () => {
		const { getByRole } = render(<CityName />);

		const addButton = getByRole('button', { name: 'Add city to your list' });

		expect(addButton).toBeInTheDocument();
		expect(addButton).toHaveClass('w-10');
		expect(addButton).toHaveClass('h-10');
	});

	test('should have the correct accessibility labels for the add button', () => {
		const { formattedCityName, localTime, handleAddCity } = {
			formattedCityName: 'New York, NY, USA',
			localTime: '10:30 AM',
			handleAddCity: vi.fn(),
		};

		(useCityName as MockedFunction<typeof useCityName>).mockReturnValue({
			formattedCityName,
			localTime,
			handleAddCity,
		});

		const { getByRole } = render(<CityName />);
		const addButton = getByRole('button', { name: 'Add city to your list' });

		expect(addButton).toBeInTheDocument();
	});

	test('should render an error message when fetch fails', () => {
		(useWeatherData as MockedFunction<typeof useWeatherData>).mockReturnValue({
			status: 'error',
			weatherData: undefined,
			error: null,
		});

		const WrappedCityName = withLoading(CityName, useCityName);

		const { getByRole } = render(<WrappedCityName />);

		const errorPlaceholder = getByRole('img', { name: /error-placeholder/i });
		expect(errorPlaceholder).toBeInTheDocument();
	});
});
