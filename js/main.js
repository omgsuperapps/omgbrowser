// ============================================
// OMG Browser - Visual Slider with Title Animation
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // Google Play Store Button - Toast Notification
    // ============================================

    const playStoreBtn = document.getElementById('playStoreBtn');
    const ctaPlayStoreBtn = document.getElementById('ctaPlayStoreBtn');
    const toast = document.getElementById('toast');

    function showToast(e) {
        e.preventDefault();
        // Show toast
        toast.classList.add('show');
        // Hide after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    if (playStoreBtn && toast) {
        playStoreBtn.addEventListener('click', showToast);
    }

    if (ctaPlayStoreBtn && toast) {
        ctaPlayStoreBtn.addEventListener('click', showToast);
    }

    // ============================================
    // APK Download Buttons - Download Toast Notification
    // ============================================

    const downloadApkBtn = document.getElementById('downloadApkBtn');
    const headerDownloadBtn = document.getElementById('headerDownloadBtn');
    const ctaDownloadBtn = document.getElementById('ctaDownloadBtn');
    const downloadToast = document.getElementById('downloadToast');

    function showDownloadToast(e) {
        // Don't prevent default - allow download to proceed
        // Show toast
        if (downloadToast) {
            downloadToast.classList.add('show');
            // Hide after 4 seconds
            setTimeout(() => {
                downloadToast.classList.remove('show');
            }, 4000);
        }
    }

    if (downloadApkBtn && downloadToast) {
        downloadApkBtn.addEventListener('click', showDownloadToast);
    }

    if (headerDownloadBtn && downloadToast) {
        headerDownloadBtn.addEventListener('click', showDownloadToast);
    }

    if (ctaDownloadBtn && downloadToast) {
        ctaDownloadBtn.addEventListener('click', showDownloadToast);
    }

    // Slide titles
    const titles = [
        'Grab any video on a website and play it natively',
        'First mobile browser to have extension support',
        'Built-in video player for the smoothest experience',
        'Block annoying ads with just a click'
    ];

    // Get title element
    const heroTitle = document.getElementById('heroTitle');

    // Function to animate title change
    function changeTitle(index) {
        if (typeof gsap !== 'undefined' && heroTitle) {
            gsap.to(heroTitle, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => {
                    heroTitle.textContent = titles[index];
                    gsap.to(heroTitle, {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                }
            });
        } else if (heroTitle) {
            heroTitle.textContent = titles[index];
        }
    }

    // Function to re-trigger animations when slide changes
    function animateSlideContent(swiper) {
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (!activeSlide) return;

        // Get screenshot and emojis from active slide
        const screenshot = activeSlide.querySelector('.slide-screenshot');
        const emojis = activeSlide.querySelectorAll('.floating-emoji');

        // Re-trigger screenshot animation
        if (screenshot) {
            screenshot.style.animation = 'none';
            setTimeout(() => {
                screenshot.style.animation = 'popInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
            }, 10);
        }

        // Re-trigger emoji animations
        emojis.forEach((emoji) => {
            emoji.style.animation = 'none';
            setTimeout(() => {
                if (emoji.classList.contains('bg-emoji')) {
                    if (emoji.classList.contains('bg-emoji-1')) {
                        emoji.style.animation = 'popInBg 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.1s';
                    } else if (emoji.classList.contains('bg-emoji-2')) {
                        emoji.style.animation = 'popInBg 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.15s';
                    }
                } else {
                    // Regular emojis with staggered delays
                    if (emoji.classList.contains('emoji-1')) {
                        emoji.style.animation = 'popInEmoji 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.2s';
                    } else if (emoji.classList.contains('emoji-2')) {
                        emoji.style.animation = 'popInEmoji 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.3s';
                    } else if (emoji.classList.contains('emoji-3')) {
                        emoji.style.animation = 'popInEmoji 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.4s';
                    } else if (emoji.classList.contains('emoji-4')) {
                        emoji.style.animation = 'popInEmoji 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.5s';
                    } else if (emoji.classList.contains('emoji-5')) {
                        emoji.style.animation = 'popInEmoji 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards 0.6s';
                    }
                }
            }, 10);
        });
    }

    // Initialize Swiper Slider
    const heroSwiper = new Swiper('.hero-swiper', {
        // Effect - fade instead of slide
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 600,

        // Initial slide
        initialSlide: 0,

        // Loop
        loop: true,

        // Autoplay
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },

        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: false,
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // Keyboard control
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        // Touch
        touchRatio: 1,
        touchAngle: 45,
        grabCursor: true,

        // Accessibility
        a11y: {
            enabled: true,
        },

        // Events
        on: {
            slideChange: function() {
                // Get real index (for loop mode)
                const realIndex = this.realIndex;
                changeTitle(realIndex);
                animateSlideContent(this);
            }
        }
    });

    console.log('OMG Browser - Slider initialized ✓');

    // ============================================
    // Navigation Button Visibility Control (Desktop)
    // ============================================

    const heroSection = document.querySelector('.hero-slider-section');
    const navButtons = document.querySelectorAll('.hero-slider-section .swiper-button-prev, .hero-slider-section .swiper-button-next');

    // Hide/show navigation buttons based on hero section visibility (desktop only)
    function updateNavButtonsVisibility() {
        // Only apply on desktop
        if (window.innerWidth > 768 && heroSection && navButtons.length > 0) {
            const heroRect = heroSection.getBoundingClientRect();
            const scrolled = window.pageYOffset;

            // Show buttons only when hero section is in viewport
            // Hide when: hero section is completely above viewport (heroRect.bottom <= 0)
            // OR hero section is completely below viewport (heroRect.top >= window.innerHeight)
            const isHeroInView = heroRect.bottom > 0 && heroRect.top < window.innerHeight;

            navButtons.forEach(btn => {
                if (isHeroInView) {
                    btn.style.display = 'flex';
                    btn.style.visibility = 'visible';
                } else {
                    btn.style.display = 'none';
                    btn.style.visibility = 'hidden';
                }
            });
        } else if (navButtons.length > 0) {
            // On mobile, always show
            navButtons.forEach(btn => {
                btn.style.display = 'flex';
                btn.style.visibility = 'visible';
            });
        }
    }

    // Update on scroll
    window.addEventListener('scroll', updateNavButtonsVisibility, { passive: true });
    // Update on resize
    window.addEventListener('resize', updateNavButtonsVisibility, { passive: true });
    // Initial update
    updateNavButtonsVisibility();

    // ============================================
    // Random Emoji Tilts & Parallax Setup
    // ============================================

    // Get all emojis and add random tilts (max 45 degrees)
    const allEmojis = document.querySelectorAll('.floating-emoji');

    allEmojis.forEach(emoji => {
        // Generate random rotation between -45 and 45 degrees
        const randomRotation = (Math.random() * 90) - 45;
        // Apply rotation using CSS custom property so it doesn't conflict with animation
        emoji.style.setProperty('--emoji-rotation', `${randomRotation}deg`);
    });

    // ============================================
    // Feature Icons Animation on Scroll
    // ============================================

    const featureIcons = document.querySelectorAll('.feature-icon');

    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of the element is visible
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    featureIcons.forEach(icon => {
        observer.observe(icon);
    });

    // Emoji Rain handled in js/emoji-rain.js

});
