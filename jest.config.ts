import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom', // Используйте 'node' или 'jsdom' в зависимости от ваших нужд
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{
				tsconfig: './tsconfig.node.json',
			},
		],
	},
	// другие настройки
};

export default config;
