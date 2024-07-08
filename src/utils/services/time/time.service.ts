import { ITimeService } from './time.service.interface';

export class TimeService implements ITimeService {
	private resultArray: Array<string> = [];
	private time: Date;
	private timezone?: string;
	constructor(time?: number, timezone?: string) {
		this.time = time ? new Date(time * 1000) : new Date();
		this.timezone = timezone;
	}

	private timeFormat(components: Intl.DateTimeFormatOptions, timezone = true): string {
		const options: Intl.DateTimeFormatOptions = components;

		if (this.timezone && timezone) {
			// if timezone is not specified then use the current timezone instead of the current time
			options.timeZone = this.timezone;
		}

		return this.time.toLocaleString('en-US', options);
	}

	/**
	 * Get actual time in 'hour' and/or 'minute' format and push it to the result array
	 * @param type :'hour' or'minute' or 'hoursAndMinutes'
	 *
	 * @param fallbackToDate : 'true' or 'false'
	 * When fallbackToDate is 'true' then the time will be set to the current date
	 * @returns this
	 * @example getTime('hour', true)
	 */
	getTime(type: 'hours' | 'minutes' | 'hoursAndMinutes', fallbackToDate = false): this {
		const timeParams: Intl.DateTimeFormatOptions = {};

		if (type === 'hours') {
			timeParams.hour = '2-digit';
		} else if (type === 'minutes') {
			timeParams.minute = '2-digit';
		} else if (type === 'hoursAndMinutes') {
			timeParams.hour = '2-digit';
			timeParams.minute = '2-digit';
		} else {
			throw new Error('Type must be "hours", "minutes" or "hoursAndMinutes"');
		}

		let formattedTime = this.timeFormat(timeParams);
		if (type === 'hours' && fallbackToDate && formattedTime === '12 AM') {
			//if the time is 12 AM and we want to fallback to date
			const day = this.timeFormat({ day: '2-digit' });
			const month = this.timeFormat({ month: 'short' });
			formattedTime = `${month} ${day}`;
		}

		this.resultArray.push(formattedTime);
		return this;
	}
	/**
	 *Get day
	 * @param type: 'numeric' | '2-digit'
	 * @returns this
	 * @example getDay('numeric')
	 */
	getDay(type: 'numeric' | '2-digit'): this {
		this.resultArray.push(this.timeFormat({ day: type }));

		return this;
	}
	/**
	 * Get weekday
	 * @param type: 'long' |'short' |'narrow'
	 * @returns this
	 * @example getWeekday('short')
	 */
	getWeekday(type: 'long' | 'short' | 'narrow'): this {
		this.resultArray.push(this.timeFormat({ weekday: type }));

		return this;
	}
	/**
	 * Get the month and push the result array
	 * @param type: 'numeric' | '2-digit' | 'short' | 'long' | 'narrow'
	 * @returns this
	 * @example getMonth('2-digit');
	 */
	getMonth(type: 'numeric' | '2-digit' | 'short' | 'long' | 'narrow'): this {
		this.resultArray.push(this.timeFormat({ month: type }));
		return this;
	}
	/**
	 * Get the year and push the result array
	 * @param type: 'numeric' | '2-digit'
	 * @returns this
	 * @example getYear('2-digit');
	 */
	getYear(type: 'numeric' | '2-digit'): this {
		this.resultArray.push(this.timeFormat({ year: type }));
		return this;
	}
	/**
	 *
	 * @param divider: 'dash' | 'slash': undefined
	 * @returns {string} the string representation of the date format string
	 *
	 */

	addDivider(divider?: 'dash' | 'slash' | 'colon' | 'coma' | 'space'): this {
		switch (divider) {
			case 'dash':
				this.resultArray.push('-');
				break;
			case 'slash':
				this.resultArray.push('/');
				break;
			case 'colon':
				this.resultArray.push(':');
				break;
			case 'coma':
				this.resultArray.push(', ');
				break;
			case 'space':
				this.resultArray.push(' ');
				break;
			default:
				this.resultArray.push(' ');
				break;
		}

		return this;
	}
	result(): string {
		const result = this.resultArray.join('');
		this.resultArray = [];

		return result;
	}
}
