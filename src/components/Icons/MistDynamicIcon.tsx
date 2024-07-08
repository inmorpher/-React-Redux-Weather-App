import classNames from 'classnames';
import { useAnimateAppearance } from '../../hooks/useAnimateAppearance';
import globalStyles from '../../utils.module.scss';
import styles from './MistDynamicIcon.module.scss';

const MistDynamicIcon = () => {
	const visible = useAnimateAppearance();

	return (
		<svg
			className={classNames(
				styles.mist__dynamic__icon,
				globalStyles.transition,
				visible ? globalStyles.v : globalStyles.u
			)}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 50 50'
		>
			<g className={styles.mist}>
				<circle fill='#b8b9b9' cx='12.92' cy='23.82' r='6.56' />
				<circle fill='#b8b9b9' cx='19.84' cy='19.11' r='6.92' />
				<circle fill='#b8b9b9' cx='27.73' cy='21.76' r='6.92' />
				<circle fill='#b8b9b9' cx='35.59' cy='19.73' r='7.25' />
				<circle fill='#b8b9b9' cx='41.21' cy='28.68' r='5.61' />
				<circle fill='#b8b9b9' cx='31.48' cy='31.05' r='6.28' />
				<circle fill='#b8b9b9' cx='23.11' cy='33.26' r='6.28' />
				<circle fill='#b8b9b9' cx='18.66' cy='28.02' r='6.28' />
			</g>
		</svg>
	);
};

export default MistDynamicIcon;
