const Skeleton = () => {
	return (
		<div className='relative flex h-full w-full flex-col overflow-hidden'>
			<div className='flex items-center gap-4 p-1'>
				<div className='w-1/3 rounded-full bg-black/[.50]' />
				<div className='h-[10%] w-[55%] rounded-xl bg-black/[.50]' />
			</div>
			<div className='h-1/5 w-full rounded bg-black/[.50]' />
		</div>
	);
};

export default Skeleton;
