import { useDailyContext } from '../../../hooks/useDailyContext';
import { useFetchState } from '../../../hooks/useFetchState';
import { selectDailyMain } from '../../../store/slices/weatherApiSlice';
import Skeleton from '../../UI/SkeletonLoader/Skeleton';
import DailyColors from './DailyColors';
import DailyContainer from './DailyContainer';
import DailyDetails from './DailyDetails';
import DailyList from './DailyList/DailyList';

const Daily = () => {
	const {
		status: { isLoading, isError, isSuccess },
		data,
	} = useFetchState(selectDailyMain);

	const { containerRef, dailyDetailsRef, dailyListRef } = useDailyContext();

	if (isLoading) return <Skeleton />;

	if (!data || !isSuccess || isError) return null;

	const { dailyValues, colors } = data;

	return (
		<DailyContainer containerRef={containerRef}>
			<DailyColors colors={colors} />
			<div className='relative inline-block h-full min-w-full' ref={dailyListRef}>
				<DailyList dailyValues={dailyValues} />
			</div>
			<div
				className='inline-block min-w-full overflow-hidden overflow-y-scroll scrollbar-hidden scrollbar-hidden-webkit'
				ref={dailyDetailsRef}
			>
				<DailyDetails />
			</div>
		</DailyContainer>
	);
};

export default Daily;
