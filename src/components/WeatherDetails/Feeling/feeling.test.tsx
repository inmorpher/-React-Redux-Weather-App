import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { TextDecoder, TextEncoder } from 'util';
import { describe, expect, it, vi } from 'vitest';
import { IFeelsLikeInfo } from '../../../context/WeatherData.types';
import Feeling from './Feeling';
global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;

// Mock the dependencies
vi.mock('../../../context/WeatherData.context', () => ({
	useGetFeelsLikeInfo: vi.fn().mockReturnValue({
		temperature: { value: 25, units: 'C' },
		feelsLike: 'Warm',
	}),
	useWeatherData: vi.fn().mockReturnValue({ status: 'success' }),
}));

vi.mock('../../UI/WithLoading', () => ({
	default: (Component: React.ComponentType) => (props: any) => <Component {...props} />,
}));

vi.mock('../../UI/Global/Wrapper', () => ({
	default: ({ children }: { children: React.ReactNode }) => (
		<div data-testid='wrapper'>{children}</div>
	),
}));

vi.mock('./FeelingIcon', () => ({
	default: () => <div data-testid='feeling-icon'>Icon</div>,
}));

vi.mock('./FeelingContent', () => ({
	default: ({ temp }: { temp: { value: number; units: string } }) => (
		<div data-testid='feeling-content'>
			Temperature: {temp.value}
			{temp.units}
		</div>
	),
}));

describe('Feeling Component', () => {
	it('renders correctly with provided data', () => {
		const mockData: IFeelsLikeInfo = {
			temperature: { value: 25, units: 'C' },
			feelsLike: 'Warm',
		};

		render(<Feeling data={mockData} />);

		expect(screen.getAllByTestId('wrapper')).toHaveLength(3);
		expect(screen.getByTestId('feeling-icon')).toBeInTheDocument();
		expect(screen.getByTestId('feeling-content')).toHaveTextContent('Temperature: 25');
		expect(screen.getByText('Warm')).toBeInTheDocument();
	});
});
