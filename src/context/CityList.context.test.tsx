import '@testing-library/jest-dom';
import { act, render, renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { CityListProvider, ICityList, ICityListData, useCityList } from './CityList.context';

describe('CityListContext', () => {
	afterEach(() => {
		localStorage.clear();
	});
	test('should initialize with an empty city list if no saved city list is found in localStorage', () => {
		localStorage.removeItem('cityList'); // Ensure localStorage is clear
		const { result } = renderHook(() => useCityList(), { wrapper: CityListProvider });
		expect(result.current.list).toEqual([]);
	});

	test('should correctly load a saved city list from localStorage if the version matches', () => {
		const mockCityList: ICityListData = {
			version: 1,
			list: [
				{
					city: 'New York',
					country: 'United States',
					state: 'New York',
					lat: 40.7128,
					lon: -74.0059,
				},
				{
					city: 'Los Angeles',
					country: 'United States',
					state: 'California',
					lat: 34.0522,
					lon: -118.2437,
				},
			],
		};

		localStorage.setItem('cityList', JSON.stringify(mockCityList));

		const { result } = renderHook(() => useCityList(), { wrapper: CityListProvider });

		expect(result.current.list).toEqual(mockCityList.list);
	});

	test('should add a new city to the list if it does not already exist', () => {
		const { result } = renderHook(() => useCityList(), {
			wrapper: CityListProvider,
		});

		const initialCityList = result.current.list;

		const newCity: ICityList = {
			city: 'New City',
			country: 'New Country',
			state: 'New State',
			lat: 12.3456,
			lon: 78.9012,
		};

		act(() => {
			result.current.addCity(newCity);
		});

		const updatedCityList = result.current.list;

		expect(updatedCityList.length).toBe(initialCityList.length + 1);
		expect(updatedCityList).toContainEqual(newCity);
	});

	test('should not add a duplicate city to the list', () => {
		const { result } = renderHook(() => useCityList(), {
			wrapper: CityListProvider,
		});

		const cityToAdd: ICityList = {
			city: 'New York',
			country: 'United States',
			state: 'New York',
			lat: 40.7128,
			lon: -74.0059,
		};

		act(() => {
			result.current.addCity(cityToAdd);
		});

		const initialCityList = result.current.list;

		act(() => {
			result.current.addCity(cityToAdd);
		});

		const updatedCityList = result.current.list;

		expect(updatedCityList.length).toBe(initialCityList.length);
		expect(updatedCityList).toContainEqual(cityToAdd);
	});

	test('should delete a city from the list', () => {
		const { result } = renderHook(() => useCityList(), {
			wrapper: CityListProvider,
		});

		const initialCityList = result.current.list;

		const cityToDelete: ICityList = {
			city: 'New York',
			country: 'United States',
			state: 'New York',
			lat: 40.7128,
			lon: -74.0059,
		};

		act(() => {
			result.current.addCity(cityToDelete);
		});

		const cityListWithCity = result.current.list;
		expect(cityListWithCity.length).toBe(initialCityList.length + 1);
		expect(cityListWithCity).toContainEqual(cityToDelete);

		act(() => {
			result.current.deleteCity(cityToDelete);
		});

		const updatedCityList = result.current.list;
		expect(updatedCityList.length).toBe(initialCityList.length);
		expect(updatedCityList).not.toContainEqual(cityToDelete);
	});

	test('should toggle the visibility of the delete button', () => {
		const { result } = renderHook(() => useCityList(), {
			wrapper: CityListProvider,
		});

		act(() => {
			result.current.toggleDeleteBtn();
		});

		expect(result.current.showDeleteBtn).toBe(true);

		act(() => {
			result.current.toggleDeleteBtn();
		});

		expect(result.current.showDeleteBtn).toBe(false);
	});

	test('should update localStorage when the city list is modified', () => {
		const { result } = renderHook(() => useCityList(), {
			wrapper: CityListProvider,
		});

		const initialCityList = result.current.list;
		const initialLocalStorage = localStorage.getItem('cityList');

		act(() => {
			result.current.addCity({
				city: 'New City',
				country: 'New Country',
				state: 'New State',
				lat: 12.3456,
				lon: 78.9012,
			});
		});

		const updatedCityList = result.current.list;
		const updatedLocalStorage = localStorage.getItem('cityList');

		expect(updatedCityList.length).toBe(initialCityList.length + 1);
		expect(updatedLocalStorage).not.toBe(initialLocalStorage);

		const parsedLocalStorage = JSON.parse(updatedLocalStorage!);
		expect(parsedLocalStorage.list).toEqual(updatedCityList);
	});

	test('should throw an error when useCityList is called outside of the CityListProvider', () => {
		const errorMessage = 'useCityList must be used within a CityListProvider';

		const TestComponent = () => {
			useCityList();
			return null;
		};

		const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

		expect(() => render(<TestComponent />)).toThrow(errorMessage);

		consoleErrorSpy.mockRestore();
	});

	test('should handle edge cases for city data, such as empty strings or invalid formats', () => {
		const { result } = renderHook(() => useCityList(), {
			wrapper: CityListProvider,
		});

		const invalidCities = [
			{
				city: '',
				country: 'United States',
				state: 'New York',
				lat: 40.7128,
				lon: -74.0059,
			},
			{
				city: 'New York',
				country: '',
				state: 'New York',
				lat: 40.7128,
				lon: -74.0059,
			},
			{
				city: 'New York',
				country: 'United States',
				state: '',
				lat: 40.7128,
				lon: -74.0059,
			},
			{
				city: 'New York',
				country: 'United States',
				state: 'New York',
				lat: '',
				lon: -74.0059,
			},
			{
				city: 'New York',
				country: 'United States',
				state: 'New York',
				lat: 40.7128,
				lon: '',
			},
		];

		const initialCityList = result.current.list;

		invalidCities.forEach((invalidCity) => {
			act(() => {
				result.current.addCity(invalidCity);
			});

			const updatedCityList = result.current.list;
			expect(updatedCityList.length).toBe(initialCityList.length);
			expect(updatedCityList).not.toContainEqual(invalidCity);
		});
	});

	test('should handle large city lists with thousands of entries', () => {
		const { result } = renderHook(() => useCityList(), {
			wrapper: CityListProvider,
		});

		const largeCityList: ICityList[] = Array.from({ length: 10000 }, (_, index) => ({
			city: `City ${index + 1}`,
			country: `Country ${index + 1}`,
			state: `State ${index + 1}`,
			lat: (index + 1) * 10,
			lon: (index + 1) * 20,
		}));

		act(() => {
			largeCityList.forEach((city) => {
				result.current.addCity(city);
			});
		});

		const updatedCityList = result.current.list;

		expect(updatedCityList.length).toBe(10000);
		expect(updatedCityList).toEqual(largeCityList);

		const uniqueCities = new Set(
			updatedCityList.map(
				(city) => `${city.city}-${city.country}-${city.state}-${city.lat}-${city.lon}`
			)
		);
		expect(uniqueCities.size).toBe(10000); // Ensure no duplicates
	});
});
