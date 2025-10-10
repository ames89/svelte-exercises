<script lang="ts">
  import { clubData } from "../lib/data";
  import Carousel from "./Carousel.svelte";
</script>

<div class="container">
  <h2>Equipo Técnico</h2>
  <Carousel
    gridClassName="entrenadores-grid"
    ariaLabelPrev="Entrenador anterior"
    ariaLabelNext="Siguiente entrenador">
    {#each clubData.entrenadores as entrenador}
      <div class="entrenador-card">
        <img src={entrenador.foto_url} alt={`Foto de ${entrenador.nombre}`} />
        <div class="info">
          <h3>{entrenador.nombre}</h3>
          <p>{entrenador.descripcion}</p>
        </div>
      </div>
    {/each}
  </Carousel>
</div>
