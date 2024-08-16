import { useEffect, useRef } from 'react';

interface CurveProps {
	mainCurve: string;
	backCurve?: string;
}
//TODO figure with useEffect for curve
const CurveComponent = ({ mainCurve, backCurve }: CurveProps) => {
	const pathRef = useRef<SVGPathElement>(null);

	useEffect(() => {
		if (pathRef.current) {
			const pathLength = pathRef.current.getTotalLength().toString();
			pathRef.current.style.setProperty('--path', pathLength);
		}
	}, [mainCurve]);

	return (
		<svg>
			<g data-testid='precipitation-curve'>
				{typeof mainCurve === 'string' && (
					<>
						{typeof backCurve === 'string' && backCurve.length && (
							<path
								className='precipitation_back_path'
								d={backCurve || '0'}
								fill='url(#verticalGradient)'
								mask='url(#mask)'
								data-testid='back-path'
							/>
						)}
						<path
							// ref={pathRef}
							className='precipitation_path'
							d={mainCurve || '0'}
							strokeLinejoin='round'
							strokeLinecap='round'
							fill='none'
							strokeWidth={3}
							stroke='url(#verticalGradient)'
							data-testid='main-path'
						/>
					</>
				)}
			</g>
		</svg>
	);
};

export default CurveComponent;
