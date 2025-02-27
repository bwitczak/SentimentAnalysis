import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "$lib/scss/_variables.scss" as *;'
			}
		}
	},
	test: {
		environment: 'happy-dom',
		coverage: {
			provider: 'v8',
			exclude: [
				'./svelte.config.js',
				'./eslint.config.js',
				'./vite.config.ts',
				'src/app.d.ts',
				'src/lib/stores/**',
				'src/lib/icons/**',
				'src/lib/types/**',
				'**/node_modules/**',
				'.svelte-kit/**'
			]
		}
	},
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
