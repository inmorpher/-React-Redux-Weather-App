import { useGetFeelsLikeInfo } from '../../../context/WeatherData.context';
import { IFeelsLikeInfo } from '../../../context/WeatherData.types';
import Wrapper from '../../UI/Global/Wrapper';
import withLoading from '../../UI/WithLoading';
import FeelingContent from './FeelingContent';
import FeelingIcon from './FeelingIcon';

/**
 * Renders a component displaying weather feeling information.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {IFeelsLikeInfo} props.data - The weather feeling data object.
 * @param {number} props.data.temperature - The actual temperature value.
 * @param {string} props.data.feelsLike - Description of how the temperature feels.
 * @returns {JSX.Element} A React component that displays the weather feeling information,
 * including an icon, temperature content, and a description of how it feels.
 */
const Feeling = ({ data: { temperature, feelsLike } }: { data: IFeelsLikeInfo }) => {
	return (
		<Feeling.Wrapper className='relative flex flex-1 flex-col'>
			<Feeling.Wrapper className='flex flex-1 items-end gap-4'>
				<Feeling.Icon />
				<Feeling.Content temp={temperature} />
			</Feeling.Wrapper>
			<Feeling.Wrapper className='flex flex-1 flex-col justify-end text-center text-sm'>
				{feelsLike}
			</Feeling.Wrapper>
		</Feeling.Wrapper>
	);
};

Feeling.Wrapper = Wrapper;
Feeling.Icon = FeelingIcon;
Feeling.Content = FeelingContent;

export default withLoading(Feeling, useGetFeelsLikeInfo);
