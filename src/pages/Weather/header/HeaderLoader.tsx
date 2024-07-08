/**
 * `HeaderLoader` is a functional component that renders a placeholder skeleton for a header.
 * It uses Tailwind CSS classes for styling, including animation to simulate content loading.
 * This component is typically used to display a loading state while the actual header content is being fetched or generated.
 *
 * @returns A React fragment (`<>...</>`) containing three `div` elements styled as animated placeholders.
 */
const HeaderLoader = () => {
	return (
		<div role='header_loader'>
			<div className='bg-weather-bg-900 ml-4 h-1/2 w-2/4 animate-pulse rounded-xl'></div>
			<div className='bg-weather-bg-900 h-1/2 w-1/3 animate-pulse rounded-xl'></div>
			<div className=' bg-weather-bg-900 mr-4 aspect-square w-7 animate-pulse rounded-full'></div>
		</div>
	);
};

export default HeaderLoader;
