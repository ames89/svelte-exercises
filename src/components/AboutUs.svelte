<script lang="ts">
	import { clubData } from "../lib/data";
</script>

<div class="container">
  <h2>Quiénes Somos</h2>
  <p style="max-width: 800px; margin: 0 auto 2rem auto">
    {clubData.clubInfo.quienesSomos}
  </p>
  <div class="about-content" id="mision-vision">
    <div class="about-box">
      <h3>
        <i class="fas fa-bullseye"></i> Misión
      </h3>
      <p>{clubData.clubInfo.mision}</p>
    </div>
    <div class="about-box">
      <h3>
        <i class="fas fa-eye"></i> Visión
      </h3>
      <p>{clubData.clubInfo.vision}</p>
    </div>
  </div>
  <div class="history-box" id="historia-club">
    <h3>
      <i class="fas fa-landmark"></i> Historia del Club
    </h3>
    {#each clubData.clubInfo.historia as p}
      <p>{p}</p>
    {/each}
  </div>
  <div class="values-box" id="nuestros-valores">
    <h3>
      <i class="fas fa-gem"></i> Nuestros Valores
    </h3>
    <p class="valores-intro">{clubData.valoresIntro}</p>
    <ul class="valores-list">
      {#each clubData.valores as valor}
        <li class="valor-item">
          <h4>
            <i class="fas fa-check-circle"></i> {valor.titulo}
          </h4>
          <p>{valor.descripcion}</p>
        </li>
      {/each}
    </ul>
  </div>
</div>
