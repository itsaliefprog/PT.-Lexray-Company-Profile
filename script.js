document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggles = Array.from(document.querySelectorAll('[data-theme-toggle]'));
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const themeStorageKey = 'lexray-theme';

    initializeTheme();
    initializeNavigation();
    initializeScrollState();
    initializeRevealAnimations();
    initializeUnitCarousel();

    function initializeTheme() {
        const savedTheme = window.localStorage.getItem(themeStorageKey);
        const initialTheme = savedTheme === 'dark' ? 'dark' : 'light';

        applyTheme(initialTheme);

        if (!themeToggles.length) {
            return;
        }

        themeToggles.forEach(function(themeToggle) {
            themeToggle.addEventListener('click', function() {
                const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
                applyTheme(nextTheme);
                window.localStorage.setItem(themeStorageKey, nextTheme);
            });
        });
    }

    function applyTheme(theme) {
        const isDark = theme === 'dark';

        root.dataset.theme = isDark ? 'dark' : 'light';

        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', isDark ? '#141518' : '#f5f1e8');
        }

        if (!themeToggles.length) {
            return;
        }

        themeToggles.forEach(function(themeToggle) {
            const themeToggleIcon = themeToggle.querySelector('.theme-toggle-icon i');
            const themeToggleLabel = themeToggle.querySelector('.theme-toggle-label');

            themeToggle.setAttribute('aria-pressed', String(isDark));
            themeToggle.setAttribute('aria-label', isDark ? 'Aktifkan light mode' : 'Aktifkan dark mode');

            if (themeToggleLabel) {
                themeToggleLabel.textContent = isDark ? 'Light' : 'Dark';
            }

            if (themeToggleIcon) {
                themeToggleIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }

    function initializeNavigation() {
        if (!hamburger || !navMenu) {
            return;
        }

        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(function(link) {
            link.addEventListener('click', function(event) {
                const href = link.getAttribute('href');
                const target = href ? document.querySelector(href) : null;

                navMenu.classList.remove('active');
                hamburger.classList.remove('active');

                if (!target) {
                    return;
                }

                event.preventDefault();
                scrollToSection(target);
            });
        });

        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });

        window.addEventListener('resize', function() {
            if (window.innerWidth > 820) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    function initializeScrollState() {
        if (!navbar) {
            return;
        }

        const updateNavbar = function() {
            navbar.classList.toggle('scrolled', window.scrollY > 24);
        };

        updateNavbar();
        window.addEventListener('scroll', updateNavbar, { passive: true });
    }

    function initializeRevealAnimations() {
        const elements = document.querySelectorAll('.team-member, .stat, .info-item, .hero-metric, .unit-card, .unit-carousel, .unit-siteplan, .unit-download');

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            elements.forEach(function(element) {
                element.classList.add('fade-in-visible');
            });
            return;
        }

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.16,
            rootMargin: '0px 0px -40px 0px'
        });

        elements.forEach(function(element) {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }

    function initializeUnitCarousel() {
        const carousels = Array.from(document.querySelectorAll('[data-carousel]'));

        if (!carousels.length) {
            return;
        }

        carousels.forEach(function(carousel) {
            const slides = Array.from(carousel.querySelectorAll('.unit-slide'));
            const dots = Array.from(carousel.querySelectorAll('[data-carousel-dot]'));
            const prevButton = carousel.querySelector('[data-carousel-prev]');
            const nextButton = carousel.querySelector('[data-carousel-next]');
            const currentCounter = carousel.querySelector('[data-carousel-current]');
            const totalCounter = carousel.querySelector('[data-carousel-total]');
            let currentIndex = slides.findIndex(function(slide) {
                return slide.classList.contains('active');
            });
            let autoPlayId = null;

            if (!slides.length) {
                return;
            }

            if (currentIndex < 0) {
                currentIndex = 0;
            }

            const setActiveSlide = function(index) {
                currentIndex = (index + slides.length) % slides.length;

                slides.forEach(function(slide, slideIndex) {
                    slide.classList.toggle('active', slideIndex === currentIndex);
                });

                dots.forEach(function(dot, dotIndex) {
                    dot.classList.toggle('active', dotIndex === currentIndex);
                    dot.setAttribute('aria-pressed', String(dotIndex === currentIndex));
                });

                if (currentCounter) {
                    currentCounter.textContent = String(currentIndex + 1).padStart(2, '0');
                }
            };

            if (totalCounter) {
                totalCounter.textContent = String(slides.length).padStart(2, '0');
            }

            const startAutoPlay = function() {
                if (prefersReducedMotion || slides.length < 2) {
                    return;
                }

                stopAutoPlay();
                autoPlayId = window.setInterval(function() {
                    setActiveSlide(currentIndex + 1);
                }, 6500);
            };

            const stopAutoPlay = function() {
                if (autoPlayId) {
                    window.clearInterval(autoPlayId);
                    autoPlayId = null;
                }
            };

            if (prevButton) {
                prevButton.addEventListener('click', function() {
                    setActiveSlide(currentIndex - 1);
                    startAutoPlay();
                });
            }

            if (nextButton) {
                nextButton.addEventListener('click', function() {
                    setActiveSlide(currentIndex + 1);
                    startAutoPlay();
                });
            }

            dots.forEach(function(dot, dotIndex) {
                dot.addEventListener('click', function() {
                    setActiveSlide(dotIndex);
                    startAutoPlay();
                });
            });

            carousel.addEventListener('mouseenter', stopAutoPlay);
            carousel.addEventListener('mouseleave', startAutoPlay);
            carousel.addEventListener('focusin', stopAutoPlay);
            carousel.addEventListener('focusout', startAutoPlay);

            setActiveSlide(currentIndex);
            startAutoPlay();
        });
    }

    function scrollToSection(target) {
        const offset = navbar ? navbar.offsetHeight + 12 : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: top,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    }
});
