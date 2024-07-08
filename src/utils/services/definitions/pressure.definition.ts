/**
 * Calculates the pressure definition for a given pressure value and generates coordinates for a graphical representation.
 * This function is designed to work with a gauge that visualizes pressure levels.
 *
 * @param pressure The atmospheric pressure value to be represented.
 * @param lines The number of lines to generate for the graphical representation. Defaults to 30.
 * @returns An object containing the original pressure value, the calculated angle for the needle of the gauge,
 *          and an array of coordinates for drawing the lines of the gauge.
 */
export const pressureDefinition = (pressure: number, lines = 30) => {
	const cx = 80; // Center x-coordinate of the gauge
	const cy = 70; // Center y-coordinate of the gauge
	const radius = 60; // Radius of the gauge
	const minPressure = 850; // Minimum pressure value represented on the gauge
	const maxPressure = 1100; // Maximum pressure value represented on the gauge
	const range = maxPressure - minPressure; // The range of pressure values represented on the gauge
	const startAngle = -105; // Starting angle for the gauge's needle
	const scaleStep = range / (startAngle * 2); // Step value for the scale based on the range and start angle
	const calcPressure = startAngle - (pressure - minPressure) / scaleStep; // Calculated angle for the given pressure

	// Generates coordinates for the lines of the gauge
	const coords = Array.from({ length: lines }).map((_, index) => {
		const angle = (index / lines) * 380; // Angle for each line
		const radians = (angle + 91.5 * Math.PI) / 100; // Convert angle to radians
		return {
			x1: cx + radius * Math.cos(radians), // Starting x-coordinate of the line
			y1: cy + radius * Math.sin(radians), // Starting y-coordinate of the line
			x2: cx + (radius - 15) * Math.cos(radians), // Ending x-coordinate of the line
			y2: cy + (radius - 15) * Math.sin(radians), // Ending y-coordinate of the line
		};
	});

	return {
		pressure: pressure, // The original pressure value
		angle: calcPressure, // The calculated angle for the gauge's needle
		coords, // The array of coordinates for the gauge's lines
	};
};
