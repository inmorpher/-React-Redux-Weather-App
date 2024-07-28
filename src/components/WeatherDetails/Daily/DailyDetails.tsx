import { useDailyContext } from '../../../hooks/useDailyContext';
import Button from '../../UI/Button';
import Wrapper from '../../UI/Global/Wrapper';
import Calendar from './DailyComponents/DailyCalendar';
import WeatherCondition from './DailyComponents/DailyWeatherCondition';
import DailyWeatherDetails from './DailyComponents/DailyWeatherDetails';
import WeatherScale from './DailyComponents/WeatherScale/WeatherScale';

export const DailyDetails = () => {
	const {
		onCloseDetails,
		dailyState: { isOpen },
	} = useDailyContext();

	return (
		<DailyDetails.Wrapper className='relative inline-block w-full px-1'>
			<DailyDetails.CloseButton
				variant='close'
				className='sticky left-[100%] top-0'
				onClick={() => onCloseDetails()}
				tabIndex={isOpen ? 0 : -1}
				aria-label='close details'
			/>
			<DailyDetails.Wrapper className='mt-[-40px] h-full w-full'>
				<DailyDetails.Calendar />
				<DailyDetails.WeatherCondition />
				<DailyDetails.WeatherScale />
				<DailyDetails.DailyWeatherDetails />
			</DailyDetails.Wrapper>
		</DailyDetails.Wrapper>
	);
};

DailyDetails.Wrapper = Wrapper;
DailyDetails.CloseButton = Button;
DailyDetails.Calendar = Calendar;
DailyDetails.WeatherCondition = WeatherCondition;
DailyDetails.WeatherScale = WeatherScale;
DailyDetails.DailyWeatherDetails = DailyWeatherDetails;

export default DailyDetails;
