import classNames from 'classnames';
import { useAnimateAppearance } from '../../hooks/useAnimateAppearance';
import globalStyles from '../../utils.module.scss';
import styles from './Clouds.module.scss';

interface ICloudsParticlesProps {
	iconCode: string;
}

const CloudsDynamicIcon = ({ iconCode }: ICloudsParticlesProps) => {
	const visible = useAnimateAppearance();

	return (
		<svg
			className={classNames(
				styles.clouds__dynamic__icon,
				globalStyles.transition,
				visible ? globalStyles.v : globalStyles.u
			)}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 50 50'
		>
			<g className={styles.clouds}>
				<path
					fill={iconCode === '03' ? '#f7f7f7' : '#afafaf'}
					d='M42.4,23.14c0,2.16-1.92,3.94-4.29,3.94H13.61c-2.39-.14-4.27-1.96-4.27-4.21s2.04-4.21,4.55-4.21c.55,0,1.09,.08,1.6,.28h0c0-2.35,2.04-4.23,4.55-4.23,.59,0,1.15,.1,1.66,.3,.69-1.96,2.65-3.36,4.99-3.36,2.91,0,5.22,2.16,5.24,4.83,.4-.12,.83-.18,1.25-.18,1.98,0,3.66,1.25,4.13,2.93,.26-.04,.55-.08,.81-.08,2.37,0,4.29,1.78,4.29,3.96Z'
				/>
				<path
					fill={iconCode === '03' ? '#f2f2f2' : '#5f5f5f'}
					d='M46.92,28.76c0,2.99-2.45,5.44-5.46,5.44H10.26c-3.03-.18-5.44-2.71-5.44-5.8s2.59-5.78,5.78-5.78c.71,0,1.4,.12,2.02,.38v-.04c0-3.2,2.59-5.78,5.8-5.78,.75,0,1.48,.14,2.12,.4,.87-2.69,3.38-4.63,6.35-4.63,3.7,0,6.65,2.97,6.67,6.65,.51-.16,1.05-.24,1.6-.24,2.53,0,4.65,1.72,5.26,4.04,.32-.06,.69-.1,1.03-.1,3.01,0,5.46,2.45,5.46,5.46Z'
				/>
				<path
					fill={iconCode === '03' ? '#e9e9e9' : '#838383'}
					d='M44.86,33.5c0,2.46-2.18,4.48-4.87,4.48H12.15c-2.71-.16-4.85-2.23-4.85-4.78s2.32-4.78,5.17-4.78c.62,0,1.24,.09,1.82,.32h0c0-2.67,2.32-4.8,5.17-4.8,.67,0,1.31,.11,1.88,.34,.78-2.23,3.01-3.82,5.68-3.82,3.31,0,5.93,2.46,5.95,5.49,.46-.14,.94-.21,1.43-.21,2.25,0,4.16,1.43,4.69,3.33,.3-.05,.62-.09,.92-.09,2.69,0,4.87,2.02,4.87,4.51h-.02Z'
				/>
			</g>
		</svg>
	);
};

export default CloudsDynamicIcon;
