import { useGetWindInfo } from '../../../context/WeatherData.context';
import { IWindInfo } from '../../../context/WeatherData.types';
import withLoading from '../../UI/WithLoading';
import WindIcon from './WindIcon';
import WindSpeedDetails from './WindSpeedDetails';
import WindWrapper from './WindWrapper';

const Wind = ({ data }: { data: IWindInfo }) => {
	const { degree, speed, gust, direction } = data;
	return (
		<Wind.Wrapper>
			<Wind.Icon deg={degree} literal={direction} />
			<Wind.SpeedDetails speed={speed} gust={gust} />
		</Wind.Wrapper>
	);
};

Wind.Wrapper = WindWrapper;
Wind.Icon = WindIcon;
Wind.SpeedDetails = WindSpeedDetails;

export default withLoading(Wind, useGetWindInfo);
