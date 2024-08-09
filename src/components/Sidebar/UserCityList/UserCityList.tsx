import Button from '../../UI/Button';

import { useCityList } from '../../../context/CityList.context';
import { useSidebarContext } from '../../../hooks/useSidebarContext';
import Wrapper from '../../UI/Global/Wrapper';
import UserCityListItem from './UserCityListItem';

type UserCityListProps = React.FC & {
	Wrapper: typeof Wrapper;
	Button: typeof Button;
};
/**
 * Component that displays a list of user-selected cities.
 * It allows toggling a delete mode to remove cities from the list.
 *
 * @returns {JSX.Element} The rendered UserCityList component.
 */
export const UserCityList: UserCityListProps = () => {
	const { list: cityList, showDeleteBtn, toggleDeleteBtn } = useCityList();
	const { closeSideBarOnListItemClick } = useSidebarContext();

	//TODO: try to use memo for items
	return (
		<UserCityList.Wrapper
			className='relative flex flex-col items-center justify-center'
			role='usercitylist'
		>
			{cityList.length > 0 && (
				<UserCityList.Button
					size='medium'
					variant='edit'
					className={`self-end ${showDeleteBtn ? 'active' : ''}`}
					onClick={toggleDeleteBtn}
					aria-label='toggle delete mode'
				/>
			)}
			<ul className='bg-weather-bg w-full overflow-hidden rounded-lg shadow-basic transition-all'>
				{cityList.length > 0 ? (
					cityList.map((userListItem, index) => (
						<UserCityListItem
							key={'userList' + index}
							showDelete={showDeleteBtn}
							{...userListItem}
							onClick={closeSideBarOnListItemClick}
						/>
					))
				) : (
					<li>Your city list is empty.</li>
				)}
			</ul>
		</UserCityList.Wrapper>
	);
};

UserCityList.Wrapper = Wrapper;
UserCityList.Button = Button;

export default UserCityList;
