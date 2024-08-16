import { useGetPressureInfo } from '../../../context/WeatherData.context';

import { IPressureDefinition } from '../../../utils/services/definitions/pressure.definition';
import Wrapper from '../../UI/Global/Wrapper';
import withLoading from '../../UI/WithLoading';
import PressureIndicator from './PressureIndicator';
/**
 * Renders a component that displays pressure information.
 *
 * @param {Object} props - The component props.
 * @param {IPressureDefinition} props.data - The pressure data object.
 * @param {Object} props.data.coords - The coordinates for the pressure indicator.
 * @param {number} props.data.angle - The angle for the pressure indicator.
 * @param {number} props.data.pressure - The pressure value in hPa.
 * @returns {JSX.Element} A React component that displays the pressure information.
 */
const Pressure = ({ data: { coords, angle, pressure } }: { data: IPressureDefinition }) => {
	return (
		<Pressure.Wrapper className='relative flex flex-1 flex-col'>
			<Pressure.Wrapper className='flex items-center justify-center'>
				<Pressure.Indicator coords={coords} angle={angle} />
			</Pressure.Wrapper>
			<Pressure.Wrapper
				className='flex flex-1 flex-col justify-end text-center text-sm'
				role='presentation'
			>
				{pressure !== undefined ? `${pressure}hpa` : 'N/A'}
			</Pressure.Wrapper>
		</Pressure.Wrapper>
	);
};

Pressure.Wrapper = Wrapper;
Pressure.Indicator = PressureIndicator;

const PressureWithLoading = withLoading<{}, IPressureDefinition>(Pressure, useGetPressureInfo);
export { Pressure, PressureWithLoading as PressureWithLoading };

export default PressureWithLoading;
