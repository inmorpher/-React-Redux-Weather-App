import { useControls } from '../../hooks/useControls';
import Button from '../UI/Button';
import ControlToggler from '../UI/ControlToggler';

const Controls = () => {
	const {
		theme,
		units,
		timeLastUpdate,
		toggleMetricHandler,
		toggleThemeHandler,
		onUpdateHandler,
	} = useControls();

	return (
		<div className='text-sm'>
			<Button
				variant='default'
				className='w-full text-center'
				size='text'
				onClick={onUpdateHandler}
			>
				updated at {timeLastUpdate}
			</Button>
			<div className='flex justify-center gap-10'>
				<ControlToggler variant={'metric'} onClick={toggleMetricHandler} units={units} />
				<ControlToggler variant={'theme'} onClick={toggleThemeHandler} theme={theme} />
			</div>
		</div>
	);
};

export default Controls;
