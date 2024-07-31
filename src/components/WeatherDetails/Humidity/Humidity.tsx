import { useGetHumidityInfo } from '../../../context/WeatherData.context';
import { IHumidityInfo } from '../../../context/WeatherData.types';
import SpanText from '../../UI/Global/SpanText';
import Wrapper from '../../UI/Global/Wrapper';
import withLoading from '../../UI/WithLoading';
import HumidityIcon from './HumidityIcon';

/**
 * Humidity component that displays the current humidity and dew point.
 * It fetches the humidity data using the `useFetchState` hook and displays
 * a loading skeleton while the data is being fetched.
 *
 * @component
 * @returns {JSX.Element | null} The rendered component or null if there is an error or no data.
 */
const Humidity = ({ data: { humidity, dewPoint } }: { data: IHumidityInfo }) => {
	return (
		<Humidity.Wrapper className='relative flex flex-1 flex-col'>
			<Humidity.Wrapper className='flex flex-1 items-end gap-4 px-3'>
				<Humidity.Icon />
				<Humidity.Text className='text-[2.5rem] leading-[2.5rem]'>{humidity + '%'}</Humidity.Text>
			</Humidity.Wrapper>
			<Humidity.Wrapper className='flex flex-1 flex-col justify-end text-center text-sm'>
				{dewPoint && (
					<Humidity.Text>
						dew point: {dewPoint.value}
						{dewPoint.units}
					</Humidity.Text>
				)}
			</Humidity.Wrapper>
		</Humidity.Wrapper>
	);
};
Humidity.Wrapper = Wrapper;
Humidity.Icon = HumidityIcon;
Humidity.Text = SpanText;

export default withLoading<{}, IHumidityInfo>(Humidity, useGetHumidityInfo);
