import { UserUnits } from '../../../store/slices/userSlice';

export const getMetricTempriture = (value: number, metric: UserUnits) =>
	metric === 'metric' ? Math.round(value - 273.15) : Math.round(((value - 273.15) * 9) / 5 + 32);
