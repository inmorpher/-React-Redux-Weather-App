import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks.type';
import { selectLoadingStatus } from '../store/slices/weatherSlice';

export const useAnimateAppearance = () => {
	const [visible, setVisible] = useState(false);
	const isLoading = useAppSelector(selectLoadingStatus);
	useEffect(() => {
		const animationFrame = requestAnimationFrame(() => setVisible(true));
		return () => {
			cancelAnimationFrame(animationFrame);
		};
	}, [isLoading]);

	return visible;
};
