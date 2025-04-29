document.addEventListener("DOMContentLoaded", function () {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 800, // Duração da animação em ms
    once: true, // Animação acontece apenas uma vez
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling para links de navegação
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      if (this.hash !== "") {
        e.preventDefault();
        const hash = this.hash;
        const targetElement = document.querySelector(hash);
        const navbarHeight = navbar.offsetHeight;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Fecha o menu mobile (se estiver aberto)
        const navbarCollapse = document.querySelector(".navbar-collapse");
        if (navbarCollapse.classList.contains("show")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }

        // Atualiza classe 'active' no link clicado
        navLinks.forEach((nav) => nav.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Atualiza classe 'active' no scroll
  window.addEventListener("scroll", () => {
    let currentSection = "";
    const sections = document.querySelectorAll("section[id]");
    const navbarHeight = navbar.offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 50; // Adiciona um offset
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentSection) {
        link.classList.add("active");
      }
    });
    // Caso especial para o topo da página (Home)
    if (window.scrollY < sections[0].offsetTop - navbarHeight - 50) {
      navLinks.forEach((link) => link.classList.remove("active"));
      document.querySelector('.nav-link[href="#home"]').classList.add("active");
    }
  });

  // Back to top button
  const backToTopButton = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Inicializar Carousel Bootstrap (se necessário, embora data-bs-ride="carousel" já faça isso)
  const portfolioCarousel = document.querySelector("#portfolioCarousel");
  if (portfolioCarousel) {
    const carousel = new bootstrap.Carousel(portfolioCarousel, {
      interval: 5000, // Intervalo de 5 segundos
      wrap: true, // Continua ciclando
    });
  }
});
