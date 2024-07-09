import { useDailyContext } from '../../../hooks/useDailyContext';
import Button from '../../UI/Button';
import Calendar from './DailyComponents/DailyCalendar';
import WeatherCondition from './DailyComponents/DailyWeatherCondition';
import DailyWeatherDetails from './DailyComponents/DailyWeatherDetails';
import WeatherScale from './DailyComponents/WeatherScale/WeatherScale';

export const DailyDetails: React.FC = () => {
	const {
		onCloseDetails,
		dailyState: { isOpen },
	} = useDailyContext();

	return (
		<div className='relative inline-block w-full px-1'>
			<Button
				variant='close'
				className='sticky left-[100%] top-0'
				onClick={() => onCloseDetails()}
				tabIndex={isOpen ? 0 : -1}
				aria-label='close details'
			/>
			<div className='mt-[-40px] h-full w-full'>
				<Calendar />
				<WeatherCondition />
				<WeatherScale />

				<DailyWeatherDetails />
			</div>
		</div>
	);
};

export default DailyDetails;
