import { useAppSelector } from '../store/hooks.type';

export const useTempritureMetrics = (value: number | undefined): string | undefined => {
	const metric = useAppSelector((state) => state.user.data.userMetrics);

	if (!value) {
		return undefined;
	}

	if (metric === 'imperial') {
		return `${Math.round(((value - 273.15) * 9) / 5 + 32)}°`;
	} else {
		return `${Math.round(value - 273.15)}°`;
	}
};
