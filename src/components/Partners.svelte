<script lang="ts">
  import type { Avale, Aliado } from "../lib/types";
  import Carousel from "./Carousel.svelte";

  export let partners: (Avale | Aliado)[];
  export let title: string;
  export let gridClassName: string;
</script>

<div class="container">
  <h2>{title}</h2>
  <Carousel
    {gridClassName}
    ariaLabelPrev="Anterior"
    ariaLabelNext="Siguiente">
    {#each partners as item}
      <div class="logo-link-wrapper">
        <div class={`logo-item ${item.special_class ?? ""}`}>
          {#if "url" in item && item.url}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.nombre}>
              <img src={item.logo_url} alt={`${title} ${item.nombre}`} />
            </a>
          {:else}
            <img src={item.logo_url} alt={`${title} ${item.nombre}`} />
          {/if}
        </div>
        <div class="tooltip">{item.nombre}</div>
      </div>
    {/each}
  </Carousel>
</div>
