import classNames from 'classnames';
import { useAnimateAppearance } from '../../hooks/useAnimateAppearance';
import globalStyles from '../../utils.module.scss';
import styles from './CleatCloudy.module.scss';

interface IWeatherIconsProps {
	timeOfDay: string;
	iconCode: string;
}

const ClearCloudyDynamicIcon = ({ timeOfDay, iconCode }: IWeatherIconsProps) => {
	const visible = useAnimateAppearance();

	const sunShape = (
		<>
			<defs>
				<radialGradient id='myGradient' cx='50%' cy='50%' r='100%' fx='50%' fy='50%'>
					<stop offset='40%' stopColor='#ffffff' />
					<stop offset='47%' stopColor='#ffff' stopOpacity={0} />
				</radialGradient>
			</defs>
			<g className={styles.sun}>
				<circle className={styles.sun__shine} cx='25' cy='25' fill='url(#myGradient)' />
				<circle className={styles.sun__disk} cx='25' cy='25' fill='#fff' />
			</g>
		</>
	);

	const moonShape = (
		<g className={styles.moon__icon}>
			<path
				className={styles.moon__icon__shape}
				fill='#fff'
				d='M37.2,40.27c-2.96,1.81-6.5,2.87-10.32,2.87-10.38,0-18.79-7.8-18.79-17.42,0-8.21,6.12-15.09,14.36-16.93-5.1,3.11-8.47,8.46-8.47,14.55,0,9.62,8.41,17.43,18.79,17.43,1.53,0,3.01-.17,4.43-.5Z'
			/>
			<g className={styles.moon__icon__stars}>
				<circle cx='20.15' cy='15.06' r='0' fill='#fff' />
				<circle cx='32.81' cy='12.73' r='0' fill='#fff' />
				<circle cx='32.82' cy='30.26' r='0' fill='#fff' />
				<circle cx='21.41' cy='24.58' r='0' fill='#fff' />
			</g>
		</g>
	);

	const cloudsShape = (
		<g className={styles.clouds__icon}>
			<path
				fill='#f7f7f7'
				d='M38.42,34.42c0,2.16-1.89,3.92-4.23,3.92H12.64c-3.83,0-6.92-3.17-6.92-7.03s3.1-7,6.92-7c.42,0,.84,.03,1.23,.11-.03-.13-.03-.29-.03-.43,0-3.54,2.83-6.44,6.3-6.44s6.33,2.87,6.33,6.42c0,.21,0,.4-.03,.61,.63-.4,1.39-.61,2.21-.61,2.47,0,4.46,2.02,4.46,4.52,0,.88-.24,1.68-.68,2.37,.52-.24,1.1-.37,1.74-.37,2.33,0,4.23,1.76,4.23,3.92l.03,.03h0Z'
			/>
			<path
				fill='#f2f2f2'
				d='M38.42,36.36c0,2.03-1.78,3.69-3.98,3.69H14.13c-3.61,0-6.52-2.98-6.52-6.62s2.92-6.6,6.52-6.6c.4,0,.79,.02,1.16,.1-.02-.13-.02-.28-.02-.4,0-3.33,2.67-6.07,5.94-6.07s5.96,2.71,5.96,6.05c0,.2,0,.37-.02,.58,.6-.37,1.31-.58,2.08-.58,2.33,0,4.21,1.9,4.21,4.26,0,.83-.22,1.58-.64,2.23,.49-.22,1.04-.35,1.64-.35,2.2,0,3.98,1.66,3.98,3.69l.02,.02h0Z'
			/>
			<path
				fill='#e9e9e9'
				d='M6.72,38.08l.02-.02c0-1.92,1.69-3.48,3.76-3.48,.56,0,1.08,.12,1.54,.33-.4-.61-.61-1.33-.61-2.11,0-2.22,1.78-4.02,3.97-4.02,.73,0,1.4,.19,1.96,.55-.02-.19-.02-.36-.02-.55,0-3.15,2.54-5.71,5.63-5.71s5.6,2.58,5.6,5.73c0,.12,0,.26-.02,.38,.34-.07,.72-.1,1.09-.1,3.4,0,6.16,2.79,6.16,6.23s-2.75,6.25-6.16,6.25H10.49c-2.08,0-3.76-1.57-3.76-3.48h0Z'
			/>
		</g>
	);
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 50 50'
			className={classNames(
				styles.clear__cloudy__dynamic__icon,
				globalStyles.transition,
				visible ? globalStyles.v : globalStyles.u
			)}
		>
			{timeOfDay == 'night' ? moonShape : sunShape}
			{iconCode == '02' && cloudsShape}
		</svg>
	);
};

export default ClearCloudyDynamicIcon;
