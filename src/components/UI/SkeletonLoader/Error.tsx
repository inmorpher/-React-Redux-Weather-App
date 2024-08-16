const ErrorElement = () => {
	return (
		<svg
			width='100'
			height='100'
			viewBox='0 0 100 100'
			xmlns='http://www.w3.org/2000/svg'
			role='img'
			aria-label='error-placeholder'
		>
			<circle cx='50' cy='50' r='40' fill='#b0bec5' stroke='#90a4ae' strokeWidth='3' />
			<circle cx='35' cy='40' r='5' fill='#000' />
			<circle cx='65' cy='40' r='5' fill='#000' />
			<path d='M 30 60 Q 50 70, 70 60' stroke='#000' strokeWidth='2' fill='none' />

			<line x1='20' y1='30' x2='80' y2='70' stroke='#ff5722' strokeWidth='3' />
		</svg>
	);
};

export default ErrorElement;
