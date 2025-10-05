<script lang="ts">
	let currentSlide = 0;
	export let images: { src: string; alt: string }[] = [];

	function nextSlide() {
		if (images.length === 0) return;
		currentSlide = (currentSlide + 1) % images.length;
	}

	function prevSlide() {
		if (images.length === 0) return;
		currentSlide = (currentSlide - 1 + images.length) % images.length;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			nextSlide();
		} else if (event.key === 'ArrowLeft') {
			prevSlide();
		}
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class="carousel"
	on:keydown={handleKeydown}
	tabindex="0"
	role="region"
	aria-roledescription="carousel"
>
	<div class="slides" style="transform: translateX(-{currentSlide * 100}%);" aria-live="polite">
		{#each images as image, i (image.src)}
			<div
				class="slide"
				role="group"
				aria-roledescription="slide"
				aria-label="{i + 1} of {images.length}"
			>
				<img src={image.src} alt={image.alt} />
			</div>
		{/each}
	</div>

	{#if images.length > 1}
		<button class="prev" on:click={prevSlide} aria-label="Previous slide">&#10094;</button>
		<button class="next" on:click={nextSlide} aria-label="Next slide">&#10095;</button>
	{/if}
</div>

<style>
	.carousel {
		position: relative;
		width: var(--carousel-width, 600px);
		height: var(--carousel-height, 400px);
		overflow: hidden;
		margin: 2rem auto;
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.slides {
		display: flex;
		width: 100%;
		height: 100%;
		transition: transform 0.5s ease-in-out;
	}

	.slide {
		flex-shrink: 0;
		width: 100%;
		height: 100%;
	}

	.slide img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.prev,
	.next {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		background-color: rgba(0, 0, 0, 0.5);
		color: white;
		border: none;
		padding: 10px;
		cursor: pointer;
		z-index: 1;
	}

	.prev {
		left: 10px;
	}

	.next {
		right: 10px;
	}
</style>
