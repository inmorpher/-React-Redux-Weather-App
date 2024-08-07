import Button from '../../UI/Button';

import { useCityList } from '../../../context/CityList.context';
import Wrapper from '../../UI/Global/Wrapper';
import UserCityListItem from './UserCityListItem';

const UserCityList = () => {
	const { list: cityList, showDeleteBtn, toggleDeleteBtn } = useCityList();

	//TODO: try to use memo for items
	return (
		<UserCityList.Wrapper className='relative flex flex-col items-center justify-center'>
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
