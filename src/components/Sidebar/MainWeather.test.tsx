import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MainWeather from './MainWeather';

const mockUseGetMainWeather = {
	temperature: { value: 25, units: '°C' },
	condition: 'Clear',
	minTemperature: { value: 15, units: '°C' },
	maxTemperature: { value: 30, units: '°C' },
	cloudCoverage: 10,
};

jest.mock('../../context/WeatherData.context', () => ({
	useGetMainWeather: () => mockUseGetMainWeather,
}));

jest.mock('../UI/WithLoading', () => ({
	__esModule: true,
	default: (Component: React.ComponentType) => (props: any) => (
		<Component {...props} data={mockUseGetMainWeather} />
	),
}));

describe('MainWeather component', () => {
	it('should render the main weather component with valid data', () => {
		const { getByText } = render(<MainWeather />);

		expect(getByText('25°C')).toBeInTheDocument();
		expect(getByText('30°C/15°C')).toBeInTheDocument();
		expect(getByText('Clear')).toBeInTheDocument();
		expect(getByText('clouds: 10%')).toBeInTheDocument();
	});

	it('should display the temperature with correct units', () => {
		const { getByText } = render(<MainWeather />);

		expect(getByText('25°C')).toBeInTheDocument();
	});

	it('should show max and min temperature values correctly', () => {
		const { getByText } = render(<MainWeather />);

		expect(getByText('30°C/15°C')).toBeInTheDocument();
	});

	it('should display the weather condition text', () => {
		const { getByText } = render(<MainWeather />);

		expect(getByText('Clear')).toBeInTheDocument();
	});

	it('should show cloud coverage percentage correctly', () => {
		const { getByText } = render(<MainWeather />);

		expect(getByText('clouds: 10%')).toBeInTheDocument();
	});
});
