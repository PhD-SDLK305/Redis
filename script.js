// Copy code functionality
function copyCode(button) {
    const codeBox = button.parentElement;
    const code = codeBox.querySelector('code').textContent;
    
    // Remove comment formatting for copy
    const cleanCode = code.replace(/<span class="comment">/g, '').replace(/<\/span>/g, '').replace(/<br>/g, '\n');
    
    navigator.clipboard.writeText(cleanCode).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.style.background = '#e0e0e0';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#ffffff';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        button.textContent = 'Error!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Generate config command
function generateConfig() {
    const name = document.getElementById('demo-name').value;
    const email = document.getElementById('demo-email').value;
    const output = document.getElementById('demo-config-output');
    
    if (name && email) {
        output.innerHTML = `
            <div style="color: #ffffff;">
                git config --global user.name "${name}"<br>
                git config --global user.email "${email}"
            </div>
        `;
    } else {
        output.innerHTML = '<div style="color: #cccccc;">Vui lòng nhập đầy đủ tên và email!</div>';
    }
}

// Highlight current section in nav
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollTop >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.style.background = 'rgba(255, 255, 255, 0.05)';
        link.style.color = '#ffffff';
        link.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        if (link.getAttribute('href') === '#' + current) {
            link.style.background = 'rgba(255, 255, 255, 0.1)';
            link.style.color = '#ffffff';
            link.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            link.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.2)';
        } else {
            link.style.boxShadow = 'none';
        }
    });
    
    lastScrollTop = scrollTop;
}, false);

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Animate cards on load
    document.querySelectorAll('.card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add typing effect to header (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add glow effect on hover for command boxes
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.command-box').forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.boxShadow = `
                inset 0 0 20px rgba(0, 0, 0, 0.8),
                0 0 20px rgba(255, 255, 255, 0.1),
                0 0 40px rgba(255, 255, 255, 0.05)
            `;
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.boxShadow = `
                inset 0 0 20px rgba(0, 0, 0, 0.8),
                0 0 10px rgba(255, 255, 255, 0.05)
            `;
        });
    });
});

// Add parallax effect to background (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('body');
    if (parallax) {
        parallax.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.blur();
        });
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.demo-btn, .copy-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// RESPONSIVE ENHANCEMENTS
// ============================================

// Make tables responsive on mobile
function makeTablesResponsive() {
    const tables = document.querySelectorAll('table');
    const isMobile = window.innerWidth <= 480;
    
    tables.forEach(table => {
        if (isMobile) {
            // Add data-label to each td based on th
            const headers = Array.from(table.querySelectorAll('th'));
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, index) => {
                    if (headers[index]) {
                        cell.setAttribute('data-label', headers[index].textContent);
                    }
                });
            });
        }
    });
}

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        makeTablesResponsive();
        // Recalculate scroll positions
        window.dispatchEvent(new Event('scroll'));
    }, 250);
});

// Initialize responsive features on load
document.addEventListener('DOMContentLoaded', () => {
    makeTablesResponsive();
    
    // Optimize scroll performance on mobile
    let ticking = false;
    const optimizedScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Scroll handling code runs here
                ticking = false;
            });
            ticking = true;
        }
    };
    
    // Use passive listeners for better mobile performance
    window.addEventListener('scroll', optimizedScroll, { passive: true });
    
    // Close mobile menu when clicking outside (if menu exists)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 480) {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && !navMenu.contains(e.target)) {
                // Could add menu close logic here if needed
            }
        }
    });
    
    // Prevent zoom on double tap (iOS)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Improve touch scrolling
    if ('ontouchstart' in window) {
        document.body.style.WebkitOverflowScrolling = 'touch';
    }
});

// Viewport height fix for mobile browsers
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);
setViewportHeight();

// Lazy load images if any are added in future
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Optimize command box scrolling on mobile
document.querySelectorAll('.command-box').forEach(box => {
    if ('ontouchstart' in window) {
        box.style.WebkitOverflowScrolling = 'touch';
        box.style.overflowX = 'auto';
    }
});

