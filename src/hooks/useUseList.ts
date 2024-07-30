import { useUser, useUserCityList } from '../context/User.context';

export const useUserList = () => {
	// const userList = useAppSelector(selectUserCityList);
	const { dispatch } = useUser();
	const userList = useUserCityList();

	console.log(userList);
	//TODO: Implement toggleDelete function here
	const setDelete = (city: string) => {
		// dispatch({ type: 'TOGGLE_DELETE', action: '' });
		console.log('delete');
	};

	return {
		userList: userList.list,
		showDelete: userList.showDelete,
		setDelete,
		isUserList: userList.list.length !== 0,
	};
};
