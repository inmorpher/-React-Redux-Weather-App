import { useCallback } from 'react';
import Button from '../../../components/UI/Button';
import Search from '../../../components/WeatherDetails/Search/Search';
import { useGetURLParams } from '../../../hooks/useGetURLParams';
import { useSidebarContext } from '../../../hooks/useSidebarContext';
import { useAppSelector } from '../../../store/hooks.type';
import { selectLoadingStatus } from '../../../store/slices/weatherApiSlice';
import HeaderContainer from './HeaderContainer';
import HeaderLoader from './HeaderLoader';
import HeaderWeatherContent from './HeaderWeatherContent';
import HeaderWrapper from './HeaderWrapper';

/**
 * Header component for displaying the top section of the weather application.
 * It dynamically shows a loader or content based on the loading status.
 * Also, it includes a mobile button to toggle the sidebar and a search component.
 */
const Header = () => {
	const url = useGetURLParams(); // Retrieves URL parameters to determine the current location for weather data.
	const isLoading = useAppSelector(selectLoadingStatus(url)); // Determines the loading status based on the current URL.

	const { toggleSideBar } = useSidebarContext(); // Provides a method to toggle the sidebar visibility.

	const handleToggleSidebar = useCallback(() => {
		toggleSideBar();
	}, [toggleSideBar]);

	return (
		<Header.Container>
			<Header.Wrapper>
				<div className='bg-weather-gradient flex h-10 w-full  items-center justify-between gap-3 overflow-hidden rounded-full  border-[.2px] border-white/50 sm:relative sm:h-12 sm:py-0 md:w-2/3 md:px-3'>
					{/* Displays either the content or a loader based on the loading status */}
					{isLoading ? <Header.Content /> : <HeaderLoader />}
				</div>
				<div className='flex h-10 gap-3 md:w-1/3'>
					{/* Mobile button to toggle the sidebar */}
					<Header.MobileBtn
						aria-label='Search by input'
						type='button'
						className={`fill-red-500 md:hidden`}
						variant={'burger'}
						size='medium'
						onClick={handleToggleSidebar}
					/>
					{/* Search component for location-based weather data */}
					<Header.Search />
				</div>
			</Header.Wrapper>
		</Header.Container>
	);
};

// Assigning sub components to the Header component for better structure and readability.
Header.Container = HeaderContainer;
Header.Wrapper = HeaderWrapper;
Header.Content = HeaderWeatherContent;
Header.Loader = HeaderLoader;
Header.Search = Search;
Header.MobileBtn = Button;

export default Header;
