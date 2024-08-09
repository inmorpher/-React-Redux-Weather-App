const Skeleton = () => {
	return (
		<div
			className='w-[95%] h-[95%] bg-weather-bg-900 rounded-lg animate-pulse m-2'
			role='loader'
		></div>
	);
};

export default Skeleton;
