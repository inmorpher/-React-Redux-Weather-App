import { useAppDispatch, useAppSelector } from '../store/hooks.type';
import { selectUserCityList, toggleDelete } from '../store/slices/userSlice';

export const useUserList = () => {
	const userList = useAppSelector(selectUserCityList);
	const dispatch = useAppDispatch();

	const setDelete = () => {
		dispatch(toggleDelete());
	};

	return {
		userList: userList.list,
		showDelete: userList.showDelete,
		setDelete,
		isUserList: userList.list.length !== 0,
	};
};
