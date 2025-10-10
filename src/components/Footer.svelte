<script lang="ts">
  import { clubData } from "../lib/data";
</script>

<footer id="main-footer" class="main-footer">
  <div class="footer-content">
    <div class="footer-socials">
      {#each Object.entries(clubData.contacto.redesSociales) as [key, value]}
        <a
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={value.nombre}>
          <i class={`fab fa-${key}`}></i>
        </a>
      {/each}
    </div>
    <div class="footer-copyright">
      <p>
        Copyright &copy; {new Date().getFullYear()} {clubData.clubInfo.nombre}. Todos los
        derechos reservados.
      </p>
      <p>
        Desarrollado con ❤️ por <strong> .:: Jeaninne Rivera ::. </strong>
      </p>
    </div>
  </div>
</footer>
