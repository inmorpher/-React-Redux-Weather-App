import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const AnimatedComponent = () => {
	const [isMounted, setIsMounted] = useState(false);

	const handleToggle = () => {
		setIsMounted(!isMounted);
	};

	return (
		<div>
			<button onClick={handleToggle}>Toggle Component</button>
			<CSSTransition in={isMounted} timeout={300} classNames='fade' unmountOnExit>
				<div className='animated-content'>animate</div>
			</CSSTransition>
		</div>
	);
};

export default AnimatedComponent;
