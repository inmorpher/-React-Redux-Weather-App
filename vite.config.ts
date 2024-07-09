import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		outDir: 'dist',
	},
	plugins: [
		react(),
		visualizer({
			open: true,
			filename: 'bundle.html',
			gzipSize: true,
			brotliSize: true,
		}),
	],
	server: {
		host: true,
	},
	css: {
		postcss: {
			plugins: [
				tailwindcss(),
				autoprefixer({
					overrideBrowserslist: ['>1%', 'last 2 versions'],
				}), // add options if needed
			],
			from: undefined,
		},
	},
});
