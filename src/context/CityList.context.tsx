import { createContext, useContext, useEffect, useState } from 'react';
import { z } from 'zod';
export interface ICityList {
	city: string;
	country: string;
	state?: string;
	lat: string | number;
	lon: string | number;
}

export interface ICityListData {
	version: number;
	list: ICityList[];
}

interface CityListContextType extends ICityListData {
	showDeleteBtn: boolean;
	addCity: (city: ICityList) => void;
	toggleDeleteBtn: () => void;
	deleteCity: (city: ICityList) => void;
}

const CITY_LIST_VERSION = 1 as const;

const CityListContext = createContext<CityListContextType | undefined>(undefined);

/**
 * Provides the city list context to its children.
 *
 * @param children - The child components that will have access to the city list context.
 * @returns A context provider component that supplies the city list data and functions to its children.
 */
export const CityListProvider = ({ children }: { children: React.ReactNode }) => {
	const CitySchema = z.object({
		city: z.string().min(1),
		country: z.string().min(1),
		state: z.string().min(1).optional(),
		lat: z
			.union([z.number(), z.string()])
			.refine((val) => val !== '', { message: 'Latitude cannot be empty' }),
		lon: z
			.union([z.number(), z.string()])
			.refine((val) => val !== '', { message: 'Longitude cannot be empty' }),
	});
	const [cityList, setCityList] = useState<ICityListData>(() => {
		const savedCityList = localStorage.getItem('cityList');
		if (savedCityList) {
			const parsedCityList = JSON.parse(savedCityList);
			if (parsedCityList.version === CITY_LIST_VERSION) {
				return parsedCityList;
			}
		}

		return {
			version: CITY_LIST_VERSION,
			list: [],
		};
	});

	const [showDeleteBtn, setShowDeleteBtn] = useState<boolean>(false);

	/**
	 * Toggles the visibility of the delete button.
	 */
	const toggleDeleteBtn = () => {
		setShowDeleteBtn((prevShowDeleteBtn) => !prevShowDeleteBtn);
	};

	/**
	 * Adds a new city to the city list if it does not already exist.
	 *
	 * @param city - The city to be added to the list.
	 */
	// const addCity = (city: ICityList) => {
	// 	const cityExists = cityList.list.some(
	// 		(existingCity) =>
	// 			existingCity.city === city.city &&
	// 			existingCity.country === city.country &&
	// 			existingCity.state === city.state &&
	// 			existingCity.lat === city.lat &&
	// 			existingCity.lon === city.lon
	// 	);

	// 	if (!cityExists) {
	// 		setCityList((prevCityList) => ({
	// 			...prevCityList,
	// 			list: [...prevCityList.list, city],
	// 		}));
	// 	}
	// };
	const addCity = async (city: ICityList) => {
		try {
			const validatedCity = CitySchema.parse(city);
			setCityList((prevCityList) => {
				const cityExists = prevCityList.list.some(
					(existingCity) =>
						existingCity.city === validatedCity.city &&
						existingCity.country === validatedCity.country &&
						existingCity.state === validatedCity.state &&
						existingCity.lat === validatedCity.lat &&
						existingCity.lon === validatedCity.lon
				);

				if (!cityExists) {
					return {
						...prevCityList,
						list: [...prevCityList.list, validatedCity],
					};
				}
				return prevCityList;
			});
		} catch (error) {
			console.error('Invalid city data:', error);
		}
	};
	/**
	 * Deletes a city from the city list.
	 *
	 * @param city - The city to be deleted from the list.
	 */
	const deleteCity = (city: ICityList) => {
		setCityList((prevCityList) => ({
			...prevCityList,
			list: prevCityList.list.filter(
				(existingCity) =>
					existingCity.city !== city.city ||
					existingCity.country !== city.country ||
					existingCity.state !== city.state ||
					existingCity.lat !== city.lat ||
					existingCity.lon !== city.lon
			),
		}));
	};

	useEffect(() => {
		localStorage.setItem('cityList', JSON.stringify(cityList));
	}, [cityList.list.length]);

	return (
		<CityListContext.Provider
			value={{ ...cityList, addCity, showDeleteBtn, toggleDeleteBtn, deleteCity }}
		>
			{children}
		</CityListContext.Provider>
	);
};

export const useCityList = () => {
	const context = useContext(CityListContext);
	if (!context) {
		throw new Error('useCityList must be used within a CityListProvider');
	}
	return context;
};
