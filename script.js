// Performance optimized script
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS with optimized settings
    AOS.init({
        duration: 800,
        once: true,
        disable: 'mobile' // Disable animations on mobile for better performance
    });

    // Debounced scroll handler for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // Handle scroll events
        });
    });

    // Optimized smooth scroll
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

    // Mobile menu with improved touch response
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            body.classList.toggle('overflow-hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                body.classList.remove('overflow-hidden');
            }
        });
    }

    // Optimized form handling
    const handleFormSubmit = async (form, options = {}) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        try {
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + (options.loadingText || 'Processing...');
            
            // Simulate API call with timeout
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            if (options.successCallback) {
                options.successCallback();
            }
            
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            alert(options.errorMessage || 'An error occurred. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
        }
    };

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleFormSubmit(e.target, {
                loadingText: 'Subscribing...',
                successCallback: () => {
                    const successMessage = document.createElement('div');
                    successMessage.className = 'text-green-500 mt-2 text-sm';
                    successMessage.textContent = 'Thank you for subscribing!';
                    e.target.appendChild(successMessage);
                    setTimeout(() => successMessage.remove(), 3000);
                },
                errorMessage: 'Failed to subscribe. Please try again.'
            });
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleFormSubmit(e.target, {
                loadingText: 'Sending...',
                successCallback: () => {
                    alert('Thank you for your message. We\'ll get back to you soon!');
                },
                errorMessage: 'Failed to send message. Please try again.'
            });
        });
    }

    // Payment form handling
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            await handleFormSubmit(e.target, {
                loadingText: 'Processing payment...',
                successCallback: () => {
                    window.location.href = '/success.html';
                },
                errorMessage: 'Payment failed. Please try again.'
            });
        });
    }

    // Dynamic copyright year
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Feature card hover effects
    document.querySelectorAll('.feature-card').forEach(card => {
        const icon = card.querySelector('.feature-icon');
        if (icon) {
            card.addEventListener('mouseenter', () => icon.classList.add('floating'));
            card.addEventListener('mouseleave', () => icon.classList.remove('floating'));
        }
    });

    // Initialize any page-specific scripts
    const initPageSpecificScripts = () => {
        // Payment page
        const urlParams = new URLSearchParams(window.location.search);
        const plan = urlParams.get('plan');
        const billing = urlParams.get('billing');

        if (plan && document.getElementById('selected-plan')) {
            updatePlanDetails(plan, billing);
        }

        // Success page
        const userEmail = urlParams.get('email');
        if (userEmail && document.getElementById('user-email')) {
            document.getElementById('user-email').textContent = userEmail;
        }
    };

    initPageSpecificScripts();
});

// Utility function to update plan details
function updatePlanDetails(plan, billing) {
    const prices = {
        'Free': { monthly: 0, annual: 0 },
        'Pro': { monthly: 9.99, annual: 99.99 },
        'Premium': { monthly: 19.99, annual: 199.99 }
    };

    const selectedPlan = document.getElementById('selected-plan');
    const billingCycle = document.getElementById('billing-cycle');
    const planPrice = document.getElementById('plan-price');
    const totalPrice = document.getElementById('total-price');

    if (selectedPlan) selectedPlan.textContent = plan;
    if (billingCycle) billingCycle.textContent = billing === 'annual' ? 'Annual' : 'Monthly';

    const price = prices[plan]?.[billing] || prices['Pro'].monthly;
    if (planPrice) planPrice.textContent = `$${price}${billing === 'annual' ? '/year' : '/month'}`;
    if (totalPrice) totalPrice.textContent = `$${price}`;
}
