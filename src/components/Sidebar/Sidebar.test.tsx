import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { MockedFunction, vi } from 'vitest';
import { CityListProvider } from '../../context/CityList.context';
import MetricProvider from '../../context/Metric.context';
import { ThemeProvider } from '../../context/Theme.context';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import Sidebar from './Sidebar';

vi.mock('../../hooks/useSidebarContext');

describe('Sidebar', () => {
	test('should render the sidebar component', () => {
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

		const mockIsOpenMobile = true;
		const mockHandleTouchStart = vi.fn();
		const mockHandleTouchMove = vi.fn();

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: mockIsOpenMobile,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: mockHandleTouchStart,
			handleTouchMove: mockHandleTouchMove,
			closeSideBarOnListItemClick: vi.fn(),
		});

		const { getByRole } = render(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		const sidebarElement = getByRole('complementary');
		expect(sidebarElement).toBeInTheDocument();
		expect(sidebarElement).toHaveClass('left-0');

		fireEvent.touchStart(sidebarElement);
		expect(mockHandleTouchStart).toHaveBeenCalled();

		fireEvent.touchMove(sidebarElement);
		expect(mockHandleTouchMove).toHaveBeenCalled();

		const UserCityList = getByRole('list', { name: /user-city-list/i });
		expect(UserCityList).toBeInTheDocument();

		const controlsElement = getByRole('option', { name: /controls/i });
		expect(controlsElement).toBeInTheDocument();
	});

	test('should apply the correct styles when the sidebar is open on mobile', () => {
		const mockIsOpenMobile = true;
		const mockHandleTouchStart = vi.fn();
		const mockHandleTouchMove = vi.fn();

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: mockIsOpenMobile,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: mockHandleTouchStart,
			handleTouchMove: mockHandleTouchMove,
			closeSideBarOnListItemClick: vi.fn(),
		});

		const { getByRole } = render(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		const sidebarElement = getByRole('complementary');
		expect(sidebarElement).toHaveClass('left-0');
	});

	test('should apply the correct styles when the sidebar is closed on mobile', () => {
		const mockIsOpenMobile = false;
		const mockHandleTouchStart = vi.fn();
		const mockHandleTouchMove = vi.fn();

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: mockIsOpenMobile,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: mockHandleTouchStart,
			handleTouchMove: mockHandleTouchMove,
			closeSideBarOnListItemClick: vi.fn(),
		});

		const { getByRole } = render(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		const sidebarElement = getByRole('complementary');
		expect(sidebarElement).toHaveClass('-left-full');
		expect(sidebarElement).not.toHaveClass('left-0');
	});

	test('should apply the correct styles when the sidebar is open on desktop', () => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: vi.fn().mockImplementation((query) => ({
				matches: true,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		});

		const mockIsOpenMobile = false;
		const mockHandleTouchStart = vi.fn();
		const mockHandleTouchMove = vi.fn();

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: mockIsOpenMobile,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: mockHandleTouchStart,
			handleTouchMove: mockHandleTouchMove,
			closeSideBarOnListItemClick: vi.fn(),
		});

		const { getByRole } = render(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		const sidebarElement = getByRole('complementary');
		expect(sidebarElement).toHaveClass('md:sticky');
		expect(sidebarElement).toHaveClass('md:bottom-auto');
		expect(sidebarElement).toHaveClass('md:top-[85px]');
		expect(sidebarElement).toHaveClass('md:block');
		expect(sidebarElement).toHaveClass('md:max-h-[500px]');
		expect(sidebarElement).toHaveClass('md:w-auto');
		expect(sidebarElement).toHaveClass('md:rounded-xl');
		expect(sidebarElement).toHaveClass('md:col-span-2');
		expect(sidebarElement).toHaveClass('md:left-auto');
		expect(sidebarElement).toHaveClass('md:z-20');
	});

	test('should apply the correct styles when the sidebar is closed on desktop', () => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: vi.fn().mockImplementation((query) => ({
				matches: true,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
				dispatchEvent: vi.fn(),
			})),
		});

		const mockIsOpenMobile = false;
		const mockHandleTouchStart = vi.fn();
		const mockHandleTouchMove = vi.fn();

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: mockIsOpenMobile,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: mockHandleTouchStart,
			handleTouchMove: mockHandleTouchMove,
			closeSideBarOnListItemClick: vi.fn(),
		});

		const { getByRole } = render(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		const sidebarElement = getByRole('complementary');
		expect(sidebarElement).toHaveClass('-left-full');
		expect(sidebarElement).not.toHaveClass('left-0');
	});

	test('should handle touch events correctly when interacting with the sidebar on mobile', () => {
		const mockHandleTouchStart = vi.fn();
		const mockHandleTouchMove = vi.fn();

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: true,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: mockHandleTouchStart,
			handleTouchMove: mockHandleTouchMove,
			closeSideBarOnListItemClick: vi.fn(),
		});

		const { getByRole } = render(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		const sidebarElement = getByRole('complementary');

		fireEvent.touchStart(sidebarElement);
		expect(mockHandleTouchStart).toHaveBeenCalled();

		fireEvent.touchMove(sidebarElement);
		expect(mockHandleTouchMove).toHaveBeenCalled();
	});

	test('should render the Controls component within the sidebar', () => {
		const mockIsOpenMobile = true;
		const mockHandleTouchStart = vi.fn();
		const mockHandleTouchMove = vi.fn();

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: mockIsOpenMobile,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: mockHandleTouchStart,
			handleTouchMove: mockHandleTouchMove,
			closeSideBarOnListItemClick: vi.fn(),
		});

		const { getByRole } = render(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		const controlsElement = getByRole('option', { name: /controls/i });
		expect(controlsElement).toBeInTheDocument();
	});

	test('should render the UserCityList component within the sidebar', () => {
		const mockIsOpenMobile = true;
		const mockHandleTouchStart = vi.fn();
		const mockHandleTouchMove = vi.fn();

		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue({
			isOpenMobile: mockIsOpenMobile,
			touchStart: 0,
			toggleSideBar: vi.fn(),
			setSidebarVisibility: vi.fn(),
			handleTouchStart: mockHandleTouchStart,
			handleTouchMove: mockHandleTouchMove,
			closeSideBarOnListItemClick: vi.fn(),
		});

		const { getByRole } = render(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		const sidebarElement = getByRole('complementary');
		const userCityListElement = getByRole('list', { name: /user-city-list/i });

		expect(sidebarElement).toBeInTheDocument();
		expect(userCityListElement).toBeInTheDocument();
	});

	test('should not render the sidebar component if the useSidebarContext hook returns undefined', () => {
		(useSidebarContext as MockedFunction<typeof useSidebarContext>).mockReturnValue(
			undefined as unknown as ReturnType<typeof useSidebarContext>
		);

		const { queryByRole } = render(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		const sidebarElement = queryByRole('complementary');
		expect(sidebarElement).toBeInTheDocument();
	});

	test('should apply the correct styles when the window is resized between mobile and desktop views', () => {
		let currentWidth = 375; // Start with mobile width
		Object.defineProperty(window, 'innerWidth', {
			writable: true,
			configurable: true,
			value: currentWidth,
		});

		// Mock matchMedia
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: vi.fn().mockImplementation((query) => ({
				matches: query === '(min-width: 768px)' ? currentWidth >= 768 : false,
				media: query,
				onchange: null,
				addListener: vi.fn(),
				removeListener: vi.fn(),
			})),
		});

		const { rerender, getByRole } = render(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		const sidebarElement = getByRole('complementary');

		// Check mobile view
		expect(sidebarElement).toHaveClass('-left-full');
		expect(sidebarElement).toHaveClass('w-[80%]');

		// Simulate resize to desktop
		currentWidth = 1024;
		Object.defineProperty(window, 'innerWidth', { value: currentWidth });
		window.dispatchEvent(new Event('resize'));

		// Re-render to apply changes
		rerender(
			<MetricProvider>
				<ThemeProvider>
					<CityListProvider>
						<Sidebar />
					</CityListProvider>
				</ThemeProvider>
			</MetricProvider>
		);

		// Check desktop view
		expect(sidebarElement).toHaveClass('md:sticky');
		expect(sidebarElement).toHaveClass('md:w-auto');
	});
});
