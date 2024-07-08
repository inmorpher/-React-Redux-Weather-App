import { ScaleReturn } from '../../../utils/services/definitions/svgScale.definition';

/**
 * Interface representing the properties for the UVContent component.
 */
export interface IUVContentProps {
	/**
	 * The UVI (Ultraviolet Index) data, which includes values such as color, value, and level.
	 */
	uvi: ScaleReturn;
}

/**
 * UVContent component displays the Ultraviolet Index (UVI) information.
 *
 * @param {IUVContentProps} props - The properties for the component.
 * @param {ScaleReturn} props.uvi - The UVI data to be displayed.
 * @returns {JSX.Element} The JSX element representing the UVI content.
 */
const UVContent = ({ uvi }: IUVContentProps): JSX.Element => {
	return (
		<>
			<span
				className='text-[2.5rem] leading-[2.5rem]'
				style={{ color: uvi.values?.color || '#fff' }}
			>
				{uvi.values?.value}
			</span>
			<span className='leading-[2.5rem]'>{uvi.values?.level || 0}</span>
		</>
	);
};

export default UVContent;
