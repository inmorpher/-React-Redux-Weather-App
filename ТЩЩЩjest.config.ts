import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest/presets/default-esm',
	testEnvironment: 'jsdom',
	// Используйте 'node' или 'jsdom' в зависимости от ваших нужд
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1',
	},
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				useESM: true,
				tsconfig: './tsconfig.json',
			},
		],
	},
	transformIgnorePatterns: ['node_modules/(?!(module-that-needs-to-be-transformed)/)'],
	globals: {
		// 'ts-jest': {
		// 	useESM: true,
		// },
		'import.meta': {
			env: {
				VITE_SERVER_URL: 'https://yevdev.me/weather/api',
			},
		},
	},
};
// другие настройки

export default config;
