<script lang="ts">
  import { clubData } from "../lib/data";
  import Carousel from "./Carousel.svelte";
</script>

<div class="container">
  <h2>Nuestros Logros</h2>
  <Carousel
    gridClassName="logros-grid"
    ariaLabelPrev="Logro anterior"
    ariaLabelNext="Siguiente logro">
    {#each clubData.logros as logro}
      <div class="logro-card">
        <img src={logro.foto_url} alt={`Foto del logro: ${logro.titulo}`} />
        <div class="info">
          <h3>{logro.titulo}</h3>
          <p>{logro.descripcion}</p>
        </div>
      </div>
    {/each}
  </Carousel>
</div>
