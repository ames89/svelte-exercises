<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let { gridClassName, ariaLabelPrev, ariaLabelNext } = $props();

  let currentIndex = $state(0);
  let trackRef: HTMLDivElement;
  let viewportRef: HTMLDivElement;
  let isScrollable = $state(false);

  const updateCarousel = () => {
    if (trackRef && viewportRef) {
      const track = trackRef;
      const viewport = viewportRef;
      const scrollable = track.scrollWidth > viewport.offsetWidth + 5;
      isScrollable = scrollable;

      if (!scrollable) {
        currentIndex = 0;
        track.style.transform = "translateX(0px)";
      }
    }
  };

  onMount(() => {
    updateCarousel();
    window.addEventListener("resize", updateCarousel);
  });

  onDestroy(() => {
    window.removeEventListener("resize", updateCarousel);
  });

  const handleNext = () => {
    if (trackRef && viewportRef) {
      const track = trackRef;
      const firstChild = track.children[0] as HTMLElement;
      if (!firstChild) return;

      const slideWidth = firstChild.offsetWidth;
      const gap = parseFloat(getComputedStyle(track).gap) || 32;
      const newIndex = currentIndex + 1;
      const offset = (slideWidth + gap) * newIndex;

      if (
        offset + viewportRef.offsetWidth <
        track.scrollWidth + (slideWidth + gap)
      ) {
        currentIndex = newIndex;
      }
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      currentIndex = currentIndex - 1;
    }
  };

  $effect(() => {
    if (trackRef) {
      const track = trackRef;
      const firstChild = track.children[0] as HTMLElement;
      if (firstChild) {
        const slideWidth = firstChild.offsetWidth;
        const gap = parseFloat(getComputedStyle(track).gap) || 32;
        const offset = (slideWidth + gap) * currentIndex;
        track.style.transform = `translateX(-${offset}px)`;
      }
    }
  });

  const isNextDisabled = $derived(() => {
    if (!trackRef || !viewportRef || !isScrollable) return true;
    const track = trackRef;
    const viewport = viewportRef;
    const firstChild = track.children[0] as HTMLElement;
    if (!firstChild) return true;
    const slideWidth = firstChild.offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 32;
    const offset = (slideWidth + gap) * currentIndex;
    return offset + viewport.offsetWidth >= track.scrollWidth;
  });
</script>

<div class="carousel-container">
  <div
    class={`carousel-viewport ${
      !isScrollable ? "carousel-centered" : ""
    }`}
    bind:this={viewportRef}>
    <div class={gridClassName} bind:this={trackRef}>
      <slot />
    </div>
  </div>
  {#if isScrollable}
    <button
      class="carousel-btn prev"
      aria-label={ariaLabelPrev}
      onclick={handlePrev}
      disabled={currentIndex === 0}>
      <i class="fas fa-chevron-left"></i>
    </button>
    <button
      class="carousel-btn next"
      aria-label={ariaLabelNext}
      onclick={handleNext}
      disabled={isNextDisabled}>
      <i class="fas fa-chevron-right"></i>
    </button>
  {/if}
</div>
