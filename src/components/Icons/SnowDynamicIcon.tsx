import classNames from 'classnames';
import globalStyles from '../../utils.module.scss';
import styles from './SnowDynamicIcon.module.scss';

const SnowDynamicIcon = () => {
	const snowFlakes = [];
	for (let i = 0; i < 30; i++) {
		const cx = 7 + (40 / 30) * i;
		snowFlakes.push({
			cx,
			cy: -1,
			r: Math.random() * 0.5 + 0.5,
		});
	}

	return (
		<svg
			className={classNames(styles.snow__dynamic__icon, globalStyles.transition)}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 50 50'
			data-testid='snow-dynamic-icon'
		>
			<g className={styles.snow__flakes}>
				{snowFlakes &&
					snowFlakes.map((elem, index) => {
						return (
							<circle
								key={index + 'snow__flake'}
								cx={elem.cx}
								cy={elem.cy}
								r={elem.r}
								fill='white'
							/>
						);
					})}
			</g>
		</svg>
	);
};

export default SnowDynamicIcon;
