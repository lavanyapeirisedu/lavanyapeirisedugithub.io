function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.feature-card, .course-card, .stat-card, .profile-card, .courses-enrolled, ' +
        '.contact-info, .form-container, .about-text, .about-image, .contact-item, ' +
        '.enrolled-course, .footer-section'
    );

    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
}

function initLiquidHover() {
    const cards = document.querySelectorAll('.feature-card, .course-card, .stat-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 212, 255, 0.15), transparent 50%), var(--glass-white)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });
}

function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-card .value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;

                if (text.includes('Rs.')) return;

                const number = parseInt(text);
                if (isNaN(number)) return;

                let current = 0;
                const increment = number / 50;
                const duration = 1000;
                const stepTime = duration / 50;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(current);
                }, stepTime);

                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

function initSmoothParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

function initGradientBorder() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-success');

    buttons.forEach(btn => {
        if (!btn.querySelector('.btn-bg')) {
            const bg = document.createElement('div');
            bg.className = 'btn-bg';
            bg.style.cssText = `
                position: absolute;
                top: -2px; left: -2px; right: -2px; bottom: -2px;
                background: linear-gradient(45deg, #00d4ff, #ff00ff, #8b5cf6, #00d4ff);
                background-size: 400% 400%;
                border-radius: inherit;
                z-index: -1;
                animation: gradientRotate 3s ease infinite;
                filter: blur(8px);
                opacity: 0;
                transition: opacity 0.3s;
            `;
            btn.style.position = 'relative';
            btn.style.zIndex = '1';
            btn.appendChild(bg);

            btn.addEventListener('mouseenter', () => {
                bg.style.opacity = '1';
            });
            btn.addEventListener('mouseleave', () => {
                bg.style.opacity = '0';
            });
        }
    });

    if (!document.getElementById('gradientRotateStyle')) {
        const style = document.createElement('style');
        style.id = 'gradientRotateStyle';
        style.textContent = `
            @keyframes gradientRotate {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
        `;
        document.head.appendChild(style);
    }
}

function initLiquidBlob() {
    const blob = document.createElement('div');
    blob.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(0, 212, 255, 0.15), transparent 70%);
        border-radius: 50%;
        filter: blur(40px);
        pointer-events: none;
        z-index: 0;
        transition: all 0.3s ease-out;
        left: -150px;
        top: -150px;
    `;
    document.body.appendChild(blob);

    document.addEventListener('mousemove', (e) => {
        blob.style.left = (e.clientX - 150) + 'px';
        blob.style.top = (e.clientY - 150) + 'px';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initLiquidHover();
    initAnimatedCounters();
    initSmoothParallax();
    initGradientBorder();
    initLiquidBlob();
});
