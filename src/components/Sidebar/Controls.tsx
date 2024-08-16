import { useMetric } from '../../context/Metric.context';
import { useTheme } from '../../context/Theme.context';
import ControlToggler from '../UI/ControlToggler';
import Wrapper from '../UI/Global/Wrapper';

/**
 * Controls component for managing theme and metric toggles.
 *
 * This component renders two control togglers:
 * 1. A metric toggler to switch between different metric types.
 * 2. A theme toggler to switch between different theme modes.
 *
 * It uses the useMetric and useTheme hooks to access and modify the metric and theme states.
 *
 * @returns {JSX.Element} A React component that displays metric and theme togglers.
 */
const Controls = () => {
	const { toggleTheme, mode } = useTheme();
	const { toggleMetric, metricType } = useMetric();

	return (
		<Controls.Wrapper
			className='flex justify-center gap-10 text-sm'
			role='option'
			aria-label='controls'
		>
			<Controls.Toggler
				variant={'metric'}
				onClick={toggleMetric}
				units={metricType}
				role='button'
				aria-label='button-metric'
			/>
			<Controls.Toggler
				variant={'theme'}
				onClick={toggleTheme}
				theme={mode}
				role='button'
				aria-label='button-theme'
			/>
		</Controls.Wrapper>
	);
};

Controls.Wrapper = Wrapper;
Controls.Toggler = ControlToggler;

export default Controls;
