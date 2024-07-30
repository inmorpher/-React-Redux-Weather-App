import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useGetWeatherIconInfo } from '../../context/WeatherData.context';
import { MainWeatherIcon } from './MainWeatherIcon';

beforeAll(() => {
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
});
// Mock the dynamic imports
vi.mock('../Icons/SnowDynamicIcon', () => ({ default: () => <div>SnowDynamicIcon</div> }));
vi.mock('../Icons/ClearCloudyDynamicIcon', () => ({
	default: () => <div>ClearCloudyDynamicIcon</div>,
}));
vi.mock('../Icons/CloudsDynamicIcon', () => ({ default: () => <div>CloudsDynamicIcon</div> }));
vi.mock('../Icons/PrecipitationDynamicIcon', () => ({
	default: () => <div>PrecipitationDynamicIcon</div>,
}));
vi.mock('../Icons/MistDynamicIcon', () => ({ default: () => <div>MistDynamicIcon</div> }));

// Mock the context hook
vi.mock('../../context/WeatherData.context', () => ({
	useGetWeatherIconInfo: vi.fn(),
}));

// Mock the withLoading HOC
vi.mock('../UI/WithLoading', () => ({
	default: (Component: React.ComponentType<any>) => Component,
}));

describe('MainWeatherIcon', () => {
	beforeEach(() => {
		vi.mocked(useGetWeatherIconInfo).mockReset();
	});

	it.each([
		['01', 'day'],
		['01', 'night'],
		['02', 'day'],
		['02', 'night'],
	])('renders ClearCloudyDynamicIcon for icon code %s and %s', async (iconCode, timeOfDay) => {
		render(<MainWeatherIcon data={{ iconCode, timeOfDay: timeOfDay as 'day' | 'night' }} />);
		expect(await screen.findByText('ClearCloudyDynamicIcon')).toBeDefined();
	});

	it.each([
		['03', 'day'],
		['03', 'night'],
		['04', 'day'],
		['04', 'night'],
	])('renders CloudsDynamicIcon for icon code %s and %s', async (iconCode, timeOfDay) => {
		render(<MainWeatherIcon data={{ iconCode, timeOfDay: timeOfDay as 'day' | 'night' }} />);
		expect(await screen.findByText('CloudsDynamicIcon')).toBeDefined();
	});

	it.each([
		['09', 'day'],
		['09', 'night'],
		['10', 'day'],
		['10', 'night'],
		['11', 'day'],
		['11', 'night'],
	])('renders PrecipitationDynamicIcon for icon code %s and %s', async (iconCode, timeOfDay) => {
		render(<MainWeatherIcon data={{ iconCode, timeOfDay: timeOfDay as 'day' | 'night' }} />);
		expect(await screen.findByText('PrecipitationDynamicIcon')).toBeDefined();
	});

	it.each([
		['13', 'day'],
		['13', 'night'],
	])('renders SnowDynamicIcon for icon code %s and %s', async (iconCode, timeOfDay) => {
		render(<MainWeatherIcon data={{ iconCode, timeOfDay: timeOfDay as 'day' | 'night' }} />);
		expect(await screen.findByText('SnowDynamicIcon')).toBeDefined();
	});

	it.each([
		['50', 'day'],
		['50', 'night'],
	])('renders MistDynamicIcon for icon code %s and %s', async (iconCode, timeOfDay) => {
		render(<MainWeatherIcon data={{ iconCode, timeOfDay: timeOfDay as 'day' | 'night' }} />);
		expect(await screen.findByText('MistDynamicIcon')).toBeDefined();
	});
});
/**
 * Test suite for the MainWeatherIcon component.
 * This describe block contains tests to ensure the correct rendering of weather icons
 * based on different icon codes and times of day.
 */
describe('MainWeatherIcon', () => {
	/**
	 * Resets the mock for useGetWeatherIconInfo before each test.
	 */
	beforeEach(() => {
		vi.mocked(useGetWeatherIconInfo).mockReset();
	});

	/**
	 * Tests the rendering of ClearCloudyDynamicIcon for specific icon codes and times of day.
	 * @param {string} iconCode - The weather icon code.
	 * @param {('day' | 'night')} timeOfDay - The time of day.
	 */
	it.each([
		['01', 'day'],
		['01', 'night'],
		['02', 'day'],
		['02', 'night'],
	])('renders ClearCloudyDynamicIcon for icon code %s and %s', async (iconCode, timeOfDay) => {
		render(<MainWeatherIcon data={{ iconCode, timeOfDay: timeOfDay as 'day' | 'night' }} />);
		expect(await screen.findByText('ClearCloudyDynamicIcon')).toBeDefined();
	});

	/**
	 * Tests the rendering of CloudsDynamicIcon for specific icon codes and times of day.
	 * @param {string} iconCode - The weather icon code.
	 * @param {('day' | 'night')} timeOfDay - The time of day.
	 */
	it.each([
		['03', 'day'],
		['03', 'night'],
		['04', 'day'],
		['04', 'night'],
	])('renders CloudsDynamicIcon for icon code %s and %s', async (iconCode, timeOfDay) => {
		render(<MainWeatherIcon data={{ iconCode, timeOfDay: timeOfDay as 'day' | 'night' }} />);
		expect(await screen.findByText('CloudsDynamicIcon')).toBeDefined();
	});

	/**
	 * Tests the rendering of PrecipitationDynamicIcon for specific icon codes and times of day.
	 * @param {string} iconCode - The weather icon code.
	 * @param {('day' | 'night')} timeOfDay - The time of day.
	 */
	it.each([
		['09', 'day'],
		['09', 'night'],
		['10', 'day'],
		['10', 'night'],
		['11', 'day'],
		['11', 'night'],
	])('renders PrecipitationDynamicIcon for icon code %s and %s', async (iconCode, timeOfDay) => {
		render(<MainWeatherIcon data={{ iconCode, timeOfDay: timeOfDay as 'day' | 'night' }} />);
		expect(await screen.findByText('PrecipitationDynamicIcon')).toBeDefined();
	});

	/**
	 * Tests the rendering of SnowDynamicIcon for specific icon codes and times of day.
	 * @param {string} iconCode - The weather icon code.
	 * @param {('day' | 'night')} timeOfDay - The time of day.
	 */
	it.each([
		['13', 'day'],
		['13', 'night'],
	])('renders SnowDynamicIcon for icon code %s and %s', async (iconCode, timeOfDay) => {
		render(<MainWeatherIcon data={{ iconCode, timeOfDay: timeOfDay as 'day' | 'night' }} />);
		expect(await screen.findByText('SnowDynamicIcon')).toBeDefined();
	});

	/**
	 * Tests the rendering of MistDynamicIcon for specific icon codes and times of day.
	 * @param {string} iconCode - The weather icon code.
	 * @param {('day' | 'night')} timeOfDay - The time of day.
	 */
	it.each([
		['50', 'day'],
		['50', 'night'],
	])('renders MistDynamicIcon for icon code %s and %s', async (iconCode, timeOfDay) => {
		render(<MainWeatherIcon data={{ iconCode, timeOfDay: timeOfDay as 'day' | 'night' }} />);
		expect(await screen.findByText('MistDynamicIcon')).toBeDefined();
	});
});
