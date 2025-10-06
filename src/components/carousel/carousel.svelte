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

	function goToSlide(index: number) {
		currentSlide = index;
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
		<div class="dots">
			{#each images as _, i (i)}
				<button
					class="dot"
					class:active={currentSlide === i}
					on:click={() => goToSlide(i)}
					aria-label="Go to slide {i + 1}"
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel {
		border-radius: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		height: var(--carousel-height, 400px);
		margin: 2rem auto;
		overflow: hidden;
		position: relative;
		width: var(--carousel-width, 600px);
	}

	.slides {
		display: flex;
		height: 100%;
		transition: transform 0.5s ease-in-out;
		width: 100%;
	}

	.slide {
		flex-shrink: 0;
		height: 100%;
		width: 100%;
	}

	.slide img {
		height: 100%;
		object-fit: cover;
		width: 100%;
	}

	.prev,
	.next {
		background-color: rgba(0, 0, 0, 0.5);
		border: none;
		color: white;
		cursor: pointer;
		padding: 10px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 1;
	}

	.prev {
		left: 10px;
	}

	.next {
		right: 10px;
	}

	.dots {
		background-color: #0007;
		border-radius: 15px;
		bottom: 10px;
		display: flex;
		gap: 8px;
		left: 50%;
		opacity: 0.5;
		position: absolute;
		transform: translateX(-50%);
		transition: opacity 0.5s ease-in-out;
		padding: 1px;
	}

	.dots:hover {
		opacity: 1;
	}

	.dot {
		background-color: transparent;
		border-radius: 50%;
		border: 1px solid #fff;
		cursor: pointer;
		height: 12px;
		padding: 0;
		width: 12px;
	}

	.dot.active {
		background-color: #fff;
	}
</style>
