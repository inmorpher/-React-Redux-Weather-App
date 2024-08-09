import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CityName from './CityName';

const mockUseCityName = {
	formattedCityName: 'New York',
	localTime: '10:00 AM',
	handleAddCity: jest.fn(),
};

jest.mock('../../hooks/useCityName', () => ({
	useCityName: () => mockUseCityName,
}));

jest.mock('../UI/WithLoading', () => ({
	__esModule: true,
	default: (Component: React.ComponentType) => Component,
}));

describe('CityName', () => {
	it('should render the city name correctly when provided by the useCityName hook', () => {
		const { getByText } = render(<CityName />);
		expect(getByText('New York')).toBeInTheDocument();
		expect(getByText('10:00 AM')).toBeInTheDocument();
	});

	it('should display the local time correctly when provided by the useCityName hook', () => {
		const { getByText } = render(<CityName />);
		expect(getByText('10:00 AM')).toBeInTheDocument();
	});
});
