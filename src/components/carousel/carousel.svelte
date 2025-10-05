<script lang="ts">
	let currentSlide = 0;
	export let images: { src: string; alt: string }[] = [];

	function nextSlide() {
		currentSlide = (currentSlide + 1) % images.length;
	}

	function prevSlide() {
		currentSlide = (currentSlide - 1 + images.length) % images.length;
	}
</script>

<div class="carousel">
	<div class="slides" style="transform: translateX(-{currentSlide * 100}%);">
		{#each images as image, i}
			<div class="slide">
				<img src={image.src} alt={image.alt} />
			</div>
		{/each}
	</div>

	<button class="prev" on:click={prevSlide} aria-label="Previous slide">&#10094;</button>
	<button class="next" on:click={nextSlide} aria-label="Next slide">&#10095;</button>
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
