export type PointerStateType = {
	pointer: { x: number; y: number };
	pointerVisibility: boolean;
	pointerTempriture: string | number | undefined;
	pointerTime: number | string | undefined;
};

type ActionType =
	| { type: 'SET_POINTER_COORDS'; payload: { x: number; y: number } }
	| { type: 'SET_POINTER_TEMPRITURE'; payload: string | number | undefined }
	| { type: 'SET_POINTER_TIME'; payload: number | string | undefined }
	| { type: 'SET_POINTER_VISIBILITY'; payload: boolean }
	| {
			type: 'SET_POINTER_VALUES';
			payload: {
				pointer: { x: number; y: number };
				pointerTempriture: string | number | undefined;
				pointerTime: string | number | undefined;
			};
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  };

export const weatherScaleInitialState: PointerStateType = {
	pointer: { x: 0, y: 0 },
	pointerVisibility: false,
	pointerTempriture: undefined,
	pointerTime: undefined,
};

export const weatherScaleReduce = (
	state: PointerStateType,
	action: ActionType
): PointerStateType => {
	switch (action.type) {
		case 'SET_POINTER_COORDS':
			return { ...state, pointer: action.payload };
		case 'SET_POINTER_TEMPRITURE':
			return { ...state, pointerTempriture: action.payload };
		case 'SET_POINTER_TIME':
			return { ...state, pointerTime: action.payload?.toString().padStart(2, '0') + ':00' };
		case 'SET_POINTER_VISIBILITY':
			return { ...state, pointerVisibility: action.payload };
		case 'SET_POINTER_VALUES':
			return {
				...state,
				pointer: { ...action.payload.pointer },
				pointerTempriture: action.payload.pointerTempriture,
				pointerTime: action.payload.pointerTime?.toString().padStart(2, '0') + ':00',
			};
		default:
			return { ...state };
	}
};
