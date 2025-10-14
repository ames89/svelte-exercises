import { vitePreprocess } from '@astrojs/svelte';

const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true
	}
};

export default config;
