// ========================================
// Professional Program Details Page - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Module Accordion Functionality
    // ========================================
    const moduleItems = document.querySelectorAll('.pd-module-item');
    
    moduleItems.forEach(item => {
        const header = item.querySelector('.pd-module-header');
        
        header.addEventListener('click', () => {
            // Close all other modules
            moduleItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current module
            item.classList.toggle('active');
        });
    });
    
    // Open first module by default
    if (moduleItems.length > 0) {
        moduleItems[0].classList.add('active');
    }

    // ========================================
    // Testimonial Swiper Slider
    // ========================================
    const testimonialSwiper = new Swiper('.pd-testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // Mobile
            576: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            // Tablet
            768: {
                slidesPerView: 1,
                spaceBetween: 25,
            },
            // Desktop
            992: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
        },
    });
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
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
    
    // ========================================
    // Scroll Animations
    // ========================================
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
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.pd-objective-card, .pd-competency-card, .pd-recognition-card, .pd-application-card, .pd-assessment-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // ========================================
    // Progress Bar Animation
    // ========================================
    const progressBars = document.querySelectorAll('.pd-progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
    
    // ========================================
    // Sticky Enrollment Card (Desktop)
    // ========================================
    // const enrollmentCard = document.querySelector('.pd-enrollment-card');
    
    // if (enrollmentCard && window.innerWidth > 991) {
    //     window.addEventListener('scroll', () => {
    //         const scrollPosition = window.scrollY;
    //         const heroSection = document.querySelector('.pd-hero');
    //         const heroHeight = heroSection ? heroSection.offsetHeight : 0;
            
    //         if (scrollPosition > heroHeight - 200) {
    //             enrollmentCard.style.position = 'fixed';
    //             enrollmentCard.style.top = '100px';
    //         } else {
    //             enrollmentCard.style.position = 'sticky';
    //         }
    //     });
    // }
    
    // ========================================
    // Button Click Effects
    // ========================================
    const buttons = document.querySelectorAll('.pd-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // ========================================
    // Counter Animation for Stats
    // ========================================
    const stats = document.querySelectorAll('.pd-stat-item strong');
    
    const animateCounter = (element) => {
        const target = element.textContent;
        const isNumber = /^\d+\+?$/.test(target.replace(',', ''));
        
        if (isNumber) {
            const number = parseInt(target.replace(/[+,]/g, ''));
            const duration = 2000;
            const steps = 60;
            const increment = number / steps;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current).toLocaleString() + (target.includes('+') ? '+' : '');
                }
            }, duration / steps);
        }
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ========================================
    // Parallax Effect for Hero Section
    // ========================================
    // const hero = document.querySelector('.pd-hero');
    
    // if (hero) {
    //     window.addEventListener('scroll', () => {
    //         const scrolled = window.scrollY;
    //         const parallaxSpeed = 0.5;
    //         hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    //     });
    // }
    
    // ========================================
    // Mobile Menu Toggle (if needed)
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
    }
    
    // ========================================
    // Form Validation (if forms are added)
    // ========================================
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form validation logic here
            const formData = new FormData(this);
            console.log('Form submitted:', Object.fromEntries(formData));
            
            // Show success message
            alert('Thank you for your interest! We will contact you soon.');
        });
    });
    
    // ========================================
    // Lazy Loading Images
    // ========================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ========================================
    // Add to Calendar Functionality
    // ========================================
    const addToCalendarBtn = document.querySelector('.add-to-calendar');
    
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', function() {
            const eventDetails = {
                title: 'CHRG Program - 16th Batch',
                start: '2025-11-14T14:00:00',
                duration: '6 months',
                description: 'Certified Human Resource Generalist Program'
            };
            
            // Create calendar event (this is a simplified example)
            console.log('Add to calendar:', eventDetails);
            alert('Calendar event details copied!');
        });
    }
    
    // ========================================
    // Share Functionality
    // ========================================
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${title}%20${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // ========================================
    // Print Functionality
    // ========================================
    const printBtn = document.querySelector('.print-btn');
    
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // ========================================
    // Tooltip Initialization (if using Bootstrap tooltips)
    // ========================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    console.log('Program Details Page Initialized Successfully!');
});

// ========================================
    // Program Intro Video Player
    // ========================================
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoOverlay = document.querySelector('.pd-video-overlay');
    const videoThumbnail = document.querySelector('.pd-video-thumbnail');
    
    if (videoPlayBtn) {
        videoPlayBtn.addEventListener('click', function() {
            // Hide thumbnail and overlay
            if (videoThumbnail) videoThumbnail.style.display = 'none';
            if (videoOverlay) videoOverlay.style.display = 'none';
            
            // Show video player
            if (videoPlayer) {
                videoPlayer.style.display = 'block';
                
                // Auto-play video (for YouTube iframe)
                const iframe = videoPlayer.querySelector('iframe');
                if (iframe) {
                    const src = iframe.src;
                    // Add autoplay parameter if not already present
                    if (!src.includes('autoplay=1')) {
                        iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
                    }
                }
            }
        });
    }