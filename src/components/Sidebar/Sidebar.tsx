import { twMerge } from 'tailwind-merge';
import { useSidebarContext } from '../../hooks/useSidebarContext';
import Controls from './Controls';
import UserCityList from './UserCityList/UserCityList';

const Sidebar = () => {
	const { isOpenMobile = false, handleTouchMove, handleTouchStart } = useSidebarContext() || {};

	return (
		<aside
			className={twMerge(
				'bg-weather-gradient fixed z-50 h-[100dvh] top-0 -left-full w-[80%] transition-all duration-[500ms]  ease-in-out md:sticky md:bottom-auto md:top-[85px] md:block md:max-h-[500px] md:w-auto md:rounded-xl md:col-span-2 md:left-auto md:z-20 overflow-hidden border-white',
				isOpenMobile && 'left-0'
			)}
			onTouchStart={handleTouchStart ?? undefined}
			onTouchMove={handleTouchMove ?? undefined}
			role='complementary'
		>
			<div className='flex h-full flex-col justify-between p-3'>
				<UserCityList />
				<Controls />
			</div>
		</aside>
	);
};

export default Sidebar;
