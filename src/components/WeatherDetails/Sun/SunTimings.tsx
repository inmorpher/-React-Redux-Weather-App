export interface ISunTimingsProps {
	sunrise: string;
	sunset: string;
	isDay: boolean;
}

/**
 * A functional component that displays sunrise and sunset times.
 * It conditionally reverses the order of display based on whether it is day or night.
 *
 * @param {ISunTimingsProps} props - The props object containing sunrise, sunset times, and day/night indicator.
 * @returns {JSX.Element} The JSX code for displaying sunrise and sunset times.
 */
const SunTimings = ({ sunrise, sunset, isDay }: ISunTimingsProps) => {
	return (
		<div className={`flex justify-between pb-[0.13rem] ${!isDay && 'flex-row-reverse'}`}>
			<span className='relative text-center text-xs before:absolute before:left-2/4 before:top-0 before:origin-center before:translate-x-[-50%] before:translate-y-[-100%] before:content-["↑↑"]'>
				{sunrise}
			</span>
			<span className='relative text-center text-xs before:absolute before:left-2/4 before:top-0 before:origin-center before:translate-x-[-50%] before:translate-y-[-100%] before:content-["↓↓"]'>
				{sunset}
			</span>
		</div>
	);
};

export default SunTimings;
