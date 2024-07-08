import Button from '../../UI/Button';

import { useUserList } from '../../../hooks/useUseList';
import UserCityListItem from './UserCityListItem';

const UserCityList = () => {
	const { userList, setDelete, showDelete, isUserList } = useUserList();
	return (
		<div className='relative flex flex-col items-center justify-center'>
			{isUserList && (
				<Button
					size='medium'
					variant='edit'
					className={`self-end ${showDelete ? 'active' : ''}`}
					onClick={setDelete}
				/>
			)}
			<ul className='bg-weather-bg w-full overflow-hidden  rounded-lg shadow-basic transition-all '>
				{isUserList
					? userList.map((userListItem, index) => {
							return (
								<UserCityListItem
									key={'userList' + index}
									showDelete={showDelete}
									{...userListItem}
								/>
							);
						})
					: 'Your city list is empty.'}
			</ul>
		</div>
	);
};

export default UserCityList;
