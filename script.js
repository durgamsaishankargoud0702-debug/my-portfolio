document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Animate hamburger lines (handled by CSS usually, but we can add class)
        });

        // Close menu when a link is clicked
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // 2. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // 4. Skill Percentage Animation
    const skillNumbers = document.querySelectorAll('.skill-percentage');

    if (skillNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.getAttribute('data-target'));
                    animateValue(target, 0, finalValue, 2000); // 2 seconds duration
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.1 }); // Trigger sooner

        skillNumbers.forEach(number => observer.observe(number));
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // 5. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Featured sections
    const featResume = document.getElementById('feat-resume');
    const featHome = document.getElementById('feat-homestore');
    const featWork = document.getElementById('feat-workstay');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Toggle Featured Project based on filter
                if (filter === 'web') {
                    if (featResume) featResume.style.display = 'none';
                    if (featWork) featWork.style.display = 'none'; // Ensure work is hidden
                    if (featHome) {
                        featHome.style.display = 'flex';
                        featHome.classList.add('reveal');
                    }
                } else {
                    // Default view (All, Automation, Design)
                    if (featHome) featHome.style.display = 'none';
                    if (featWork) featWork.style.display = 'none';
                    if (featResume) {
                        featResume.style.display = 'flex';
                        featResume.classList.add('reveal');
                    }
                }

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // 6. Interactive Featured Preview from Grid
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Check if card has a featured target
            const targetId = card.getAttribute('data-featured');
            if (targetId) {
                // Prevent default anchor behavior if clicking link
                if (e.target.tagName !== 'A') {
                    e.preventDefault();
                }

                // Hide all featured
                if (featResume) featResume.style.display = 'none';
                if (featHome) featHome.style.display = 'none';
                if (featWork) featWork.style.display = 'none';

                // Show target
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.style.display = 'flex';
                    targetSection.classList.add('reveal');

                    // Smooth scroll to featured section
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });
});

/* =========================================
   Contact Page Functionality
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {


    // 2. Contact Form Handling
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            btn.innerHTML = 'Sending...';
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.innerHTML = 'Message Sent! ✅';
                btn.style.background = '#10b981';
                btn.style.opacity = '1';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // 3. Scroll Animation Observer (Added for "Good Animation")
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Target elements to animate
    // Target elements to animate (Expanded for Global Animations)
    const animateSelectors = [
        '.expertise-card',
        '.project-card',
        '.service-card',
        '.timeline-content',
        '.benefit-card',
        '.section-header',
        '.get-in-touch',
        '.hero-content > *',
        '.about-text > *',
        '.experience-strip',
        '.skill-card',
        '.contact-info-col',
        '.contact-form',
        '.workflow-section',
        '.cta-section'
    ];

    document.querySelectorAll(animateSelectors.join(', ')).forEach(el => {
        el.classList.add('fade-on-scroll');
        observer.observe(el);
    });
});
