// Professional Enov8 Help Portal JavaScript
// Enhanced functionality for better user experience

document.addEventListener('DOMContentLoaded', function() {
    initializePortal();
});

function initializePortal() {
    console.log('🚀 Enov8 Help Portal initialized');
    
    // Initialize all features
    setupSmoothScrolling();
    loadDynamicStats();
    setupInteractiveFeatures();
    setupSearchFunctionality();
    setupThemeToggle();
    
    // Add loading state management
    hideLoadingSpinner();
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Load dynamic statistics from API
async function loadDynamicStats() {
    try {
        // Simulate API calls to get real counts
        const stats = await Promise.all([
            fetchFAQCount(),
            fetchGuideCount(),
            fetchVideoCount()
        ]);
        
        updateStatCounters(stats);
    } catch (error) {
        console.log('Using default stats values');
        // Keep default values if API fails
    }
}

async function fetchFAQCount() {
    try {
        const response = await fetch('/api/faqs/count');
        const data = await response.json();
        return data.count || 150;
    } catch {
        return 150; // Default fallback
    }
}

async function fetchGuideCount() {
    try {
        const response = await fetch('/api/guides/count');
        const data = await response.json();
        return data.count || 75;
    } catch {
        return 75; // Default fallback
    }
}

async function fetchVideoCount() {
    try {
        const response = await fetch('/api/videos/count');
        const data = await response.json();
        return data.count || 50;
    } catch {
        return 50; // Default fallback
    }
}

function updateStatCounters([faqCount, guideCount, videoCount]) {
    const faqElement = document.getElementById('faq-count');
    const guideElement = document.getElementById('guide-count');
    const videoElement = document.getElementById('video-count');
    
    if (faqElement) faqElement.textContent = faqCount + '+';
    if (guideElement) guideElement.textContent = guideCount + '+';
    if (videoElement) videoElement.textContent = videoCount + '+';
}

// Interactive features and micro-interactions
function setupInteractiveFeatures() {
    // Add floating animation to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Staggered animation delay
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add pulse effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        setInterval(() => {
            ctaButton.style.transform = 'scale(1.05)';
            setTimeout(() => {
                ctaButton.style.transform = 'scale(1)';
            }, 200);
        }, 5000); // Pulse every 5 seconds
    }
    
    // Add typing effect to hero subtitle
    typeWriterEffect();
}

// Search functionality for better user experience
function setupSearchFunctionality() {
    // Create search overlay (hidden by default)
    const searchOverlay = createSearchOverlay();
    document.body.appendChild(searchOverlay);
    
    // Add keyboard shortcut for search (Ctrl/Cmd + K)
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleSearchOverlay();
        }
        
        if (e.key === 'Escape') {
            hideSearchOverlay();
        }
    });
}

function createSearchOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'search-overlay';
    overlay.className = 'search-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        backdrop-filter: blur(10px);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
    `;
    
    const searchBox = document.createElement('div');
    searchBox.className = 'search-box';
    searchBox.innerHTML = `
        <div style="background: white; border-radius: 15px; padding: 30px; max-width: 500px; width: 90%;">
            <h3 style="margin-bottom: 20px; color: #333;">Search Help Portal</h3>
            <input type="text" placeholder="Type to search FAQs, guides, videos..." 
                   style="width: 100%; padding: 15px; border: 2px solid #eee; border-radius: 10px; font-size: 16px; margin-bottom: 20px;">
            <div class="search-results" style="max-height: 300px; overflow-y: auto;"></div>
            <p style="color: #666; font-size: 14px; margin-top: 15px;">
                Press <kbd>Esc</kbd> to close • <kbd>Enter</kbd> to search
            </p>
        </div>
    `;
    
    overlay.appendChild(searchBox);
    
    // Add click outside to close
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            hideSearchOverlay();
        }
    });
    
    return overlay;
}

function toggleSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    if (overlay.style.display === 'flex') {
        hideSearchOverlay();
    } else {
        showSearchOverlay();
    }
}

function showSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    overlay.style.display = 'flex';
    const input = overlay.querySelector('input');
    setTimeout(() => input.focus(), 100);
}

function hideSearchOverlay() {
    const overlay = document.getElementById('search-overlay');
    overlay.style.display = 'none';
}

// Theme toggle functionality
function setupThemeToggle() {
    // Add theme toggle button (optional feature)
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    themeToggle.addEventListener('click', cycleColorScheme);
    document.body.appendChild(themeToggle);
}

function cycleColorScheme() {
    const body = document.body;
    const currentScheme = body.dataset.colorScheme || 'default';
    
    const schemes = ['default', 'ocean', 'sunset', 'forest'];
    const currentIndex = schemes.indexOf(currentScheme);
    const nextScheme = schemes[(currentIndex + 1) % schemes.length];
    
    body.dataset.colorScheme = nextScheme;
    applyColorScheme(nextScheme);
}

function applyColorScheme(scheme) {
    const root = document.documentElement;
    
    const schemes = {
        default: {
            primary: '#667eea',
            secondary: '#764ba2'
        },
        ocean: {
            primary: '#00c6ff',
            secondary: '#0072ff'
        },
        sunset: {
            primary: '#ff7e5f',
            secondary: '#feb47b'
        },
        forest: {
            primary: '#56ab2f',
            secondary: '#a8e6cf'
        }
    };
    
    if (schemes[scheme]) {
        root.style.setProperty('--primary-color', schemes[scheme].primary);
        root.style.setProperty('--secondary-color', schemes[scheme].secondary);
    }
}

// Typing effect for hero subtitle
function typeWriterEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let index = 0;
    const typeSpeed = 30;
    
    function typeChar() {
        if (index < originalText.length) {
            subtitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeChar, typeSpeed);
        }
    }
    
    // Start typing after a delay
    setTimeout(typeChar, 1000);
}

// Loading state management
function hideLoadingSpinner() {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
        spinner.style.opacity = '0';
        setTimeout(() => spinner.remove(), 300);
    }
}

// Performance monitoring
function monitorPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Page loaded in ${loadTime}ms`);
            
            // Send analytics if needed
            if (loadTime > 3000) {
                console.warn('⚠️ Slow page load detected');
            }
        });
    }
}

// Initialize performance monitoring
monitorPerformance();

// Export functions for external use
window.Enov8Portal = {
    showSearch: showSearchOverlay,
    hideSearch: hideSearchOverlay,
    updateStats: updateStatCounters,
    cycleTheme: cycleColorScheme
};
