import { twMerge } from 'tailwind-merge';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import Controls from './Controls';
import UserCityList from './UserCityList/UserCityList';

const Sidebar = () => {
	const { isOpenMobile, handleTouchMove, handleTouchStart } = useSidebarContext();

	return (
		<aside
			// className={twMerge(
			// 	`bg-weather-gradient fixed-bottom-full z-50 col-span-2 h-full w-full overflow-hidden border-t-[.5px]  border-t-white/50  transition-all ease-in-out md:sticky md:bottom-auto md:top-[85px] md:block md:max-h-[500px] md:w-auto md:rounded-xl md:border-0`,
			// 	isOpenMobile && 'fixed bottom-0 left-0 top-auto h-4/5 w-[100vw]'
			// )}
			className={twMerge(
				'bg-weather-gradient fixed z-50 h-[100dvh] top-0 -left-full w-[80%] transition-all duration-[500ms]  ease-in-out md:sticky md:bottom-auto md:top-[85px] md:block md:max-h-[500px] md:w-auto md:rounded-xl md:col-span-2 md:left-auto md:z-20 overflow-hidden border-white',
				isOpenMobile && 'left-0'
			)}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
		>
			<div className='flex h-full flex-col justify-between p-3'>
				<UserCityList />
				<Controls />
			</div>
		</aside>
	);
};

export default Sidebar;
