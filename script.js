document.addEventListener("DOMContentLoaded", () => {
    // Reveal elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine if element should stagger animation based on its class
                const target = entry.target;
                
                // For slide-up elements, we keep their standard animation sequence
                // For fade-in, we just add an 'active' class to ensure they trigger
                if (!target.classList.contains('animated')) {
                    target.style.animationPlayState = 'running';
                    target.classList.add('animated');
                }
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll(".fade-in, .slide-up").forEach(el => {
        // Pause animations initially so they only trigger on scroll
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Make the first header and hero sections run immediately
    document.querySelectorAll(".header.fade-in, #site-nav").forEach(el => {
        el.style.animationPlayState = 'running';
        el.classList.add('animated');
    });

    // Active state highlighting in nav
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('#site-nav .nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(li => {
            li.style.color = 'var(--secondary-text)';
            if (li.getAttribute('href') === `#${current}`) {
                li.style.color = 'var(--primary-text)';
            }
        });
    });
});
