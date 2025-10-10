<script lang="ts">
  import { clubData } from "../lib/data";

  let isMobileMenuOpen = false;
  let openDropdown = "";

  const toggleMobileMenu = () => (isMobileMenuOpen = !isMobileMenuOpen);

  const closeMobileMenu = () => {
    isMobileMenuOpen = false;
    openDropdown = "";
  };

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

  const handleNavClick = (
    e: MouseEvent,
    isDropdown: boolean,
    dropdownName?: string
  ) => {
    if (isDropdown) {
      e.preventDefault();
      openDropdown = openDropdown === dropdownName ? "" : dropdownName || "";
    } else {
      handleSmoothScroll(e);
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    }
  };

  const navLinks = [
    {
      id: "dropdown-club",
      title: "Club",
      children: [
        { href: "#acerca-de-nosotros", title: "Quiénes Somos" },
        { href: "#mision-vision", title: "Misión y Visión" },
        { href: "#historia-club", title: "Historia" },
        { href: "#nuestros-valores", title: "Nuestros Valores" },
      ],
    },
    {
      id: "dropdown-equipo",
      title: "Equipo",
      children: [
        { href: "#entrenadores", title: "Equipo Técnico" },
        { href: "#logros", title: "Nuestros Logros" },
        { href: "#atletas-destacados", title: "Atletas Destacados" },
      ],
    },
    { href: "#galeria", title: "Galería" },
    { href: "#avales", title: "Avales" },
    { href: "#aliados", title: "Aliados" },
    { href: "#inscripcion", title: "Únete" },
    { href: "#contacto", title: "Contacto" },
  ];
</script>

<header id="main-header" class="main-header">
  <div class="logo-container">
    <a href="#hero" on:click={handleSmoothScroll}>
      <img
        src={clubData.clubInfo.logo_url}
        alt={`Logo de ${clubData.clubInfo.nombre}`}
        class="logo"
      />
    </a>
    <a
      href="#hero"
      on:click={handleSmoothScroll}
      class="club-name club-name--full"
    >
      {clubData.clubInfo.nombre}
    </a>
    <a
      href="#hero"
      on:click={handleSmoothScroll}
      class="club-name club-name--short"
    >
      {clubData.clubInfo.nombreCorto}
    </a>
  </div>
  <nav
    class={`main-nav ${isMobileMenuOpen ? "mobile-visible" : ""}`}
    id="main-nav"
  >
    {#each navLinks as link}
      {#if link.children}
        <div
          class={`nav-item dropdown ${openDropdown === link.id ? "open" : ""}`}>
          <a
            href="#"
            class="dropdown-toggle"
            aria-haspopup="true"
            aria-expanded={openDropdown === link.id}
            on:click={(e) => handleNavClick(e, true, link.id)}>
            {link.title} <i class="fas fa-chevron-down"></i>
          </a>
          <div class="dropdown-menu">
            {#each link.children as child}
              <a
                href={child.href}
                class="dropdown-item"
                on:click={(e) => handleNavClick(e, false)}>
                {child.title}
              </a>
            {/each}
          </div>
        </div>
      {:else}
        <a
          href={link.href}
          class="nav-item"
          on:click={(e) => handleNavClick(e, false)}>
          {link.title}
        </a>
      {/if}
    {/each}
  </nav>
  <button
    class="mobile-nav-toggle"
    aria-label="Abrir menú"
    aria-expanded={isMobileMenuOpen}
    aria-controls="main-nav"
    on:click={toggleMobileMenu}>
    <i class={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
  </button>
</header>
