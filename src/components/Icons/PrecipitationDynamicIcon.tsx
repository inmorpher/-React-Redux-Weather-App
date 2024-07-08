import classNames from 'classnames';
import { useAnimateAppearance } from '../../hooks/useAnimateAppearance';
import globalStyles from '../../utils.module.scss';
import styles from './Particles.module.scss';

interface ICloudsParticlesProps {
	iconCode: string;
}

interface IParticles {
	x1: number;
	y1: number;
	y2: number;
}

const PrecipitationDynamicIcon = ({ iconCode }: ICloudsParticlesProps) => {
	const visible = useAnimateAppearance();

	const particlesCount = 15;
	const particleLength = iconCode == '10' ? 2 : 4;
	const particles: IParticles[] = [];
	for (let i = 0; i < particlesCount; i++) {
		const x1 = 8 + (40 / particlesCount) * i;
		const y1 = 27;
		const y2 = y1 + particleLength;
		particles.push({
			x1,
			y1,
			y2,
		});
	}

	return (
		<svg
			className={classNames(
				styles.precipitation__dynamic__icon,
				globalStyles.transition,
				visible ? globalStyles.v : globalStyles.u
			)}
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 50 50'
		>
			<defs>
				<radialGradient id='radial-gradient' cx='50%' cy='50%' r='100%' fx='50%' fy='50%'>
					<stop offset='0' stopColor='#ffffff' />
					<stop offset='35%' stopColor='#ffffff' stopOpacity={0} />
				</radialGradient>
			</defs>
			<g className={`${styles.particles} ${iconCode === '10' ? styles.rain : styles.shower}`}>
				{particles.length &&
					particles.map((elem, index) => {
						return (
							<line
								key={index}
								x1={elem.x1}
								y1={elem.y1}
								x2={elem.x1}
								y2={elem.y2}
								strokeLinecap='round'
								stroke='white'
								strokeWidth={0.5}
							/>
						);
					})}
			</g>
			<g className={styles.clouds}>
				<path
					fill='#afafaf'
					d='M44.28,23.03c0,2.66-2.11,4.85-4.7,4.85H13.02l-.3-.02c-2.61-.14-4.68-2.4-4.68-5.16s2.23-5.16,4.98-5.16c.61,0,1.2,.11,1.74,.35v-.04c0-2.85,2.23-5.16,5-5.16,.65,0,1.27,.12,1.83,.36,.75-2.4,2.91-4.12,5.47-4.12,3.19,0,5.73,2.64,5.75,5.92,.43-.14,.91-.22,1.38-.22,2.17,0,4,1.53,4.53,3.6,.28-.06,.59-.09,.89-.09,2.6,0,4.7,2.18,4.7,4.87l-.02,.02Z'
				/>
				{iconCode === '11' && (
					<circle className={styles.spark} fill='url(#radial-gradient' cx='18' cy='22' r='11' />
				)}
				<path
					fill='#5f5f5f'
					d='M31.66,28.62c0,1.93-1.65,3.52-3.69,3.52H6.88c-2.05-.12-3.67-1.75-3.67-3.75s1.75-3.74,3.91-3.74c.48,0,.95,.07,1.37,.24v-.03c0-2.06,1.75-3.74,3.92-3.74,.51,0,.99,.09,1.43,.26,.59-1.73,2.28-2.99,4.29-2.99,2.5,0,4.5,1.92,4.51,4.3,.34-.1,.71-.16,1.08-.16,1.71,0,3.14,1.12,3.55,2.62,.22-.04,.47-.07,.69-.07,2.03,0,3.69,1.58,3.69,3.52h0Z'
				/>
				{iconCode === '11' && (
					<circle className={styles.spark} fill='url(#radial-gradient' cx='28' cy='20' r='11' />
				)}
				<path
					fill='#838383'
					d='M49.06,27.7c0,2.33-2,4.25-4.45,4.25H19.4l-.28-.02c-2.47-.12-4.44-2.1-4.44-4.52s2.11-4.52,4.72-4.52c.58,0,1.13,.09,1.65,.3v-.03c0-2.49,2.11-4.52,4.73-4.52,.61,0,1.21,.11,1.73,.32,.71-2.1,2.76-3.62,5.18-3.62,3.02,0,5.43,2.32,5.45,5.19,.41-.12,.86-.19,1.3-.19,2.06,0,3.8,1.34,4.29,3.16,.26-.05,.56-.07,.84-.07,2.46,0,4.45,1.91,4.45,4.27h0Z'
				/>
			</g>
		</svg>
	);
};

export default PrecipitationDynamicIcon;
