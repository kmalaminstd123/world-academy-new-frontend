// About Us Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Animated Counter for Stats
    // ========================================
    const statNumbers = document.querySelectorAll('.about-stat-number');
    
    const animateCounter = (element) => {
        const target = element.textContent.trim();
        const isPlus = target.includes('+');
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        
        if (isNaN(numericValue)) return;
        
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = numericValue / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                element.textContent = numericValue.toLocaleString() + (isPlus ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString() + (isPlus ? '+' : '');
            }
        }, duration / steps);
    };
    
    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // Add Scroll Animation to Cards
    // ========================================
    const cards = document.querySelectorAll('.about-stat-card, .about-affiliation-card, .about-office-card');
    
    const cardsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                cardsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardsObserver.observe(card);
    });
    
    // ========================================
    // Brochure Form Submission
    // ========================================
    const brochureForm = document.getElementById('brochureForm');
    
    if (brochureForm) {
        brochureForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                organization: document.getElementById('organization').value
            };
            
            // Show loading state
            const submitBtn = brochureForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Download Started!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                
                // Trigger download (replace with actual brochure URL)
                const link = document.createElement('a');
                link.href = '#'; // Replace with actual brochure PDF URL
                link.download = 'World-Academy-Corporate-Brochure.pdf';
                link.click();
                
                // Reset form after 3 seconds
                setTimeout(() => {
                    brochureForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
                
                // Log form data (replace with actual API call)
                console.log('Brochure download request:', formData);
            }, 1500);
        });
    }
});
