import { MetricType } from '../../../context/Metric.context';

export const getMetricTempriture = (value: number, metric: MetricType) =>
	metric === 'metric' ? Math.round(value - 273.15) : Math.round(((value - 273.15) * 9) / 5 + 32);
