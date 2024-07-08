export type MetricValue = 'metric' | 'imperial';

export type MetricReturnType = {
	value: number;
	units: string;
};
export type UnitsValue = 'none' | 'short' | 'full';

/**
 * A class for converting metric values between imperial and metric systems.
 */
export class MetricConverter {
	/**
	 * Validates the input arguments for metric conversion methods.
	 * @param value The numeric value to be converted.
	 * @param metric The metric system to convert to ('metric' or 'imperial').
	 * @throws Will throw an error if the value is not a number or if the metric system is invalid.
	 */
	private static argsCheck(value: number, metric: MetricValue): void {
		if (typeof value !== 'number') {
			throw new Error(
				`Value error: Expected a number but received ${typeof value}. Please use NUMBER.`,
			);
		}
		if (!metric || (metric !== 'imperial' && metric !== 'metric')) {
			throw new Error(
				`Metric type error: "${metric}" is not a valid metric. Please use "metric" or "imperial".`,
			);
		}
	}

	/**
	 * Calculates the temperature in the specified metric system.
	 * @param value The temperature value to convert from Kelvin.
	 * @param metric The metric system to convert to ('metric' or 'imperial').
	 * @param units The unit display preference ('none', 'short', 'full').
	 * @returns An object containing the converted temperature value and its unit.
	 */
	private static calcTemp(
		value: number,
		metric: MetricValue,
		units: UnitsValue = 'none',
	): MetricReturnType {
		if (metric === 'imperial') {
			return {
				value: Math.round(((value - 273.15) * 9) / 5 + 32),
				units:
					units === 'full' ? '°F' : units === 'short' ? '°' : units === 'none' ? '' : '',
			};
		} else if (metric === 'metric') {
			return {
				value: Math.round(value - 273.15),
				units:
					units === 'full' ? '°C' : units === 'short' ? '°' : units === 'none' ? '' : '',
			};
		} else {
			throw new Error('Metric type unknown or missing. Use "metric" or "imperial"');
		}
	}

	/**
	 * Calculates the speed in the specified metric system.
	 * @param value The speed value to convert.
	 * @param metric The metric system to convert to ('metric' or 'imperial').
	 * @param units Whether to display units or not.
	 * @returns An object containing the converted speed value and its unit.
	 */
	private static calcSpeed(value: number, metric: MetricValue, units = false): MetricReturnType {
		if (metric === 'imperial') {
			return {
				value: Number((value * 2.23694).toFixed(1)),
				units: units ? 'mph' : '',
			};
		} else if (metric === 'metric') {
			return {
				value: value,
				units: units ? 'm/s' : '',
			};
		} else {
			throw new Error('Metric type unknown or missing. Use "metric" or "imperial"');
		}
	}

	/**
	 * Public method to get the temperature in the specified metric system.
	 * @param value The temperature value to convert from Kelvin.
	 * @param metric The metric system to convert to ('metric' or 'imperial').
	 * @param units The unit display preference ('none', 'short', 'full').
	 * @returns An object containing the converted temperature value and its unit.
	 */
	static getTemp(
		value: number,
		metric: MetricValue,
		units: UnitsValue = 'none',
	): MetricReturnType {
		this.argsCheck(value, metric);

		return this.calcTemp(value, metric, units);
	}

	/**
	 * Public method to get temperatures for an array of values in the specified metric system.
	 * @param value An array of temperature values to convert from Kelvin.
	 * @param metric The metric system to convert to ('metric' or 'imperial').
	 * @param units The unit display preference ('none', 'short', 'full').
	 * @returns An array of objects, each containing a converted temperature value and its unit.
	 */
	static getTemps(
		value: number[],
		metric: MetricValue,
		units: UnitsValue = 'none',
	): MetricReturnType[] {
		return value.map((item) => this.calcTemp(item, metric, units));
	}

	/**
	 * Public method to get the speed in the specified metric system.
	 * @param value The speed value to convert.
	 * @param metric The metric system to convert to ('metric' or 'imperial').
	 * @param units Whether to display units or not.
	 * @returns An object containing the converted speed value and its unit.
	 */
	static getSpeed(value: number, metric: MetricValue, units = false): MetricReturnType {
		this.argsCheck(value, metric);

		return this.calcSpeed(value, metric, units);
	}
}
