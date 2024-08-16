import { constructUrl } from './constructUrl';

describe('constructUrl', () => {
	test('should construct a valid URL when all parameters are provided', () => {
		const basePathParams = {
			one: 'value1',
			two: 'value2',
			three: 'value3',
		};
		const queryParams = {
			param1: 'value4',
			param2: 'value5',
		};
		const hash = 'hashFragment';
		const absolute = true;

		const expectedUrl = '/value1/value2/value3?param1=value4&param2=value5#hashFragment';

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});

	test('should return an empty string when all parameters are empty or undefined', () => {
		const basePathParams = {};
		const queryParams = {};
		const hash = undefined;
		const absolute = false;

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe('');
	});

	test('should construct a valid URL when only basePathParams are provided', () => {
		const basePathParams = {
			one: 'value1',
			two: 'value2',
			three: 'value3',
		};
		const queryParams = undefined;
		const hash = undefined;
		const absolute = false;

		const expectedUrl = 'value1/value2/value3';

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});

	test('should construct a valid URL when only queryParams are provided', () => {
		const basePathParams = {};
		const queryParams = {
			param1: 'value1',
			param2: 'value2',
			param3: 'value3',
		};
		const hash = undefined;
		const absolute = false;

		const expectedUrl = '?param1=value1&param2=value2&param3=value3';

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});

	test('should construct a valid URL when only hash is provided', () => {
		const basePathParams = {};
		const queryParams = undefined;
		const hash = 'fragment';
		const absolute = false;

		const expectedUrl = `#${encodeURIComponent(hash)}`;

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});

	test('should handle special characters in basePathParams correctly', () => {
		const basePathParams = {
			one: 'value 1',
			two: 'value&2',
			three: 'value#3',
		};
		const queryParams = undefined;
		const hash = undefined;
		const absolute = false;

		const expectedUrl = 'value%201/value%262/value%233';

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});

	test('should handle special characters in queryParams correctly', () => {
		const basePathParams = {
			one: 'value1',
			two: 'value2',
		};
		const queryParams = {
			param1: 'value 1',
			param2: 'value&2',
			param3: 'value#3',
		};
		const hash = undefined;
		const absolute = false;

		const expectedUrl = 'value1/value2?param1=value%201&param2=value%262&param3=value%233';

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});

	test('should handle special characters in hash correctly', () => {
		const basePathParams = {
			one: 'value1',
			two: 'value2',
		};
		const queryParams = {
			param1: 'value1',
			param2: 'value2',
		};
		const hash = 'fragment with spaces & special chars #';
		const absolute = false;

		const expectedUrl =
			'value1/value2?param1=value1&param2=value2#fragment%20with%20spaces%20%26%20special%20chars%20%23';

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});

	test('should construct a valid URL when basePathParams contain empty strings', () => {
		const basePathParams = {
			one: 'value1',
			two: '',
			three: 'value3',
		};
		const queryParams = undefined;
		const hash = undefined;
		const absolute = false;

		const expectedUrl = 'value1/value3';

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});

	test('should construct a valid URL when queryParams contain empty strings', () => {
		const basePathParams = {
			one: 'value1',
			two: 'value2',
		};
		const queryParams = {
			param1: 'value1',
			param2: '',
			param3: 'value3',
		};
		const hash = undefined;
		const absolute = false;

		const expectedUrl = 'value1/value2?param1=value1&param3=value3';

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});

	test('should construct a valid URL when hash is an empty string', () => {
		const basePathParams = {
			one: 'value1',
			two: 'value2',
			three: 'value3',
		};
		const queryParams = {
			param1: 'value4',
			param2: 'value5',
		};
		const hash = '';
		const absolute = true;

		const expectedUrl = '/value1/value2/value3?param1=value4&param2=value5';

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});

	test('should construct a valid URL when absolute is false', () => {
		const basePathParams = {
			one: 'value1',
			two: 'value2',
			three: 'value3',
		};
		const queryParams = {
			param1: 'value4',
			param2: 'value5',
		};
		const hash = 'hashFragment';
		const absolute = false;

		const expectedUrl = 'value1/value2/value3?param1=value4&param2=value5#hashFragment';

		const constructedUrl = constructUrl(basePathParams, queryParams, hash, absolute);

		expect(constructedUrl).toBe(expectedUrl);
	});
});
