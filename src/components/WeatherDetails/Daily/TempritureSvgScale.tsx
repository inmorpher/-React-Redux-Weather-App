const TempritureSvgScale = () => {
	return (
		<svg
			width='135'
			height='7'
			viewBox='0 0 135 8'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			data-testid='temp-svg-scale'
		>
			<line x1='0' y1='4' x2='135' y2='4' stroke='#ADADAD' strokeWidth='2' strokeLinecap='round' />
			<line
				x1='40'
				y1='4'
				x2='50'
				y2='4'
				stroke='url(#temp-color-scale)'
				strokeWidth='4'
				strokeLinecap='round'
			/>
		</svg>
	);
};

export default TempritureSvgScale;
