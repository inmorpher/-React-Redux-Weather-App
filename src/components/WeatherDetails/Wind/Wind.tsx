import { useGetWindInfo } from '../../../context/WeatherData.context';
import { IWindInfo } from '../../../context/WeatherData.types';
import Wrapper from '../../UI/Global/Wrapper';
import withLoading from '../../UI/WithLoading';
import WindIcon from './WindIcon';
import WindSpeedDetails from './WindSpeedDetails';

/**
 * Wind component displays wind information including direction and speed details.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {IWindInfo} props.data - The wind information object.
 * @param {number} props.data.degree - The wind direction in degrees.
 * @param {number} props.data.speed - The wind speed.
 * @param {number} props.data.gust - The wind gust speed.
 * @param {string} props.data.direction - The literal wind direction (e.g., "N", "SE").
 * @returns {JSX.Element} A React component displaying wind information.
 */
const Wind = ({ data }: { data?: IWindInfo }) => {
	const { degree, speed, gust, direction } = data || {};
	return (
		<Wind.Wrapper className='relative flex flex-1 flex-col'>
			<Wind.Icon deg={degree} literal={direction} />
			<Wind.SpeedDetails speed={speed} gust={gust} />
		</Wind.Wrapper>
	);
};

Wind.Wrapper = Wrapper;
Wind.Icon = WindIcon;
Wind.SpeedDetails = WindSpeedDetails;

const WindWithLoading = withLoading<{}, IWindInfo>(Wind, useGetWindInfo);
export { Wind, WindWithLoading as WindWithLoading };

export default WindWithLoading;
