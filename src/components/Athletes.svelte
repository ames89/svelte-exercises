<script lang="ts">
  import { clubData } from "../lib/data";
  import Carousel from "./Carousel.svelte";
</script>

<div class="container">
  <h2>Atletas Destacados</h2>
  <Carousel
    gridClassName="athletes-grid"
    ariaLabelPrev="Atleta anterior"
    ariaLabelNext="Siguiente atleta">
    {#each clubData.atletasDestacados as atleta}
      <div class="athlete-card">
        <img src={atleta.foto_url} alt={`Foto de ${atleta.nombre}`} />
        <div class="info">
          <h3>{atleta.nombre}</h3>
          <p>{atleta.logros}</p>
        </div>
      </div>
    {/each}
  </Carousel>
</div>
