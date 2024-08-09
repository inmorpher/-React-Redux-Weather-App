import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import UserCityList from './UserCityList';

const mockCloseSideBarOnListItemClick = jest.fn();
const mockUseCityList = {
	list: [],
	showDeleteBtn: false,
	toggleDeleteBtn: jest.fn(),
};

jest.mock('../../../context/CityList.context', () => ({
	useCityList: () => mockUseCityList,
}));

jest.mock('../../../hooks/useSidebarContext', () => ({
	useSidebarContext: () => ({ closeSideBarOnListItemClick: mockCloseSideBarOnListItemClick }),
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => jest.fn(),
}));

jest.mock('../../../context/WeatherData.context', () => ({
	WeatherProvider: ({ children }: { children: ReactNode }) => children,
}));

describe('UserCityList component', () => {
	it('should render the UserCityList component correctly when there are no cities in the list', () => {
		const { getByRole, getByText } = render(<UserCityList />);

		const userCityList = getByRole('usercitylist');
		expect(userCityList).toBeInTheDocument();

		const emptyListMessage = getByText('Your city list is empty.');
		expect(emptyListMessage).toBeInTheDocument();

		const deleteButton = userCityList.querySelector('button');
		expect(deleteButton).not.toBeInTheDocument();
	});
});
