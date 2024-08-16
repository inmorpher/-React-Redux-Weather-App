import { useGetVisibilityInfo } from '../../../context/WeatherData.context';
import { IVisibilityReturn } from '../../../utils/services/definitions/visibility.definition';
import SpanText from '../../UI/Global/SpanText';
import Wrapper from '../../UI/Global/Wrapper';
import withLoading from '../../UI/WithLoading';
import VisibilityIcon from './VisibilityIcon';

/**
 * Renders a component displaying visibility information.
 *
 * @param {Object} props - The component props.
 * @param {IVisibilityReturn} props.data - The visibility data to display.
 * @param {string} props.data.distance - The visibility distance.
 * @param {string} props.data.range - The visibility range description.
 * @returns {JSX.Element} A React component displaying the visibility information.
 */
const Visibility = ({ data: { distance, range } }: { data: IVisibilityReturn }) => {
	return (
		<Visibility.Wrapper className='relative flex flex-1 flex-col'>
			<Visibility.Wrapper className='flex flex-1 items-end gap-4'>
				<Visibility.Icon />
				<Visibility.Text className='text-[2rem] leading-[2.5rem]'>
					{typeof distance === 'string' && distance.length > 0 ? distance : '0'}
				</Visibility.Text>
			</Visibility.Wrapper>
			<Visibility.Wrapper className='flex flex-1 flex-col justify-end text-center text-sm'>
				{typeof range === 'string' && range.length > 0 ? range : 'N/A'}
			</Visibility.Wrapper>
		</Visibility.Wrapper>
	);
};

Visibility.Wrapper = Wrapper;
Visibility.Text = SpanText;
Visibility.Icon = VisibilityIcon;

const VisibilityWithLoading = withLoading<{}, IVisibilityReturn>(Visibility, useGetVisibilityInfo);
export { Visibility, VisibilityWithLoading };

export default VisibilityWithLoading;
