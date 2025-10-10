<script lang="ts">
  import { clubData } from "../lib/data";
</script>

<div id="fixed-social-bar">
  {#each Object.entries(clubData.contacto.redesSociales) as [key, value]}
    <div class="social-link-wrapper">
      <a
        href={value.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={value.nombre}
        class={key}>
        <i class={`fab fa-${key}`}></i>
      </a>
      <div class="tooltip">{value.nombre}</div>
    </div>
  {/each}
</div>
