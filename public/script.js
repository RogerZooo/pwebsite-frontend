document.addEventListener('DOMContentLoaded', () => {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = Array.from(document.querySelectorAll('.panel'));

    const idToLink = {};
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) 
            return;
        idToLink[href.slice(1)] = link;
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -40% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = entry.target.id;
            const link = idToLink[id];
            if (!link) return;
    

            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                navLinks.forEach(l => l.removeAttribute('aria-current'));
                link.setAttribute('aria-current','true');
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href').slice(1);
            setTimeout(() => {
                const target = document.getElementById(id);
                if (target) target.focus({preventScroll: true});
            }, 300);
        });
    });

    const locHash = window.location.hash.slice(1);
    if (locHash && idToLink[locHash]) {
        navLinks.forEach(l => l.classList.remove('active'));
        idToLink[locHash].classList.add('active');
    } else {
        if(navLinks[0]) navLinks[0].classList.add('active');
    }
    
    const observerOptionsAnim = {
        root: null,
        threshold: 0.1
    };

    const sectionsAnim = document.querySelectorAll('.panel');
    const observerAnim = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('visible');
            }
        });
    }, observerOptionsAnim);

    sectionsAnim.forEach(sec => observerAnim.observe(sec));

    

});

