import { createContext, useContext, useEffect, useState } from 'react';

export interface ICityList {
	city: string;
	country: string;
	state: string;
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

export const CityListProvider = ({ children }: { children: React.ReactNode }) => {
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

	const toggleDeleteBtn = () => {
		setShowDeleteBtn((prevShowDeleteBtn) => !prevShowDeleteBtn);
	};

	const addCity = (city: ICityList) => {
		const cityExists = cityList.list.some(
			(existingCity) =>
				existingCity.city === city.city &&
				existingCity.country === city.country &&
				existingCity.state === city.state &&
				existingCity.lat === city.lat &&
				existingCity.lon === city.lon
		);

		if (!cityExists) {
			setCityList((prevCityList) => ({
				...prevCityList,
				list: [...prevCityList.list, city],
			}));
		}
	};
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
