// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active nav link on scroll
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Smooth Scroll =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Animated Counter for Stats =====
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat);
                }
            });
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ===== Intersection Observer for Fade-in Animations =====
const fadeElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ===== Contact Form Handling =====
const initContactForm = () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Disable button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showNotification('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data.errors) {
                        showNotification(`Error: ${data.errors.map(e => e.message).join(', ')}`, 'error');
                    } else {
                        showNotification('Oops! There was a problem sending your message.', 'error');
                    }
                }
            } catch (error) {
                showNotification('Oops! There was a problem sending your message.', 'error');
            } finally {
                // Re-enable button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }
};

// ===== Custom Notification Function =====
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        animation: 'slideIn 0.3s ease',
        fontWeight: '500'
    });

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroText && heroImage) {
        heroText.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// ===== Rotating Badge with Mouse Drag Control =====
const flipCard = document.querySelector('.flip-card');
if (flipCard) {
    const flipCardInner = flipCard.querySelector('.flip-card-inner');
    let isDragging = false;
    let startX = 0;
    let currentRotation = 0;
    let animationRotation = 0;
    
    // Performance optimization: check if device can handle complex animations
    const isLowEndDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                          (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) ||
                          window.innerWidth < 768;
    
    // Disable drag on low-end devices
    if (isLowEndDevice) {
        flipCard.style.cursor = 'default';
        // Don't return here - just skip the drag event listeners
    } else {
    
    // Get current rotation from animation
    const getCurrentRotation = () => {
        const transform = window.getComputedStyle(flipCardInner).transform;
        if (transform && transform !== 'none') {
            const values = transform.split('(')[1].split(')')[0].split(',');
            const a = parseFloat(values[0]);
            const b = parseFloat(values[1]);
            const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
            return angle < 0 ? angle + 360 : angle;
        }
        return 0;
    };
    
        // Only add drag functionality on capable devices
        flipCard.addEventListener('mousedown', (e) => {
            e.preventDefault(); // Prevent image drag
            isDragging = true;
            startX = e.clientX;
            flipCard.classList.add('dragging');
            
            // Pause animation and get current rotation
            flipCardInner.classList.add('paused');
            currentRotation = getCurrentRotation();
            flipCardInner.style.animation = 'none';
            flipCardInner.style.transform = `rotateY(${currentRotation}deg)`;
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const rotationDelta = deltaX * 0.5; // Sensitivity
            const newRotation = currentRotation + rotationDelta;
            
            flipCardInner.style.transform = `rotateY(${newRotation}deg)`;
        });
        
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            
            isDragging = false;
            flipCard.classList.remove('dragging');
            
            // Get final rotation and resume animation from that point
            const finalRotation = getCurrentRotation();
            
            // Create new animation starting from current position
            flipCardInner.style.animation = 'none';
            flipCardInner.offsetHeight; // Force reflow
            flipCardInner.style.transform = `rotateY(${finalRotation}deg)`;
            
            // Resume rotation after a brief moment
            setTimeout(() => {
                flipCardInner.classList.remove('paused');
                flipCardInner.style.animation = 'continuousRotate 6s linear infinite';
                flipCardInner.style.animationDelay = `-${(finalRotation / 360) * 6}s`;
            }, 100);
        });
    }
}

