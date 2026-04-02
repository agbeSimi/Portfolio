document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('#mobile-menu');
    const navLinksList = document.querySelector('.nav-links');
    const navLinksLi = document.querySelectorAll('.nav-links li');
    const navLinksA = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        mobileMenuButton.classList.toggle('active');
        navLinksList.classList.toggle('active');

        navLinksLi.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    }

    mobileMenuButton.addEventListener('click', toggleMenu);

    navLinksA.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
});

// --- NOUVEAU : Logique du bouton "Retour en haut" ---
            const backToTopButton = document.querySelector('#backToTop');

            window.addEventListener('scroll', () => {
                // Si on descend de plus de 300 pixels, le bouton apparaît
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('show');
                } else {
                    // Sinon, il disparaît
                    backToTopButton.classList.remove('show');
                }
            });