<script lang="ts">
  import { clubData } from "../lib/data";
  import Carousel from "./Carousel.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function onAlbumClick(albumIndex: number, photoIndex: number) {
    dispatch("albumClick", { albumIndex, photoIndex });
  }
</script>

<div class="container">
  <h2>Galería de Fotos</h2>
  <Carousel
    gridClassName="gallery-albums-grid"
    ariaLabelPrev="Álbum anterior"
    ariaLabelNext="Siguiente álbum">
    {#each clubData.galeria as album, index}
      <div
        class="album-card"
        on:click={() => onAlbumClick(index, 0)}>
        <img
          class="album-card-img"
          src={album.fotos[0]}
          alt={`Portada del álbum ${album.nombre}`} />
        <div class="album-card-info">
          <h3>{album.nombre}</h3>
          <p>{album.fotos.length} fotos</p>
        </div>
      </div>
    {/each}
  </Carousel>
</div>
