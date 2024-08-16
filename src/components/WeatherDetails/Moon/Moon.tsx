import { useGetMoonPosition } from '../../../context/WeatherData.context';
import { IMoonPosition } from '../../../context/WeatherData.types';
import { useMoon } from '../../../hooks/useMoon';
import Wrapper from '../../UI/Global/Wrapper';
import withLoading from '../../UI/WithLoading';
import MoonContent from './MoonContent';
import MoonIcon from './MoonIcon';

/**
 * Moon component for displaying moon phase and related information.
 *
 * This component renders the moon phase icon, description, and moon rise/set times.
 * It uses the useMoon hook to process the moon data and withLoading HOC to handle loading state.
 *
 * @param {Object} props - The component props.
 * @param {IMoonPosition} props.data - The moon position data.
 * @returns {JSX.Element} A React component displaying moon information.
 */
const Moon = ({ data: moon }: { data: IMoonPosition }) => {
	const { description, moonPhase, moonRise, moonSet } = useMoon(moon);

	return (
		<Moon.Wrapper className='relative flex min-w-full flex-1 flex-col'>
			<Moon.Wrapper className='flex  flex-1 items-center gap-4 pb-3'>
				<Moon.Icon moonPhase={moonPhase} aria-label='moon phase icon' />
				<Moon.Wrapper className='text-center text-sm'>
					{description ? description : 'N/A'}
				</Moon.Wrapper>
			</Moon.Wrapper>
			<Moon.Content moonRise={moonRise} moonSet={moonSet} />
		</Moon.Wrapper>
	);
};

Moon.Wrapper = Wrapper;
Moon.Icon = MoonIcon;
Moon.Content = MoonContent;

const MoonWithLoading = withLoading<{}, IMoonPosition>(Moon, useGetMoonPosition);

export { Moon, MoonWithLoading as MoonWithLoading };
export default MoonWithLoading;