// ===== Cursor Animation (Optional - adds a custom cursor effect) =====
const createCursor = () => {
    // Skip cursor animation on mobile devices for better performance
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
        window.innerWidth < 768) {
        return;
    }
    
    const cursor = document.createElement('div');
    const cursorFollower = document.createElement('div');
    
    cursor.className = 'custom-cursor';
    cursorFollower.className = 'cursor-follower';
    
    Object.assign(cursor.style, {
        width: '10px',
        height: '10px',
        border: '2px solid #6366f1',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9999',
        transition: 'transform 0.1s ease'
    });
    
    Object.assign(cursorFollower.style, {
        width: '40px',
        height: '40px',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '50%',
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '9998',
        transition: 'all 0.15s ease'
    });
    
    // Only add custom cursor on desktop
    if (window.innerWidth > 768) {
        document.body.appendChild(cursor);
        document.body.appendChild(cursorFollower);
        
        let mouseX = 0;
        let mouseY = 0;
        let followerX = 0;
        let followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });
        
        // Smooth follower animation
        const animateFollower = () => {
            const dx = mouseX - followerX;
            const dy = mouseY - followerY;
            
            followerX += dx * 0.1;
            followerY += dy * 0.1;
            
            cursorFollower.style.left = (followerX - 20) + 'px';
            cursorFollower.style.top = (followerY - 20) + 'px';
            
            requestAnimationFrame(animateFollower);
        };
        
        animateFollower();
        
        // Cursor hover effects
        const interactiveElements = document.querySelectorAll('a, button, .btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.3)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
    }
};

// Initialize custom cursor
createCursor();

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
    
    // Add stagger animation to hero elements
    const heroElements = document.querySelectorAll('.fade-in, .fade-in-delay-1, .fade-in-delay-2, .fade-in-delay-3');
    heroElements.forEach(el => {
        el.style.opacity = '0';
        setTimeout(() => {
            el.style.opacity = '1';
        }, 100);
    });
});

// ===== Scroll Reveal Animation =====
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.about-text, .section-title');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize reveal elements
document.querySelectorAll('.about-text, .section-title').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
});

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===== Typing Effect for Hero Subtitle (Optional Enhancement) =====
const createTypingEffect = () => {
    const subtitle = document.querySelector('.hero-text h2');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let index = 0;
    const typeSpeed = 50;
    
    const type = () => {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, typeSpeed);
        }
    };
    
    // Start typing effect after a delay
    setTimeout(type, 800);
};

// Uncomment the line below to enable typing effect
// createTypingEffect();

// ===== Dark Theme Toggle =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // Save preference
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    
    // Optional: Add a brief animation to toggle button
    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});

// Images are now theme-based only, not language-dependent
// Removed updateBadgeImages function as images are controlled by CSS based on theme

// ===== Language Toggle =====
const langToggle = document.getElementById('lang-toggle');
const langText = document.querySelector('.lang-text');

// Check for saved language preference or default to English
let currentLang = localStorage.getItem('language') || 'en';

const cvDownloadButton = document.getElementById('cv-download-btn');
const cvDownloadPaths = {
    en: 'CV/CV%20english%20wadii%20boutou.pdf',
    fr: 'CV/CV%20francais%20wadii%20boutou.pdf'
};
const cvDownloadFilenames = {
    en: 'CV english wadii boutou.pdf',
    fr: 'CV francais wadii boutou.pdf'
};
const cvButtonLabels = {
    en: 'Download CV',
    fr: 'Télécharger CV'
};

const updateCvDownloadLink = () => {
    if (!cvDownloadButton) return;
    const langKey = currentLang === 'fr' ? 'fr' : 'en';
    cvDownloadButton.href = cvDownloadPaths[langKey];
    cvDownloadButton.setAttribute('download', cvDownloadFilenames[langKey]);
    const titleText = cvDownloadButton.dataset[langKey === 'fr' ? 'frTitle' : 'enTitle'] || cvButtonLabels[langKey];
    cvDownloadButton.title = titleText;
    cvDownloadButton.setAttribute('aria-label', cvButtonLabels[langKey]);
};

// Function to update all text content
const updateLanguage = (lang) => {
    const elements = document.querySelectorAll('[data-en]');
    
    elements.forEach(element => {
        const text = lang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-fr');
        if (text) {
            // For input and textarea elements, update placeholder instead of textContent
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = text;
            } else {
                element.textContent = text;
            }
        }
    });
    
    // Update button text
    langText.textContent = lang === 'en' ? 'FR' : 'EN';
};

