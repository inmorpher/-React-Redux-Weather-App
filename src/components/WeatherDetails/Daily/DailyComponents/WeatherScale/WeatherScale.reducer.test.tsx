import '@testing-library/jest-dom';
import { describe } from 'vitest';
import { ActionType, PointerStateType, weatherScaleReduce } from './WeatherScale.reducer';

describe('WeatherScale reducer', () => {
	test('should set the pointer coordinates correctly with valid x and y values', () => {
		const initialState: PointerStateType = {
			pointer: { x: 0, y: 0 },
			pointerVisibility: false,
			pointerTempriture: undefined,
			pointerTime: undefined,
		};

		const newPointerCoords = { x: 100, y: 200 };
		const action: ActionType = {
			type: 'SET_POINTER_COORDS',
			payload: newPointerCoords,
		};

		const newState = weatherScaleReduce(initialState, action);

		expect(newState.pointer).toEqual(newPointerCoords);
		expect(newState.pointerVisibility).toEqual(initialState.pointerVisibility);
		expect(newState.pointerTempriture).toEqual(initialState.pointerTempriture);
		expect(newState.pointerTime).toEqual(initialState.pointerTime);
	});

	test('should handle negative values for pointer coordinates', () => {
		const initialState: PointerStateType = {
			pointer: { x: 0, y: 0 },
			pointerVisibility: false,
			pointerTempriture: undefined,
			pointerTime: undefined,
		};

		const negativePointerCoords = { x: -100, y: -200 };
		const action: ActionType = {
			type: 'SET_POINTER_COORDS',
			payload: negativePointerCoords,
		};

		const newState = weatherScaleReduce(initialState, action);

		expect(newState.pointer).toEqual(negativePointerCoords);
		expect(newState.pointerVisibility).toEqual(initialState.pointerVisibility);
		expect(newState.pointerTempriture).toEqual(initialState.pointerTempriture);
		expect(newState.pointerTime).toEqual(initialState.pointerTime);
	});

	test('should set the pointer tempriture correctly with a valid number value', () => {
		const initialState: PointerStateType = {
			pointer: { x: 0, y: 0 },
			pointerVisibility: false,
			pointerTempriture: undefined,
			pointerTime: undefined,
		};

		const newPointerTempriture = 25;
		const action: ActionType = {
			type: 'SET_POINTER_TEMPRITURE',
			payload: newPointerTempriture,
		};

		const newState = weatherScaleReduce(initialState, action);

		expect(newState.pointerTempriture).toEqual(newPointerTempriture);
		expect(newState.pointer).toEqual(initialState.pointer);
		expect(newState.pointerVisibility).toEqual(initialState.pointerVisibility);
		expect(newState.pointerTime).toEqual(initialState.pointerTime);
	});

	test('should set the pointer tempriture correctly with a valid string value', () => {
		const initialState: PointerStateType = {
			pointer: { x: 0, y: 0 },
			pointerVisibility: false,
			pointerTempriture: undefined,
			pointerTime: undefined,
		};

		const newPointerTempriture = '25°C';
		const action: ActionType = {
			type: 'SET_POINTER_TEMPRITURE',
			payload: newPointerTempriture,
		};

		const newState = weatherScaleReduce(initialState, action);

		expect(newState.pointerTempriture).toEqual(newPointerTempriture);
		expect(newState.pointer).toEqual(initialState.pointer);
		expect(newState.pointerVisibility).toEqual(initialState.pointerVisibility);
		expect(newState.pointerTime).toEqual(initialState.pointerTime);
	});

	test('should handle undefined value for pointer tempriture', () => {
		const initialState: PointerStateType = {
			pointer: { x: 0, y: 0 },
			pointerVisibility: false,
			pointerTempriture: undefined,
			pointerTime: undefined,
		};

		const undefinedPointerTempriture = undefined;
		const action: ActionType = {
			type: 'SET_POINTER_TEMPRITURE',
			payload: undefinedPointerTempriture,
		};

		const newState = weatherScaleReduce(initialState, action);

		expect(newState.pointerTempriture).toBeUndefined();
		expect(newState.pointer).toEqual(initialState.pointer);
		expect(newState.pointerVisibility).toEqual(initialState.pointerVisibility);
		expect(newState.pointerTime).toEqual(initialState.pointerTime);
	});

	test('should set the pointer time correctly with a valid number value', () => {
		const initialState: PointerStateType = {
			pointer: { x: 0, y: 0 },
			pointerVisibility: false,
			pointerTempriture: undefined,
			pointerTime: undefined,
		};

		const newPointerTime = 12;
		const action: ActionType = {
			type: 'SET_POINTER_TIME',
			payload: newPointerTime,
		};

		const newState = weatherScaleReduce(initialState, action);

		expect(newState.pointerTime).toEqual('12:00');
		expect(newState.pointer).toEqual(initialState.pointer);
		expect(newState.pointerVisibility).toEqual(initialState.pointerVisibility);
		expect(newState.pointerTempriture).toEqual(initialState.pointerTempriture);
	});

	test('should set the pointer time correctly with a valid string value', () => {
		const initialState: PointerStateType = {
			pointer: { x: 0, y: 0 },
			pointerVisibility: false,
			pointerTempriture: undefined,
			pointerTime: undefined,
		};

		const newPointerTime = '15';
		const action: ActionType = {
			type: 'SET_POINTER_TIME',
			payload: newPointerTime,
		};

		const newState = weatherScaleReduce(initialState, action);

		expect(newState.pointerTime).toEqual('15:00');
		expect(newState.pointer).toEqual(initialState.pointer);
		expect(newState.pointerVisibility).toEqual(initialState.pointerVisibility);
		expect(newState.pointerTempriture).toEqual(initialState.pointerTempriture);
	});

	test('should handle undefined value for pointer time', () => {
		const initialState: PointerStateType = {
			pointer: { x: 0, y: 0 },
			pointerVisibility: false,
			pointerTempriture: undefined,
			pointerTime: undefined,
		};

		const undefinedPointerTime = undefined;
		const action: ActionType = {
			type: 'SET_POINTER_TIME',
			payload: undefinedPointerTime,
		};

		const newState = weatherScaleReduce(initialState, action);

		expect(newState.pointerTime).toBeUndefined();
		expect(newState.pointer).toEqual(initialState.pointer);
		expect(newState.pointerVisibility).toEqual(initialState.pointerVisibility);
		expect(newState.pointerTempriture).toEqual(initialState.pointerTempriture);
	});

	test('should set the pointer visibility correctly with a boolean value', () => {
		const initialState: PointerStateType = {
			pointer: { x: 0, y: 0 },
			pointerVisibility: false,
			pointerTempriture: undefined,
			pointerTime: undefined,
		};

		const newPointerVisibility = true;
		const action: ActionType = {
			type: 'SET_POINTER_VISIBILITY',
			payload: newPointerVisibility,
		};

		const newState = weatherScaleReduce(initialState, action);

		expect(newState.pointerVisibility).toEqual(newPointerVisibility);
		expect(newState.pointer).toEqual(initialState.pointer);
		expect(newState.pointerTempriture).toEqual(initialState.pointerTempriture);
		expect(newState.pointerTime).toEqual(initialState.pointerTime);
	});

	test('should set all pointer values correctly with valid inputs', () => {
		const initialState: PointerStateType = {
			pointer: { x: 0, y: 0 },
			pointerVisibility: false,
			pointerTempriture: undefined,
			pointerTime: undefined,
		};

		const newPointerValues = {
			pointer: { x: 100, y: 200 },
			pointerTempriture: 25,
			pointerTime: 12,
		};
		const action: ActionType = {
			type: 'SET_POINTER_VALUES',
			payload: newPointerValues,
		};

		const newState = weatherScaleReduce(initialState, action);

		expect(newState.pointer).toEqual(newPointerValues.pointer);
		expect(newState.pointerTempriture).toEqual(newPointerValues.pointerTempriture);
		expect(newState.pointerTime).toEqual('12:00');
		expect(newState.pointerVisibility).toEqual(initialState.pointerVisibility);
	});
});
