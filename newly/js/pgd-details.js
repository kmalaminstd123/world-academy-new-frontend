// PGD Program Details - Unit/Module Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Unit Accordion Toggle
    // ========================================
    const unitHeaders = document.querySelectorAll('.pgd-unit-header');
    
    unitHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const unitItem = this.closest('.pgd-unit-item');
            const isActive = unitItem.classList.contains('active');
            
            // Close all units
            document.querySelectorAll('.pgd-unit-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.pgd-unit-header').classList.remove('active');
            });
            
            // Open clicked unit if it wasn't active
            if (!isActive) {
                unitItem.classList.add('active');
                this.classList.add('active');
            }
        });
    });
    
    // Open first unit by default
    const firstUnit = document.querySelector('.pgd-unit-item');
    if (firstUnit) {
        firstUnit.classList.add('active');
        firstUnit.querySelector('.pgd-unit-header').classList.add('active');
    }
    
    // ========================================
    // Module Cards Hover Animation
    // ========================================
    const moduleCards = document.querySelectorAll('.pgd-module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) translateY(0)';
        });
    });
    
    // ========================================
    // Smooth Scroll to Modules Section
    // ========================================
    const viewCurriculumBtn = document.querySelector('a[href="#modules"]');
    
    if (viewCurriculumBtn) {
        viewCurriculumBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const modulesSection = document.getElementById('modules');
            if (modulesSection) {
                modulesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // ========================================
    // Unit Progress Indicator (Optional Enhancement)
    // ========================================
    function updateUnitProgress() {
        const totalUnits = document.querySelectorAll('.pgd-unit-item').length;
        const activeUnit = document.querySelector('.pgd-unit-item.active');
        
        if (activeUnit) {
            const unitNumber = activeUnit.querySelector('.pgd-unit-header').dataset.unit;
            console.log(`Viewing Unit ${unitNumber} of ${totalUnits}`);
        }
    }
    
    // Call on unit toggle
    unitHeaders.forEach(header => {
        header.addEventListener('click', updateUnitProgress);
    });

    // ========================================
    // FAQ Accordion Toggle
    // ========================================
    const faqQuestions = document.querySelectorAll('.pd-faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.pd-faq-item');
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.pd-faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
    
    // Open first FAQ by default
    const firstFaq = document.querySelector('.pd-faq-item');
    if (firstFaq) {
        firstFaq.classList.add('active');
    }
});
