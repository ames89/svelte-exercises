<script>
	let currentSlide = 0;
	const images = [
		'https://picsum.photos/id/237/600/400',
		'https://picsum.photos/id/238/600/400',
		'https://picsum.photos/id/239/600/400',
		'https://picsum.photos/id/240/600/400'
	];

	function nextSlide() {
		console.log('nextSlide');
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
				<img src={image} alt="Carousel slide {i + 1}" />
			</div>
		{/each}
	</div>

	<button class="prev" on:click={prevSlide}>&#10094;</button>
	<button class="next" on:click={nextSlide}>&#10095;</button>
</div>

<style>
	.carousel {
		position: relative;
		width: 600px;
		height: 400px;
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
