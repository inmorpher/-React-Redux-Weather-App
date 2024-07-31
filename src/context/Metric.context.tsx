import { createContext, useContext, useEffect, useState } from 'react';

export type MetricType = 'metric' | 'imperial';

export interface IUserMetric {
	version: number;
	metricType: MetricType;
}

interface MetricContextType extends IUserMetric {
	toggleMetric: () => void;
}

const METRIC_VERSION = 1 as const;

const MetricContext = createContext<MetricContextType | undefined>(undefined);

/**
 * MetricProvider is a context provider component that manages the user's metric preferences.
 * It provides the current metric type and a function to toggle between metric and imperial units.
 *
 * @param children - The child components that will have access to the metric context.
 * @returns A context provider component that supplies the current metric state and a toggle function.
 */
export const MetricProvider = ({ children }: { children: React.ReactNode }) => {
	const [metric, setMetric] = useState<IUserMetric>(() => {
		const savedMetric = localStorage.getItem('metricData');
		if (savedMetric) {
			const parsedMetric = JSON.parse(savedMetric);
			if (parsedMetric.version === METRIC_VERSION) {
				return parsedMetric;
			}
		}
		return { version: METRIC_VERSION, metricType: 'metric' };
	});

	useEffect(() => {
		localStorage.setItem('metricData', JSON.stringify(metric));
	}, [metric]);

	const toggleMetric = () => {
		setMetric((prevMetric) => ({
			...prevMetric,
			metricType: prevMetric.metricType === 'metric' ? 'imperial' : 'metric',
		}));
	};

	return (
		<MetricContext.Provider value={{ ...metric, toggleMetric }}>{children}</MetricContext.Provider>
	);
};

/**
 * useMetric is a custom hook that provides access to the metric context.
 * It throws an error if used outside of a MetricProvider.
 *
 * @returns The current metric state and a function to toggle the metric type.
 */
export const useMetric = (): MetricContextType => {
	const context = useContext(MetricContext);
	if (!context) {
		throw new Error('useMetric must be used within a MetricProvider');
	}
	return context;
};
