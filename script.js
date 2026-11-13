document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('#site-header');
    const mobileMenuButton = document.querySelector('#mobile-menu');
    const navLinksList = document.querySelector('.nav-links');
    const navLinksLi = document.querySelectorAll('.nav-links li');
    const navLinksA = document.querySelectorAll('.nav-links a');
    const backToTopButton = document.querySelector('#backToTop');

    // --- Menu mobile ---
    function toggleMenu() {
        const isOpen = navLinksList.classList.toggle('active');
        mobileMenuButton.classList.toggle('active', isOpen);
        mobileMenuButton.setAttribute('aria-expanded', String(isOpen));
        mobileMenuButton.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
        document.body.classList.toggle('menu-open', isOpen);

        navLinksLi.forEach((link, index) => {
            link.style.animation = isOpen
                ? `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
                : '';
        });
    }

    mobileMenuButton.addEventListener('click', toggleMenu);

    navLinksA.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksList.classList.contains('active')) toggleMenu();
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinksList.classList.contains('active')) toggleMenu();
    });

    // --- Header compact + bouton "Retour en haut" ---
    function onScroll() {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 50);
        backToTopButton.classList.toggle('show', y > 300);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // --- Lien actif dans la navigation selon la section visible ---
    const sections = document.querySelectorAll('main section[id]');
    if ('IntersectionObserver' in window) {
        const navObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navLinksA.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(section => navObserver.observe(section));

        // --- Apparition des sections au défilement ---
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    } else {
        document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }

    // --- Année du footer ---
    const year = document.querySelector('#year');
    if (year) year.textContent = new Date().getFullYear();
});
