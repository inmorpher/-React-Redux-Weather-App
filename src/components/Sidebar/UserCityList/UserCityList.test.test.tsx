import '@testing-library/jest-dom';
import { ReactNode } from 'react';

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
}
