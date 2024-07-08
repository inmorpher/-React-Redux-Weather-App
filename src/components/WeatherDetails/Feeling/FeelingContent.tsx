/**
 * Interface defining the properties for FeelingContent component.
 * @property {Object} temp - An object containing the temperature value and its units.
 * @property {number} temp.value - The numerical value of the temperature.
 * @property {string} temp.units - The units of the temperature value (e.g., "C" for Celsius, "F" for Fahrenheit).
 */
export interface IFeelingContentProps {
	temp: { value: number; units: string };
}

/**
 * FeelingContent component displays the temperature with its units.
 *
 * This component takes a `temp` object as a prop, which includes both the temperature value
 * and its units, and renders them within a styled <span> element.
 *
 * @param {IFeelingContentProps} props - The props object containing the temperature information.
 * @returns A React functional component that returns a <span> element displaying the temperature and its units.
 */
const FeelingContent = ({ temp }: IFeelingContentProps) => {
	return (
		<span className='gap-4 text-[2rem] leading-[2.5rem]'>
			{temp.value}
			{temp.units}
		</span>
	);
};

export default FeelingContent;
