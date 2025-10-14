<script lang="ts">
	import TwitterCard from '../components/twitter-card/index.svelte';
	let c = $state({ count: 0 });
</script>

<main>
	<h1>Hello, world!</h1>
	<TwitterCard title="Hello" content="This is a tweet." />
</main>

<style>
</style>
