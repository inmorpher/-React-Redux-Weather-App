import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		globals: true,
		exclude: [
			'**/node_modules/**',
			'**/dist/**',
			'**/build/**',
			'**/coverage/**',
			'**/*.stories.{ts,tsx}',
			'**/*.d.ts',
			'**/src/service-worker.ts',
			'**/src/setupTests.ts',
		],
		coverage: {
			exclude: [
				'**/*.test.ts',
				'**/*.test.tsx',
				'**/*.d.ts',
				'**/*.types.ts',
				'**/*.type.ts',
				'**/*.abstract.ts',
				'**/src/service-worker.ts',
				'**/src/setupTests.ts',
				'**/src/utils/services/time/time.service.interface.ts',
				'**/postcss.config.js',
				'**/tailwind.config.js',
				'**/vite.config.ts',
				'**/vitest.config.ts',
				'**/dev-dist/**',
				'**/dist/**',
				'**/registerSW.js',
				'**/sw.js',
				'**/workbox-*.js',
				'**/src/types.d.ts',
				'**/src/App.tsx',
				'**/src/main.tsx',
			],
		},
	},
});
