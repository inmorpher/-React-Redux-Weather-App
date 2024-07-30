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

export const useMetric = (): MetricContextType => {
	const context = useContext(MetricContext);
	if (!context) {
		throw new Error('useMetric must be used within a MetricProvider');
	}
	return context;
};
