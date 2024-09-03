import '@testing-library/jest-dom';
import { MockedFunction, vi } from 'vitest';
import { useCityList } from '../context/CityList.context';
import { useGetCityName } from '../context/WeatherData.context';
import { useCityName } from './useCityName';

vi.mock('../context/WeatherData.context');
vi.mock('../context/CityList.context', () => ({
	useCityList: vi.fn().mockReturnValue({
		addCity: vi.fn(),
	}),
}));

describe('useCityName', () => {
	test('should format the city name correctly when state and country are present', () => {
		(useGetCityName as MockedFunction<typeof useGetCityName>).mockReturnValue({
			cityName: 'New York',
			stateName: 'New York',
			countryName: 'United States',
			latitude: 40.7128,
			longitude: -74.0059,
			localTime: '2023-05-31T12:34:56Z',
		});

		const { formattedCityName } = useCityName();

		expect(formattedCityName).toBe('New York, New York, United States');
	});

	test('should format the city name correctly when only city and country are present', () => {
		(useGetCityName as MockedFunction<typeof useGetCityName>).mockReturnValue({
			cityName: 'Tokyo',
			stateName: '',
			countryName: 'Japan',
			latitude: 35.6895,
			longitude: 139.6917,
			localTime: '2023-05-31T19:00:00Z',
		});

		const { formattedCityName } = useCityName();

		expect(formattedCityName).toBe('Tokyo, Japan');
	});

	test('should return an empty string for formattedCityName when cityInfo is undefined or null', () => {
		(useGetCityName as MockedFunction<typeof useGetCityName>).mockReturnValue(undefined);

		const { formattedCityName } = useCityName();

		expect(formattedCityName).toBe('');

		(useGetCityName as MockedFunction<typeof useGetCityName>).mockReturnValue(
			null as unknown as ReturnType<typeof useGetCityName>
		);

		const { formattedCityName: formattedCityNameNull } = useCityName();

		expect(formattedCityNameNull).toBe('');
	});

	test('should return an empty string for localTime when cityInfo is undefined or null', () => {
		(useGetCityName as MockedFunction<typeof useGetCityName>).mockReturnValue(undefined);

		const { localTime } = useCityName();

		expect(localTime).toBe('');

		(useGetCityName as MockedFunction<typeof useGetCityName>).mockReturnValue(
			null as unknown as ReturnType<typeof useGetCityName>
		);

		const { localTime: localTimeNull } = useCityName();

		expect(localTimeNull).toBe('');
	});

	test('should call the addCity function with the correct city data when handleAddCity is invoked', () => {
		const mockCityInfo = {
			cityName: 'New York',
			stateName: 'New York',
			countryName: 'United States',
			latitude: 40.7128,
			longitude: -74.0059,
			localTime: '2023-05-31T12:34:56Z',
		};

		(useGetCityName as MockedFunction<typeof useGetCityName>).mockReturnValue(mockCityInfo);

		const addCityMock = vi.fn();
		(useCityList as MockedFunction<typeof useCityList>).mockReturnValue({
			addCity: addCityMock,
		} as unknown as ReturnType<typeof useCityList>);

		const { handleAddCity } = useCityName();

		const mockEvent = {
			preventDefault: vi.fn(),
		} as unknown as React.MouseEvent<HTMLButtonElement, MouseEvent>;

		handleAddCity(mockEvent);

		expect(mockEvent.preventDefault).toHaveBeenCalled();
		expect(addCityMock).toHaveBeenCalledWith({
			city: 'New York',
			state: 'New York',
			country: 'United States',
			lat: 40.7128,
			lon: -74.0059,
		});
	});
});
