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
		environment: 'happy-dom'
	},
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
