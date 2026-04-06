// ============================================
// PT LEXRAY Company Profile - JavaScript
// Features: Hamburger Menu, Smooth Scrolling, Form Handling, Interactivity
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeHamburgerMenu();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeNavbarBackground();
});

// ============================================
// 1. HAMBURGER MENU FUNCTIONALITY
// ============================================
function initializeHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Handle window resize - close menu on desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ============================================
// 2. SMOOTH SCROLLING (Enhanced with Offset)
// ============================================
function initializeSmoothScrolling() {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 3. FORM HANDLING
// ============================================
function initializeFormHandling() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form fields
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const messageInput = contactForm.querySelector('textarea');
        const submitBtn = contactForm.querySelector('.submit-btn');

        // Validate form
        if (!validateForm(nameInput, emailInput, messageInput)) {
            return;
        }

        // Collect form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };

        // Disable submit button and show loading state
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate form submission (Replace with actual backend call)
        setTimeout(function() {
            // Reset form
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Show success message
            showNotification('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');

            // Log form data (remove in production)
            console.log('Form Data:', formData);
        }, 1500);
    });
}

// Form validation
function validateForm(nameInput, emailInput, messageInput) {
    let isValid = true;

    // Reset error classes
    nameInput.classList.remove('error');
    emailInput.classList.remove('error');
    messageInput.classList.remove('error');

    // Validate name
    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
        showFieldError(nameInput, 'Name must be at least 3 characters');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    }

    return isValid;
}

// Show field-specific error
function showFieldError(input, message) {
    input.classList.add('error');
    
    // Remove existing error message if any
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains('error-message')) {
        existingError.remove();
    }

    // Create and insert error message
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    input.parentNode.insertBefore(errorElement, input.nextSibling);

    // Remove error after 5 seconds
    setTimeout(() => {
        errorElement.remove();
        input.classList.remove('error');
    }, 5000);
}

// ============================================
// 4. NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ============================================
// 5. SCROLL ANIMATIONS (Fade-in on scroll)
// ============================================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add fade-in class to elements
    const elementsToObserve = document.querySelectorAll(
        '.service-card, .portfolio-item, .team-member, .stat'
    );

    elementsToObserve.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// ============================================
// 6. NAVBAR BACKGROUND ON SCROLL
// ============================================
function initializeNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// 7. INTERACTIVE ELEMENTS
// ============================================

// CTA Button functionality
const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', function() {
        const projectsSection = document.querySelector('#services');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Learn More buttons
document.querySelectorAll('.learn-more').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showNotification('Learn more about our projects - Contact us for details!', 'success');
    });
});

// Portfolio items click effect
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });

    item.addEventListener('mouseleave', function() {
        this.classList.remove('expanded');
    });
});

// ============================================
// 8. UTILITY FUNCTIONS
// ============================================

// Debounce function for optimizing scroll and resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Check if element is in viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// 9. ACCESSIBILITY IMPROVEMENTS
// ============================================

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close hamburger menu on Escape key
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Focus management for better accessibility
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.classList.add('focused');
    });
    
    element.addEventListener('blur', function() {
        this.classList.remove('focused');
    });
});

console.log('PT LEXRAY - Script loaded successfully');
