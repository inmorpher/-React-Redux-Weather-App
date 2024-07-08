import { MetricReturnType } from '../../../../utils/services/converter/metric.converter';

// Interface for props passed to the DailyListItemTemps component
export interface IDailyListItemTempsProps {
	// Temperature value and units as a MetricReturnType object
	temp: MetricReturnType;
}

// Functional component that renders a temperature value and units
const DailyListItemTemps = ({ temp }: IDailyListItemTempsProps) => {
	return (
		// Span element with a width of 1/6 of the container
		<span className='w-1/6'>
			{/* Render the temperature value */}
			{temp.value}
			{/* Render the temperature units */}
			{temp.units}
		</span>
	);
};

// Export the DailyListItemTemps component as the default export
export default DailyListItemTemps;