// Set initial language
updateLanguage(currentLang);
updateCvDownloadLink();

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    updateLanguage(currentLang);
    updateCvDownloadLink();
    localStorage.setItem('language', currentLang);
    
    // Optional: Add a brief animation
    langToggle.style.transform = 'scale(1.2)';
    setTimeout(() => {
        langToggle.style.transform = 'scale(1)';
    }, 200);
});

// Initialize contact form
initContactForm();

// ===== Image Modal =====
const projectImages = {
    quizapp: [
        'images/quizapp/quizz1.png',
        'images/quizapp/quizz2.png',
        'images/quizapp/quizz3.png',
        'images/quizapp/quizz4.png',
        'images/quizapp/quizz5.png',
        'images/quizapp/quizz6.png'
    ],
    evoleo: [
        'images/evoleo/evol1.png',
        'images/evoleo/evol2.png',
        'images/evoleo/evol3.png',
        'images/evoleo/evol4.png'
    ],
    tenmar: [
        'images/tenmar/tenmar1.png',
        'images/tenmar/tenmar2.png',
        'images/tenmar/tenmar3.png',
        'images/tenmar/tenmar4.png',
        'images/tenmar/tenmar5.png'
    ]
};

let currentImages = [];
let currentImageIndex = 0;
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const prevButton = document.querySelector('.modal-nav-prev');
const nextButton = document.querySelector('.modal-nav-next');
const indicatorsContainer = document.querySelector('.modal-indicators');

// Function to create indicators based on number of images
function createIndicators(count) {
    indicatorsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const indicator = document.createElement('span');
        indicator.className = 'modal-indicator';
        if (i === 0) indicator.classList.add('active');
        indicator.setAttribute('data-index', i);
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = i;
            updateModalImage();
            updateIndicators();
        });
        indicatorsContainer.appendChild(indicator);
    }
}

// Open modal when clicking on project overlays
function setupProjectModal(projectName) {
    const overlay = document.querySelector(`[data-project="${projectName}"].project-overlay`);
    if (overlay) {
        overlay.style.cursor = 'pointer';
        overlay.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            openModal(projectName, 0);
        });
        
        const linkContent = overlay.querySelector('.project-link-content');
        if (linkContent) {
            linkContent.style.pointerEvents = 'none';
        }
    }
}

// Setup modals for featured projects
setupProjectModal('quizapp');
setupProjectModal('evoleo');
setupProjectModal('tenmar');

function openModal(projectName, index) {
    currentImages = projectImages[projectName] || [];
    currentImageIndex = index;
    createIndicators(currentImages.length);
    updateModalImage();
    updateIndicators();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function updateModalImage() {
    if (currentImages.length > 0) {
        modalImage.src = currentImages[currentImageIndex];
    }
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.modal-indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentImageIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function showNextImage() {
    if (currentImages.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % currentImages.length;
        updateModalImage();
        updateIndicators();
    }
}

function showPrevImage() {
    if (currentImages.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
        updateModalImage();
        updateIndicators();
    }
}

// Event listeners
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
}

if (nextButton) {
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });
}

if (prevButton) {
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
}

// Indicator clicks are now handled in createIndicators function

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeModal();
    } else if (e.key === 'ArrowRight') {
        showNextImage();
    } else if (e.key === 'ArrowLeft') {
        showPrevImage();
    }
});

// ===== Project Image Slideshow on Hover =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const slideshow = card.querySelector('.project-slideshow');
    if (!slideshow) return;
    
    const slides = slideshow.querySelectorAll('.slideshow-slide');
    if (slides.length <= 1) return;
    
    let currentSlide = 0;
    let slideshowInterval = null;
    
    // Function to show next slide
    const showNextSlide = () => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };
    
    // Start slideshow on hover
    card.addEventListener('mouseenter', () => {
        // Start the slideshow with 2 second intervals
        slideshowInterval = setInterval(showNextSlide, 2000);
    });
    
    // Stop slideshow when mouse leaves
    card.addEventListener('mouseleave', () => {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }
        
        // Reset to first slide
        slides[currentSlide].classList.remove('active');
        currentSlide = 0;
        slides[currentSlide].classList.add('active');
    });
});

