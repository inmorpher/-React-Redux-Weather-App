import globalStyles from '../../../utils.module.scss';
import styles from './Loader.module.scss';

const Loader = () => {
	const loaderStyles = `${styles.loader__wrapper} ${globalStyles.flex} ${globalStyles.flex__center} ${globalStyles.flex__align__center}`;

	return (
		<div className={loaderStyles}>
			<svg viewBox='0 0 40 40'>
				<g>
					<circle cx='18' cy='20' r='0.5' stroke='#fff' strokeWidth='.5' />
					<circle cx='20' cy='20' r='0.5' stroke='#fff' strokeWidth='.5' />
					<circle cx='22' cy='20' r='0.5' stroke='#fff' strokeWidth='.5' />
				</g>
			</svg>
		</div>
	);
};

export default Loader;
