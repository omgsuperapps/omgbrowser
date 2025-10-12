// ============================================
// Emoji Rain / Confetti Effect - Fixed Version
// ============================================

(function() {
    let lastStartTime = 0;

    function sanitizeSrc(src) {
        if (!src) return '';
        // Trim spaces and remove backticks often present in copied HTML
        let clean = src.trim().replace(/`/g, '');
        // Encode spaces
        clean = clean.replace(/\s/g, '%20');
        return clean;
    }

    function createEmojiRain(emojiSrc) {
        const now = Date.now();
        // Minimal throttle to avoid overwhelming DOM
        if (now - lastStartTime < 120) return;
        lastStartTime = now;

        const container = document.getElementById('rain-emoji-container');
        if (!container) {
            console.error('Rain emoji container not found!');
            return;
        }

        // GSAP-based vertical rain animation inspired by reference implementation
        // Reduce quantity to improve smoothness
        const emojiQuantity = 30;

        const containerRect = container.getBoundingClientRect();
        const containerHeight = containerRect.height || window.innerHeight;

        for (let i = 0; i < emojiQuantity; i++) {
            const singleEmoji = document.createElement('div');
            singleEmoji.className = 'single-rain-emoji';
            singleEmoji.style.position = 'absolute';
            singleEmoji.style.top = '0';
            // Distribute across ~10 lanes
            const lane = Math.floor(Math.random() * 11); // 0-10
            const leftPercent = 5 + lane * 9; // ~5% to ~95%
            singleEmoji.style.left = leftPercent + '%';
            singleEmoji.style.pointerEvents = 'none';
            singleEmoji.style.zIndex = '10000';
            singleEmoji.style.willChange = 'transform';

            // Create a wave wrapper to avoid transform conflicts (parent rise, wrapper wave, child sway)
            const waveWrapper = document.createElement('div');
            waveWrapper.className = 'emoji-wave-wrapper';
            singleEmoji.appendChild(waveWrapper);

            const singleEmojiChild = document.createElement('div');
            singleEmojiChild.className = 'single-rain-emoji-image';
            singleEmojiChild.style.backgroundImage = `url("${emojiSrc}")`;
            waveWrapper.appendChild(singleEmojiChild);

            container.appendChild(singleEmoji);

            // Enforce larger sizes inline using 10 fixed size buckets (low variation, consistent)
            const baseSize = window.innerWidth <= 480 ? 150 : window.innerWidth <= 768 ? 180 : 240;
            const sizeFactors = [0.60, 0.68, 0.76, 0.84, 0.92, 1.00, 1.08, 1.16, 1.24, 1.32];
            const factor = sizeFactors[Math.floor(Math.random() * sizeFactors.length)];
            const finalSize = Math.round(baseSize * factor);
            singleEmoji.style.width = finalSize + 'px';
            singleEmoji.style.height = finalSize + 'px';
            const singleEmojiWidth = finalSize;

            // Random props mirroring the reference
            const emojiDelay = 0.001 * Math.floor(Math.random() * 1251); // 0 - 1.25s
            const emojiSpeed = (Math.floor(Math.random() * (2200 - 1200 + 1)) + 1200) * 0.001; // 1.2 - 2.2s
            // Keep scale constant; size variation comes from fixed buckets
            const emojiScale = 1.0;
            const emojiRotate = (Math.floor(Math.random() * 51) - 25) * 0.4; // ~-10 to 10 deg

            if (window.gsap) {
                // Improve performance: force3D and smooth ease
                gsap.set(singleEmoji, { force3D: true });
                gsap.set(singleEmojiChild, { force3D: true, transformOrigin: '50% 50%' });
                // Vertical movement from bottom to above top
                const riseTween = gsap.fromTo(singleEmoji, {
                    y: containerHeight,
                    xPercent: -50,
                    scale: emojiScale
                }, {
                    y: -singleEmojiWidth,
                    duration: emojiSpeed,
                    delay: emojiDelay,
                    ease: 'power1.in',
                    overwrite: 'auto',
                    force3D: true,
                    onComplete: () => {
                        // Clean up CSS sway indicator and element
                        if (singleEmojiChild.__swayTween) {
                            singleEmojiChild.__swayTween.kill();
                            singleEmojiChild.__swayTween = null;
                        }
                        singleEmoji.remove();
                    }
                });

                // CSS wave on wrapper to avoid concurrent transform authors
                const waveAmp = 14 + Math.random() * 14; // 14-28px
                const waveDur = 1.6 + Math.random() * 0.8; // 1.6-2.4s
                waveWrapper.style.setProperty('--wave-amp', `${waveAmp}px`);
                waveWrapper.style.setProperty('--wave-duration', `${waveDur}s`);
                waveWrapper.classList.add('emoji-wave');

                // Use CSS sway to reduce JS-driven jitter
                singleEmojiChild.classList.add('emoji-sway');
            } else {
                // Fallback using WA-API: approximate vertical rise and simple sway
                const rise = singleEmoji.animate([
                    { transform: `translate(-50%, ${containerHeight}px) scale(${emojiScale})` },
                    { transform: `translate(-50%, ${-singleEmojiWidth}px) scale(${emojiScale})` }
                ], {
                    duration: emojiSpeed * 1000,
                    delay: emojiDelay * 1000,
                    easing: 'ease-in',
                    fill: 'forwards'
                });

                // CSS sway instead of WA-API for performance
                singleEmojiChild.classList.add('emoji-sway');

                // CSS wave on wrapper
                const waveAmp = 14 + Math.random() * 14; // 14-28px
                const waveDur = 1.6 + Math.random() * 0.8; // 1.6-2.4s
                waveWrapper.style.setProperty('--wave-amp', `${waveAmp}px`);
                waveWrapper.style.setProperty('--wave-duration', `${waveDur}s`);
                waveWrapper.classList.add('emoji-wave');

                rise.onfinish = () => {
                    singleEmojiChild.classList.remove('emoji-sway');
                    singleEmoji.remove();
                };
            }
        }
    }

    // Attach to window for global access
    window.initEmojiRain = function(element) {
        let emojiSrc = '';
        // Prefer direct <img> source
        if (element.tagName === 'IMG') {
            emojiSrc = element.src;
        } else {
            const img = element.querySelector('img');
            if (img) emojiSrc = img.src;
        }

        // Fallback: read CSS background-image url from the clicked element
        if (!emojiSrc) {
            const bg = window.getComputedStyle(element).backgroundImage || '';
            const match = bg.match(/url\(("|')?(.*?)(\1)\)/);
            if (match && match[2]) {
                emojiSrc = match[2];
            }
        }

        emojiSrc = sanitizeSrc(emojiSrc);
        if (emojiSrc) {
            createEmojiRain(emojiSrc);
        } else {
            console.error('No emoji src found');
        }
    };

    // Initialize click handlers when DOM is ready
    function initializeHandlers() {
        // Use event delegation so newly created Swiper clones also work
        document.addEventListener('click', function(e) {
            const target = e.target.closest('.emoji-clickable');
            if (!target) return;

            // Only allow interaction for emojis inside the active slide
            const slide = target.closest('.swiper-slide');
            if (!slide || !slide.classList.contains('swiper-slide-active')) return;

            // Ensure the element is actually in the viewport
            const rect = target.getBoundingClientRect();
            const inViewport = rect.width > 0 && rect.height > 0 &&
                rect.bottom > 0 && rect.right > 0 &&
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth);
            if (!inViewport) return;

            const cs = window.getComputedStyle(target);
            const filter = (cs.filter || '').toLowerCase();
            const opacity = parseFloat(cs.opacity || '1');
            const isBlurred = /blur\(/.test(filter);
            if (isBlurred || opacity <= 0.3) return;

            e.preventDefault();
            e.stopPropagation();
            window.initEmojiRain(target);
        }, { passive: false });

        // Keyboard activation for accessibility: Enter or Space triggers rain
        document.addEventListener('keydown', function(e) {
            const target = e.target.closest('.emoji-clickable');
            if (!target) return;
            const slide = target.closest('.swiper-slide');
            if (!slide || !slide.classList.contains('swiper-slide-active')) return;
            const rect = target.getBoundingClientRect();
            const inViewport = rect.width > 0 && rect.height > 0 &&
                rect.bottom > 0 && rect.right > 0 &&
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.left < (window.innerWidth || document.documentElement.clientWidth);
            if (!inViewport) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.initEmojiRain(target);
            }
        });

        // Upgrade emoji elements to act as buttons (role, tabindex, aria-label)
        function upgradeEmojiButtons(root = document) {
            const nodes = root.querySelectorAll('.emoji-clickable');
            nodes.forEach(el => {
                if (el.dataset.emojiButtonUpgraded === '1') return;
                const alt = (el.getAttribute('alt') || 'Emoji').trim();
                el.setAttribute('role', 'button');
                el.setAttribute('tabindex', '0');
                el.setAttribute('aria-label', alt);
                el.dataset.emojiButtonUpgraded = '1';
            });
        }

        upgradeEmojiButtons(document);

        // Observe the swiper for clones/new slides and upgrade newly added emojis
        const swiperEl = document.querySelector('.hero-swiper');
        if (swiperEl && window.MutationObserver) {
            const observer = new MutationObserver(() => upgradeEmojiButtons(swiperEl));
            observer.observe(swiperEl, { childList: true, subtree: true });
        }
    }

    // Initialize when document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeHandlers);
    } else {
        initializeHandlers();
    }
})();
