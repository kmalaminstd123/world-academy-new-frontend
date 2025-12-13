// FAQ Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // FAQ Accordion Toggle
    // ========================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
                
                // Scroll to item if needed
                setTimeout(() => {
                    const rect = faqItem.getBoundingClientRect();
                    const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
                    
                    if (!isInView) {
                        faqItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                }, 400);
            }
        });
    });
    
    // ========================================
    // Category Filter
    // ========================================
    const filterButtons = document.querySelectorAll('.faq-filter-btn');
    const faqItems = document.querySelectorAll('.faq-item');
    const noResults = document.querySelector('.faq-no-results');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter FAQ items
            let visibleCount = 0;
            
            faqItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.classList.remove('hidden');
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                    item.classList.remove('active'); // Close hidden items
                }
            });
            
            // Show/hide no results message
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        });
    });
    
    // ========================================
    // Search Functionality
    // ========================================
    const searchInput = document.getElementById('faqSearch');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        let visibleCount = 0;
        
        // Reset category filter to "All" when searching
        if (searchTerm) {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            filterButtons[0].classList.add('active'); // Activate "All" button
        }
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.classList.remove('hidden');
                visibleCount++;
                
                // Highlight matching text (optional)
                if (searchTerm) {
                    item.style.order = question.includes(searchTerm) ? '-1' : '0';
                }
            } else {
                item.classList.add('hidden');
                item.classList.remove('active');
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0 && searchTerm) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
    });
    
    // ========================================
    // Entrance Animations
    // ========================================
    const faqContainer = document.querySelector('.faq-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    faqItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // ========================================
    // URL Hash Support (Deep Linking)
    // ========================================
    function openFAQFromHash() {
        const hash = window.location.hash;
        if (hash) {
            const targetItem = document.querySelector(hash);
            if (targetItem && targetItem.classList.contains('faq-item')) {
                // Close all items
                faqItems.forEach(item => item.classList.remove('active'));
                
                // Open target item
                targetItem.classList.add('active');
                
                // Scroll to item
                setTimeout(() => {
                    targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }
    }
    
    // Check hash on load
    openFAQFromHash();
    
    // Listen for hash changes
    window.addEventListener('hashchange', openFAQFromHash);
    
    // ========================================
    // Keyboard Navigation
    // ========================================
    document.addEventListener('keydown', function(e) {
        const activeItem = document.querySelector('.faq-item.active');
        
        if (!activeItem) return;
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextItem = activeItem.nextElementSibling;
            if (nextItem && nextItem.classList.contains('faq-item') && !nextItem.classList.contains('hidden')) {
                nextItem.querySelector('.faq-question').click();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevItem = activeItem.previousElementSibling;
            if (prevItem && prevItem.classList.contains('faq-item') && !prevItem.classList.contains('hidden')) {
                prevItem.querySelector('.faq-question').click();
            }
        }
    });
});
