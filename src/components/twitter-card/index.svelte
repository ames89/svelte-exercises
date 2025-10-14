<script lang="ts">
	let { title = 'title', content = 'content' } = $props();
</script>

<section class="section">
	<h2>Title: {title}</h2>
	<div>Content: {content}</div>
</section>

<style>
	.section {
		padding: 1rem;
		border: solid blue 1px;
		border-radius: 0.25rem;
		margin: 0.5rem 0;
	}
</style>
