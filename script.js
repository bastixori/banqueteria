// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal-fade');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => revealObserver.observe(el));

// Parallax Effect for Hero Image
const parallaxImg = document.querySelector('.parallax-img');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (parallaxImg && scrolled < window.innerHeight) {
        parallaxImg.style.transform = `translateY(${-10 + (scrolled * 0.05)}%)`;
    }
});

// Mobile Menu
const mobileBtn = document.querySelector('.mobile-menu-btn');
const closeBtn = document.querySelector('.close-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileBtn.addEventListener('click', () => mobileNav.classList.add('open'));
closeBtn.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileLinks.forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('open')));
