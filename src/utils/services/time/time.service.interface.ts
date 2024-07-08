export interface ITimeService {
	getTime(type: 'hours' | 'minutes' | 'hoursAndMinutes', fallbackToDate?: boolean): this;
	getDay(type: 'numeric' | '2-digit'): this;
	getWeekday(type: 'long' | 'short' | 'narrow'): this;
	getMonth(type: 'numeric' | '2-digit' | 'short' | 'long' | 'narrow'): this;
	getYear(type: 'numeric' | '2-digit'): this;
	addDivider(divider?: 'dash' | 'slash' | 'colon' | 'coma' | 'space'): this;
	result(): string;
}
