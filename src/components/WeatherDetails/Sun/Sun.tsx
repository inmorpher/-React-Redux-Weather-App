import { useGetSunPosition } from '../../../context/WeatherData.context';
import { ISunPosition } from '../../../context/WeatherData.types';
import { useSunPosition } from '../../../hooks/useSunPosition';
import Wrapper from '../../UI/Global/Wrapper';
import withLoading from '../../UI/WithLoading';
import SunPositionIcon from './SunPostionIcon';
import SunTimings from './SunTimings';

/**
 * Renders a component displaying sun position and timings.
 *
 * @param {Object} props - The component props.
 * @param {ISunPosition} props.data - The sun position data.
 * @returns {JSX.Element} A React component displaying sun position and timings.
 */
const Sun = ({ data }: { data: ISunPosition }) => {
	const { pathRef, indicatorRef } = useSunPosition(data);
	const { isDay, sunrise, sunset } = data;

	return (
		<Sun.Wrapper className='relative flex min-w-full flex-1 flex-col'>
			<Sun.PositionIcon isDay={!!isDay} pathRef={pathRef} indicatorRef={indicatorRef} />
			<Sun.Timings sunrise={sunrise} sunset={sunset} isDay={!!isDay} />
		</Sun.Wrapper>
	);
};

Sun.Wrapper = Wrapper;
Sun.PositionIcon = SunPositionIcon;
Sun.Timings = SunTimings;

export default withLoading<{}, ISunPosition>(Sun, useGetSunPosition);
