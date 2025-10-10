<script lang="ts">
  import { clubData } from "../lib/data";
  import type { IGaleria } from "../lib/types";
  import { createEventDispatcher } from "svelte";

  export let modalState: {
    isOpen: boolean;
    albumIndex: number;
    photoIndex: number;
  };

  const dispatch = createEventDispatcher();

  const closeModal = () => {
    dispatch("close");
  };

  const nextPhoto = () => {
    dispatch("next");
  };

  const prevPhoto = () => {
    dispatch("prev");
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if ((e.target as HTMLDivElement).id === "gallery-modal") {
      closeModal();
    }
  };

  let currentAlbum: IGaleria;
  let currentPhoto: string;

  $: {
    if (modalState.isOpen) {
      currentAlbum = clubData.galeria[modalState.albumIndex];
      currentPhoto = currentAlbum.fotos[modalState.photoIndex];
    }
  }
</script>

{#if modalState.isOpen}
  <div
    id="gallery-modal"
    class="gallery-modal visible"
    on:click={handleBackdropClick}>
    <span
      class="gallery-modal-close"
      aria-label="Cerrar"
      on:click={closeModal}>
      &times;
    </span>
    <button
      class="gallery-modal-nav prev"
      aria-label="Anterior"
      on:click={prevPhoto}
      style="display: {modalState.photoIndex > 0 ? 'block' : 'none'}">
      &#10094;
    </button>
    <div class="gallery-modal-image-container">
      <img
        class="gallery-modal-content"
        src={currentPhoto}
        alt="Vista ampliada de la foto" />
    </div>
    <button
      class="gallery-modal-nav next"
      aria-label="Siguiente"
      on:click={nextPhoto}
      style="display: {modalState.photoIndex < currentAlbum.fotos.length - 1
        ? 'block'
        : 'none'}">
      &#10095;
    </button>
  </div>
{/if}
