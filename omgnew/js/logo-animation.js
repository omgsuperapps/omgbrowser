// ============================================
// Main Logo 3D Flip & Morph Animation
// ============================================

(function() {
    let isAnimating = false;
    let clickCount = 0;

    function create3DFlipAnimation() {
        if (isAnimating) return;
        isAnimating = true;

        const logo = document.querySelector('.main-logo');
        const rays = document.querySelector('.logo-rays');
        const logoWrapper = document.querySelector('.logo-wrapper');
        const orbitRings = document.querySelectorAll('.orbit-ring');

        if (!logo || !logoWrapper) {
            console.error('Logo elements not found');
            isAnimating = false;
            return;
        }

        // Only use Morph & Pulse animation
        morphAndPulse(logo, rays, logoWrapper, orbitRings);
    }

    // Animation 1: Smooth 3D Flip with Glow Trail
    function flipAndGlow(logo, rays, logoWrapper, orbitRings) {
        console.log('✨ Flip & Glow Effect!');

        // Create glow trail particles
        const particleCount = 12;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(79, 70, 229, 0.8), transparent);
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 200;
            `;
            logoWrapper.appendChild(particle);
            particles.push(particle);
        }

        // Logo 3D flip animation
        logo.animate([
            {
                transform: 'perspective(1000px) rotateY(0deg) scale(1)',
                filter: 'brightness(1) saturate(1)'
            },
            {
                transform: 'perspective(1000px) rotateY(180deg) scale(1.2)',
                filter: 'brightness(1.8) saturate(1.5)',
                offset: 0.5
            },
            {
                transform: 'perspective(1000px) rotateY(360deg) scale(1)',
                filter: 'brightness(1) saturate(1)'
            }
        ], {
            duration: 1200,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });

        // Rays rotate smoothly
        if (rays) {
            rays.animate([
                { transform: 'rotate(0deg) scale(1)', opacity: '0.6' },
                { transform: 'rotate(360deg) scale(1.3)', opacity: '0.9' }
            ], {
                duration: 1200,
                easing: 'ease-in-out'
            });
        }

        // Orbit rings expand and contract
        orbitRings.forEach((ring, i) => {
            ring.animate([
                { transform: 'scale(1) rotate(0deg)', opacity: '0.3' },
                { transform: `scale(${1.5 + i * 0.2}) rotate(${180 + i * 60}deg)`, opacity: '0.6', offset: 0.5 },
                { transform: 'scale(1) rotate(360deg)', opacity: '0.3' }
            ], {
                duration: 1200 + i * 100,
                easing: 'ease-in-out'
            });
        });

        // Animate particles in a spiral
        particles.forEach((particle, i) => {
            const angle = (Math.PI * 2 * i) / particleCount;
            const delay = i * 50;

            setTimeout(() => {
                particle.animate([
                    {
                        transform: 'translate(-50%, -50%) scale(0)',
                        opacity: 0
                    },
                    {
                        transform: `translate(calc(-50% + ${Math.cos(angle) * 50}px), calc(-50% + ${Math.sin(angle) * 50}px)) scale(1)`,
                        opacity: 1,
                        offset: 0.3
                    },
                    {
                        transform: `translate(calc(-50% + ${Math.cos(angle) * 150}px), calc(-50% + ${Math.sin(angle) * 150}px)) scale(0.5)`,
                        opacity: 0
                    }
                ], {
                    duration: 1000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => particle.remove();
            }, delay);
        });

        setTimeout(() => {
            isAnimating = false;
        }, 1300);
    }

    // Animation 2: Morph & Pulse with Color Wave
    function morphAndPulse(logo, rays, logoWrapper, orbitRings) {
        console.log('🌈 Morph & Pulse Effect!');

        // Create color wave overlay
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: conic-gradient(from 0deg,
                #ff00ff, #00ffff, #ffff00, #ff00ff);
            border-radius: 50%;
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.5;
            mix-blend-mode: screen;
            pointer-events: none;
            z-index: 150;
        `;
        logoWrapper.appendChild(wave);

        // Logo morphs through different shapes
        const logoAnim = logo.animate([
            {
                transform: 'scale(1) rotate(0deg)',
                borderRadius: '0%',
                filter: 'hue-rotate(0deg) brightness(1)'
            },
            {
                transform: 'scale(0.8) rotate(90deg)',
                borderRadius: '30%',
                filter: 'hue-rotate(90deg) brightness(1.5)',
                offset: 0.25
            },
            {
                transform: 'scale(1.3) rotate(180deg)',
                borderRadius: '50%',
                filter: 'hue-rotate(180deg) brightness(2)',
                offset: 0.5
            },
            {
                transform: 'scale(0.9) rotate(270deg)',
                borderRadius: '30%',
                filter: 'hue-rotate(270deg) brightness(1.5)',
                offset: 0.75
            },
            {
                transform: 'scale(1) rotate(360deg)',
                borderRadius: '0%',
                filter: 'hue-rotate(0deg) brightness(1)'
            }
        ], {
            duration: 1500,
            easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
            fill: 'forwards'
        });

        // Clean reset when animation completes
        logoAnim.onfinish = () => {
            logo.style.transform = '';
            logo.style.borderRadius = '';
            logo.style.filter = '';
        };

        // Wave expands and rotates
        wave.animate([
            { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 0.5 },
            { transform: 'translate(-50%, -50%) scale(2) rotate(720deg)', opacity: 0 }
        ], {
            duration: 1500,
            easing: 'ease-out'
        }).onfinish = () => wave.remove();

        // Rays pulse with colors
        if (rays) {
            const raysAnim = rays.animate([
                { filter: 'hue-rotate(0deg) brightness(1)', opacity: '0.6' },
                { filter: 'hue-rotate(360deg) brightness(1.5)', opacity: '1' },
                { filter: 'hue-rotate(0deg) brightness(1)', opacity: '0.6' }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
                fill: 'forwards'
            });

            raysAnim.onfinish = () => {
                rays.style.filter = '';
                rays.style.opacity = '';
            };
        }

        // Rings pulse in sequence
        orbitRings.forEach((ring, i) => {
            setTimeout(() => {
                const ringAnim = ring.animate([
                    { transform: 'scale(1)', opacity: '0.3' },
                    { transform: 'scale(1.8)', opacity: '0.8' },
                    { transform: 'scale(1)', opacity: '0.3' }
                ], {
                    duration: 600,
                    easing: 'cubic-bezier(0.45, 0, 0.55, 1)',
                    fill: 'forwards'
                });

                ringAnim.onfinish = () => {
                    ring.style.transform = '';
                    ring.style.opacity = '';
                };
            }, i * 150);
        });

        setTimeout(() => {
            isAnimating = false;
        }, 1600);
    }

    // Animation 3: Elastic Bounce with Star Burst
    function spinAndExplode(logo, rays, logoWrapper, orbitRings) {
        console.log('⭐ Spin & Star Burst Effect!');

        // Create star burst
        const starCount = 16;
        const stars = [];

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            const angle = (Math.PI * 2 * i) / starCount;

            star.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 8px;
                height: 8px;
                background: linear-gradient(45deg, #fff, #4f46e5);
                transform: translate(-50%, -50%) rotate(45deg);
                pointer-events: none;
                z-index: 200;
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
            `;

            logoWrapper.appendChild(star);
            stars.push({ element: star, angle });
        }

        // Logo elastic bounce and spin
        logo.animate([
            {
                transform: 'scale(1) rotate(0deg)',
                filter: 'brightness(1)'
            },
            {
                transform: 'scale(0.7) rotate(-30deg)',
                filter: 'brightness(0.8)',
                offset: 0.2
            },
            {
                transform: 'scale(1.5) rotate(540deg)',
                filter: 'brightness(2.5)',
                offset: 0.6
            },
            {
                transform: 'scale(0.95) rotate(720deg)',
                filter: 'brightness(1.2)',
                offset: 0.8
            },
            {
                transform: 'scale(1) rotate(720deg)',
                filter: 'brightness(1)'
            }
        ], {
            duration: 1400,
            easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
        });

        // Stars shoot outward
        stars.forEach(({ element, angle }, i) => {
            const distance = 150 + Math.random() * 50;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;

            setTimeout(() => {
                element.animate([
                    {
                        transform: 'translate(-50%, -50%) rotate(45deg) scale(0)',
                        opacity: 0
                    },
                    {
                        transform: `translate(calc(-50% + ${endX * 0.3}px), calc(-50% + ${endY * 0.3}px)) rotate(45deg) scale(1.5)`,
                        opacity: 1,
                        offset: 0.4
                    },
                    {
                        transform: `translate(calc(-50% + ${endX}px), calc(-50% + ${endY}px)) rotate(405deg) scale(0)`,
                        opacity: 0
                    }
                ], {
                    duration: 900,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }).onfinish = () => element.remove();
            }, i * 30);
        });

        // Rays spin faster
        if (rays) {
            rays.animate([
                { transform: 'rotate(0deg) scale(1)' },
                { transform: 'rotate(720deg) scale(1.5)' }
            ], {
                duration: 1400,
                easing: 'ease-in-out'
            });
        }

        // Rings wobble
        orbitRings.forEach((ring, i) => {
            ring.animate([
                { transform: 'scale(1) rotate(0deg)' },
                { transform: `scale(1.2) rotate(${180 + i * 120}deg)`, offset: 0.5 },
                { transform: 'scale(1) rotate(360deg)' }
            ], {
                duration: 1400,
                easing: 'ease-in-out'
            });
        });

        setTimeout(() => {
            isAnimating = false;
        }, 1500);
    }

    // Initialize
    function init() {
        const logo = document.querySelector('.main-logo');

        if (logo) {
            logo.style.cursor = 'pointer';
            logo.style.userSelect = 'none';
            logo.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease';

            // Subtle hover effect
            logo.addEventListener('mouseenter', () => {
                if (!isAnimating) {
                    logo.style.transform = 'scale(1.05)';
                    logo.style.filter = 'brightness(1.1)';
                }
            });

            logo.addEventListener('mouseleave', () => {
                if (!isAnimating) {
                    logo.style.transform = 'scale(1)';
                    logo.style.filter = 'brightness(1)';
                }
            });

            // Click handler
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                create3DFlipAnimation();
            });

            // Touch support
            logo.addEventListener('touchstart', (e) => {
                e.preventDefault();
                create3DFlipAnimation();
            }, { passive: false });

            console.log('✨ Logo animations ready! (3 different effects - keep clicking!)');
        }
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
