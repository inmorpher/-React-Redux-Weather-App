import { IDailyType } from '../../../../api/weather.type';
import StaticWeatherIcon from '../../../UI/StaticWeatherIcon';
import DailyListItemContainer from './DailyListItemContainer';
import DailyListItemGradientTempLine from './DailyListItemGradientTempLine';
import DailyListItemTemps from './DailyListItemTemps';
import DailyListItemWeekday from './DailyListItemWeekday';

export interface IDailyListItemProps {
	index: number;
	daily: IDailyType;
}

/**
 * Component to render a daily weather list item.
 *
 * @param {IDailyListItemProps} props - The properties for the component.
 * @param {number} props.index - The index of the day in the list.
 * @param {IDailyType} props.daily - The daily weather data.
 * @returns {JSX.Element} The rendered daily list item component.
 */
const DailyListItem = ({
	index,
	daily: { weekDay, dayMinTemp, dayMaxTemp, dayWeatherIcon, dailyTempCoords },
}: IDailyListItemProps): JSX.Element => {
	return (
		<DailyListItem.Container dayIndex={index}>
			<DailyListItem.Weekday dayIndex={index} dailyWeekday={weekDay} />
			<div className='flex w-3/5 items-center'>
				<DailyListItemTemps temp={dayMinTemp} />
				<DailyListItem.GradientTempLine dayIndex={index} dailyTempCoords={dailyTempCoords} />
				<DailyListItemTemps temp={dayMaxTemp} />
			</div>
			<div className='flex w-1/5 justify-end'>
				<DailyListItem.WeatherIcon variant={'default'} icon={dayWeatherIcon} />
			</div>
		</DailyListItem.Container>
	);
};

// Assigning subcomponents to the main component for better structure and reusability.
DailyListItem.Container = DailyListItemContainer;
DailyListItem.Weekday = DailyListItemWeekday;
DailyListItem.Temps = DailyListItemTemps;
DailyListItem.GradientTempLine = DailyListItemGradientTempLine;
DailyListItem.WeatherIcon = StaticWeatherIcon;

export default DailyListItem;
