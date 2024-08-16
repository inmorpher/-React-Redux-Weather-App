import { IMoonPosition } from '../context/WeatherData.types';

export interface IUseMoonReturn {
	description: string;
	moonRise: string;
	moonSet: string;
	moonPhase: number;
}
/**
 * Calculates and provides information about the moon's phase and position.
 *
 * @param moon - An object containing moon position data.
 * @param moon.moonPhase - A number representing the current phase of the moon (0 to 1).
 * @param moon.formattedMoonRise - A string representing the formatted time of moonrise.
 * @param moon.formattedMoonSet - A string representing the formatted time of moonset.
 *
 * @returns An object containing:
 *   - description: A string describing the current moon phase.
 *   - moonRise: The formatted time of moonrise.
 *   - moonSet: The formatted time of moonset.
 *   - moonPhase: A number representing the moon phase as a percentage (0 to 75).
 */
export const useMoon = (moon?: IMoonPosition): IUseMoonReturn => {
	// if (!moon) return { description: 'N/A', moonRise: 'N/A', moonSet: 'N/A', moonPhase: 0 };
	const { moonPhase, formattedMoonRise, formattedMoonSet } = moon || {
		description: 'N/A',
		moonPhase: 1,
		formattedMoonRise: '',
		formattedMoonSet: '',
	};
	if (moonPhase === undefined || formattedMoonRise === undefined || formattedMoonSet === undefined)
		return { description: 'N/A', moonRise: 'N/A', moonSet: 'N/A', moonPhase: 0 };
	const moonPhaseDescriptions = {
		0: 'new moon',
		0.25: 'first quarter moon',
		0.5: 'full moon',
		0.75: 'last quarter moon',
	};

	let description = Object.entries(moonPhaseDescriptions).reduce((acc, [key, desc]) => {
		const phaseKey = parseFloat(key);
		if (moonPhase === phaseKey) return desc;
		return acc;
	}, '');

	if (!description) {
		description =
			moonPhase < 0.25 || (moonPhase > 0.75 && moonPhase < 1)
				? 'waxing crescent moon'
				: moonPhase < 0.5
					? 'waxing gibbous moon'
					: moonPhase < 0.75
						? 'waning gibbous moon'
						: 'waning crescent moon';
	}

	return {
		description,
		moonRise: formattedMoonRise,
		moonSet: formattedMoonSet,
		moonPhase: 75 - moonPhase * 100,
	};
};
