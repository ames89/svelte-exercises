<script lang="ts">
  import { onMount } from "svelte";

  export let id: string;
  export let className: string = "";

  let ref: HTMLElement;
  let isVisible = false;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          isVisible = true;
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  });
</script>

<section
  bind:this={ref}
  {id}
  class={`fade-in-section ${className} ${isVisible ? "visible" : ""}`}>
  <slot />
</section>
