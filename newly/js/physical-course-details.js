// Physical Course Details Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Video Player Toggle
    // ========================================
    const videoPlayBtn = document.getElementById('videoPlayBtn');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoThumbnail = document.querySelector('.pcd-video-thumbnail');
    const videoOverlay = document.querySelector('.pcd-video-overlay');
    
    if (videoPlayBtn) {
        videoPlayBtn.addEventListener('click', function() {
            // Hide thumbnail and overlay
            if (videoThumbnail) videoThumbnail.style.display = 'none';
            if (videoOverlay) videoOverlay.style.display = 'none';
            
            // Show video player
            if (videoPlayer) {
                videoPlayer.style.display = 'block';
                
                // Auto-play video
                const iframe = videoPlayer.querySelector('iframe');
                if (iframe) {
                    const src = iframe.src;
                    iframe.src = src + (src.includes('?') ? '&' : '?') + 'autoplay=1';
                }
            }
        });
    }
    
    // ========================================
    // Module Accordion Toggle
    // ========================================
    const moduleHeaders = document.querySelectorAll('.pcd-module-header');
    
    moduleHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const moduleItem = this.parentElement;
            const isActive = moduleItem.classList.contains('active');
            
            // Close all other modules
            document.querySelectorAll('.pcd-module-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Toggle current module
            if (!isActive) {
                moduleItem.classList.add('active');
            }
        });
    });
    
    // ========================================
    // Testimonial Swiper Initialization
    // ========================================
    if (typeof Swiper !== 'undefined') {
        const testimonialSwiper = new Swiper('.pcd-testimonial-swiper', {
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
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });
    }
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
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
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.pcd-objective-card, .pcd-outcome-card, .pcd-competency-card, .pcd-module-item, .pcd-recognition-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // ========================================
    // Sticky Sidebar Behavior
    // ========================================
    // const enrollmentCard = document.querySelector('.pcd-enrollment-card');
    
    // if (enrollmentCard && window.innerWidth > 991) {
    //     window.addEventListener('scroll', function() {
    //         const scrollPosition = window.scrollY;
    //         const heroSection = document.querySelector('.pcd-hero');
            
    //         if (heroSection) {
    //             const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
                
    //             if (scrollPosition > heroBottom - 150) {
    //                 enrollmentCard.style.position = 'fixed';
    //                 enrollmentCard.style.top = '100px';
    //             } else {
    //                 enrollmentCard.style.position = 'sticky';
    //             }
    //         }
    //     });
    // }
    
    // ========================================
    // Counter Animation for Stats
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // Observe stats for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-count'));
                if (!isNaN(target)) {
                    animateCounter(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('[data-count]').forEach(el => {
        statsObserver.observe(el);
    });
    
    // ========================================
    // Enrollment Button Click Handler
    // ========================================
    const enrollButtons = document.querySelectorAll('.pcd-btn-enroll, .pcd-btn-primary');
    
    enrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // You can add enrollment form logic here
            console.log('Enroll button clicked');
        });
    });
    
    // ========================================
    // Mobile Menu Toggle (if needed)
    // ========================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // ========================================
    // Lazy Loading Images
    // ========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========================================
    // Form Validation (if enrollment form exists)
    // ========================================
    const enrollmentForm = document.querySelector('.enrollment-form');
    
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form validation logic here
            const formData = new FormData(this);
            
            // Example validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Submit form or show success message
                console.log('Form is valid, submitting...');
                // You can add AJAX submission here
            } else {
                console.log('Please fill in all required fields');
            }
        });
    }
    
    // ========================================
    // Add to Calendar Functionality
    // ========================================
    const addToCalendarBtn = document.querySelector('.add-to-calendar');
    
    if (addToCalendarBtn) {
        addToCalendarBtn.addEventListener('click', function() {
            const event = {
                title: 'CHRBP Physical Session',
                location: 'Kuala Lumpur, Malaysia',
                start: '2026-01-15T09:00:00',
                end: '2026-01-19T17:00:00',
                description: 'Certified Human Resource Business Partner - Physical Session'
            };
            
            // Create ICS file or integrate with calendar API
            console.log('Add to calendar clicked', event);
        });
    }
    
    // ========================================
    // Print Brochure
    // ========================================
    const printBrochureBtn = document.querySelector('.print-brochure');
    
    if (printBrochureBtn) {
        printBrochureBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // ========================================
    // Share Functionality
    // ========================================
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.dataset.platform;
            const url = window.location.href;
            const title = document.title;
            
            let shareUrl = '';
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
    
    // ========================================
    // Countdown Timer for Limited Seats
    // ========================================
    const seatsRemaining = document.querySelector('.pcd-seats-remaining');
    
    if (seatsRemaining) {
        // You can add real-time seat count updates here
        // This is just a placeholder for demonstration
        setInterval(() => {
            // Update seat count from server
            // seatsRemaining.querySelector('span').textContent = 'Only X seats remaining!';
        }, 60000); // Update every minute
    }
    
    console.log('Physical Course Details Page initialized successfully');
});

// ========================================
// Utility Functions
// ========================================

// Format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Debounce function for performance
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
