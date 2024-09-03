import { vi } from 'vitest';
import { PrecipitationService } from './precipitation.service';
import { PrecipitationData } from './types';

vi.mock('../time/time.service', () => ({
	TimeService: vi.fn().mockImplementation(() => ({
		getTime: vi.fn().mockReturnValue({ result: () => '12:00' }),
	})),
}));

describe('PrecipitationService', () => {
	test('should return correct timeline coordinates', () => {
		const mockData: Array<PrecipitationData> = [
			{ dt: 1685542800, precipitation: 0.1 },
			{ dt: 1685546400, precipitation: 0.3 },
		];
		const timezone = 'Europe/Berlin';
		const dimension = { width: 800, height: 600 };

		const precipitationService = new PrecipitationService(mockData, timezone, dimension);
		const timelineCoords = precipitationService.getTimeLine();

		expect(timelineCoords).toHaveLength(2);
		expect(timelineCoords[0]).toMatchObject({
			time: '12:00',
			description: 'now',
			x: 60,
			y: 12,
			y2: 570,
		});
		expect(timelineCoords[1]).toMatchObject({
			time: '12:00',
			description: '1 min',
			x: 756,
			y: 12,
			y2: 570,
		});
	});

	test('should return correct axis data', () => {
		const mockData: Array<PrecipitationData> = [
			{ dt: 1685542800, precipitation: 0.1 },
			{ dt: 1685546400, precipitation: 0.3 },
		];
		const timezone = 'Europe/Berlin';
		const dimension = { width: 800, height: 600 };

		const precipitationService = new PrecipitationService(mockData, timezone, dimension);
		const axisData = precipitationService.getAxis();

		expect(axisData).toHaveLength(6);
		expect(axisData[0]).toMatchObject({
			y: 565,
			value: 0,
			length: 756,
		});
		expect(axisData[5]).toMatchObject({
			y: 137.5,
			value: 10,
			length: 756,
		});
	});

	test('should calculate the correct coordinates for precipitation data points and timeline labels', () => {
		const mockData: Array<PrecipitationData> = [
			{ dt: 1685542800, precipitation: 0.1 },
			{ dt: 1685546400, precipitation: 0.3 },
			{ dt: 1685550000, precipitation: 0.2 },
		];
		const timezone = 'Europe/Berlin';
		const dimension = { width: 800, height: 600 };

		const precipitationService = new PrecipitationService(mockData, timezone, dimension);

		const dataCoords = precipitationService['dataCoords'];
		const timeLineCoords = precipitationService.getTimeLine();

		expect(dataCoords).toHaveLength(3);
		expect(dataCoords[0]).toMatchObject({ x: 60, y: 560.725 });
		expect(dataCoords[1]).toMatchObject({ x: 408, y: 552.175 });
		expect(dataCoords[2]).toMatchObject({ x: 756, y: 556.45 });

		expect(timeLineCoords).toHaveLength(2);
		expect(timeLineCoords[0]).toMatchObject({
			time: '12:00',
			description: 'now',
			x: 60,
			y: 12,
			y2: 570,
		});
	});

	test('should calculate the correct maximum precipitation value from the data', () => {
		const mockData: Array<PrecipitationData> = [
			{ dt: 1685542800, precipitation: 0.1 },
			{ dt: 1685546400, precipitation: 0.5 },
			{ dt: 1685550000, precipitation: 0.3 },
			{ dt: 1685553600, precipitation: 0.2 },
		];

		const precipitationService = new PrecipitationService(mockData, 'Europe/Berlin', {
			width: 800,
			height: 600,
		});

		expect(precipitationService['maxPrecipitation']).toBe(10);
	});

	test('should generate correct timeline labels with time descriptions and formatted times', () => {
		const mockData: Array<PrecipitationData> = [
			{ dt: 1685542800, precipitation: 0.1 }, // 2023-05-31 12:00:00
			{ dt: 1685546400, precipitation: 0.3 }, // 2023-05-31 13:00:00
			{ dt: 1685550000, precipitation: 0.2 }, // 2023-05-31 14:00:00
			{ dt: 1685553600, precipitation: 0.1 }, // 2023-05-31 15:00:00
		];
		const timezone = 'Europe/Berlin';
		const dimension = { width: 800, height: 600 };

		const precipitationService = new PrecipitationService(mockData, timezone, dimension);
		const timelineCoords = precipitationService.getTimeLine();

		expect(timelineCoords).toHaveLength(2);
		expect(timelineCoords[0]).toMatchObject({
			time: '12:00',
			description: 'now',
			x: expect.any(Number),
			y: 12,
			y2: 570,
		});
		expect(timelineCoords[1]).toMatchObject({
			time: '12:00',
			description: '3 min',
			x: expect.any(Number),
			y: 12,
			y2: 570,
		});
	});
});
