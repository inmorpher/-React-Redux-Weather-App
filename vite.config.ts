import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import { visualizer } from 'rollup-plugin-visualizer';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

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
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg', 'favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
			manifest: {
				name: 'My Weather App',
				short_name: 'YevWeatehr',
				description: 'my first PWA weather App',
				theme_color: '#ffffff',
				icons: [
					{
						src: '/icons/favicon/android-icon-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
				],
			},
			devOptions: {
				enabled: true, // Включает PWA в режиме разработки
			},
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
