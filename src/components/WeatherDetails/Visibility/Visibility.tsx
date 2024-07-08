import { useFetchState } from '../../../hooks/useFetchState';
import { selectVisibility } from '../../../store/slices/weatherApiSlice';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import VisibilityIcon from './VisibilityIcon';

const Visibility = () => {
	const {
		status: { isLoading, isError, isSuccess },
		data: visibility,
	} = useFetchState(selectVisibility);

	if (isLoading) return <Skeleton />;

	if (isError || !visibility || !isSuccess) return null;

	const { distance, range } = visibility;

	return (
		<div className='relative flex flex-1 flex-col'>
			<div className='flex flex-1 items-end gap-4'>
				<Visibility.Icon />
				<span className='text-[2rem] leading-[2.5rem]'>{distance}</span>
			</div>
			<div className='flex flex-1 flex-col justify-end text-center text-sm'>{range}</div>
		</div>
	);
};

Visibility.Icon = VisibilityIcon;
export default Visibility;
