import { TimeService } from './time.service';

describe('TimeService', () => {
	test('should return the correct time in "hours" format', () => {
		const currentTime = new Date('2023-05-12T10:30:00Z'); // 10:30 AM UTC
		const timeService = new TimeService(currentTime.getTime() / 1000, 'UTC');

		const formattedTime = timeService.getTime('hours').result();

		expect(formattedTime).toBe('10 AM');
	});

	test('should return the correct time in "minutes" format', () => {
		const currentTime = new Date('2023-05-12T10:30:00Z'); // 10:30 AM UTC
		const timeService = new TimeService(currentTime.getTime() / 1000, 'UTC');

		const formattedTime = timeService.getTime('minutes').result();

		expect(formattedTime).toBe('30');
	});

	test('should return the correct time in "hoursAndMinutes" format', () => {
		const currentTime = new Date('2023-05-12T10:30:00Z'); // 10:30 AM UTC
		const timeService = new TimeService(currentTime.getTime() / 1000, 'UTC');

		const formattedTime = timeService.getTime('hoursAndMinutes').result();

		expect(formattedTime).toBe('10:30 AM');
	});

	test('should throw an error when an invalid type is provided to the getTime method', () => {
		const timeService = new TimeService();
		expect(() => timeService.getTime('invalid' as any)).toThrow(
			'Type must be "hours", "minutes" or "hoursAndMinutes"'
		);
	});

	test('should fallback to displaying the date when "fallbackToDate" is true and time is 12 AM', () => {
		const currentTime = new Date('2023-05-12T00:00:00Z'); // 12:00 AM UTC
		const timeService = new TimeService(currentTime.getTime() / 1000, 'UTC');

		const formattedTime = timeService.getTime('hours', true).result();

		expect(formattedTime).toBe('May 12');
	});

	test('should return the correct day in "numeric" format', () => {
		const currentTime = new Date('2023-05-12T10:30:00Z'); // May 12th
		const timeService = new TimeService(currentTime.getTime() / 1000, 'UTC');

		const formattedDay = timeService.getDay('numeric').result();

		expect(formattedDay).toBe('12');
	});

	test('should return the correct day in "2-digit" format', () => {
		const currentTime = new Date('2023-05-12T10:30:00Z'); // May 12th
		const timeService = new TimeService(currentTime.getTime() / 1000, 'UTC');

		const formattedDay = timeService.getDay('2-digit').result();

		expect(formattedDay).toBe('12');
	});

	test('should return the correct weekday in "long" format', () => {
		const currentTime = new Date('2023-05-12T10:30:00Z'); // Friday
		const timeService = new TimeService(currentTime.getTime() / 1000, 'UTC');

		const formattedWeekday = timeService.getWeekday('long').result();

		expect(formattedWeekday).toBe('Friday');
	});

	test('should return the correct weekday in "short" format', () => {
		const currentTime = new Date('2023-05-12T10:30:00Z'); // Friday
		const timeService = new TimeService(currentTime.getTime() / 1000, 'UTC');

		const formattedWeekday = timeService.getWeekday('short').result();

		expect(formattedWeekday).toBe('Fri');
	});

	test('should return the correct weekday in "narrow" format', () => {
		const currentTime = new Date('2023-05-12T10:30:00Z'); // Friday
		const timeService = new TimeService(currentTime.getTime() / 1000, 'UTC');

		const formattedWeekday = timeService.getWeekday('narrow').result();

		expect(formattedWeekday).toBe('F');
	});

	test('should add the correct divider to the resultArray', () => {
		const timeService = new TimeService();

		timeService.addDivider('dash');
		const dashResult = timeService.result();
		expect(dashResult).toBe('-');

		timeService.addDivider('slash');
		const slashResult = timeService.result();
		expect(slashResult).toBe('/');

		timeService.addDivider('colon');
		const colonResult = timeService.result();
		expect(colonResult).toBe(':');

		timeService.addDivider('coma');
		const comaResult = timeService.result();
		expect(comaResult).toBe(', ');

		timeService.addDivider('space');
		const spaceResult = timeService.result();
		expect(spaceResult).toBe(' ');

		timeService.addDivider();
		const defaultResult = timeService.result();
		expect(defaultResult).toBe(' ');
	});

	test('should return the correct month and year', () => {
		const currentTime = new Date('2023-05-12T10:30:00Z');
		const timeService = new TimeService(currentTime.getTime() / 1000, 'UTC');

		const formattedMonth = timeService.getMonth('long').result();
		expect(formattedMonth).toBe('May');

		const formattedYear = timeService.getYear('numeric').result();
		expect(formattedYear).toBe('2023');
	});
});
