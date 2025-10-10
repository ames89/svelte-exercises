<script lang="ts">
  import { clubData } from "../lib/data";

  const handleSmoothScroll = (e: MouseEvent) => {
    e.preventDefault();
    const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute("href")?.substring(1);
    if (!targetId) return;

    const targetElement = document.getElementById(targetId);
    const header = document.getElementById("main-header");

    if (targetElement && header) {
      const headerOffset = header.offsetHeight + 20;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
</script>

<section
  id="hero"
  class="hero"
  style="--logo-bg-url: url('{clubData.clubInfo.logo_url}')">
  <div class="container">
    <h1>{clubData.clubInfo.nombre}</h1>
    <p>{clubData.clubInfo.lema}</p>
    <a href="#inscripcion" class="btn" on:click={handleSmoothScroll}>
      Únete a nuestro Club <i class="fas fa-swimmer"></i>
    </a>
  </div>
</section>
