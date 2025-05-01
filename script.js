// Performance optimized initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeAOS();
    setupMobileMenu();
    setupSmoothScroll();
    setupForms();
    updateCopyrightYear();
    handleURLParameters();
});

// Initialize AOS with optimized settings
function initializeAOS() {
    AOS.init({
        duration: 800,
        once: true,
        disable: 'mobile' // Disable animations on mobile for better performance
    });
}

// Mobile menu handling with improved touch response
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    let isMenuOpen = false;

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('hidden');
            body.style.overflow = isMenuOpen ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !mobileMenu.contains(e.target) && e.target !== menuButton) {
                mobileMenu.classList.add('hidden');
                body.style.overflow = '';
                isMenuOpen = false;
            }
        });
    }
}

// Smooth scroll with performance optimization
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without triggering scroll
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Optimized form handling
function setupForms() {
    setupNewsletterForm();
    setupContactForm();
    setupPaymentForm();
}

function setupNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const submitButton = form.querySelector('button[type="submit"]');

            if (!emailInput.value) return;

            try {
                submitButton.disabled = true;
                submitButton.innerHTML = 'Subscribing...';

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                showToast('Successfully subscribed to newsletter!', 'success');
                form.reset();
            } catch (error) {
                showToast('Failed to subscribe. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Subscribe';
            }
        });
    }
}

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');

            try {
                submitButton.disabled = true;
                submitButton.innerHTML = 'Sending...';

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                showToast('Message sent successfully!', 'success');
                form.reset();
            } catch (error) {
                showToast('Failed to send message. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send Message';
            }
        });
    }
}

function setupPaymentForm() {
    const form = document.getElementById('payment-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');

            try {
                submitButton.disabled = true;
                submitButton.innerHTML = 'Processing...';

                // Simulate payment processing
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Redirect to success page
                window.location.href = 'success.html?email=' + encodeURIComponent(form.email.value);
            } catch (error) {
                showToast('Payment failed. Please try again.', 'error');
                submitButton.disabled = false;
                submitButton.innerHTML = 'Complete Purchase';
            }
        });
    }
}

// Toast notification system
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } transform transition-transform duration-300 translate-y-full`;
    toast.textContent = message;

    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
    });

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateY(full)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Update copyright year
function updateCopyrightYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Handle URL parameters for dynamic content
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');

    // Update success page email if present
    const emailSpan = document.getElementById('user-email');
    if (emailSpan && email) {
        emailSpan.textContent = email;
    }

    // Handle subscription plan selection
    const plan = urlParams.get('plan');
    if (plan) {
        const planInput = document.querySelector(`input[name="plan"][value="${plan}"]`);
        if (planInput) {
            planInput.checked = true;
            updatePlanDetails(plan);
        }
    }
}

// Update plan details on the payment page
function updatePlanDetails(plan) {
    const planDetails = {
        free: { name: 'Free Plan', price: '$0/month' },
        pro: { name: 'Pro Plan', price: '$9.99/month' },
        premium: { name: 'Premium Plan', price: '$19.99/month' }
    };

    const selectedPlan = planDetails[plan] || planDetails.pro;
    const planNameElement = document.getElementById('selected-plan-name');
    const planPriceElement = document.getElementById('selected-plan-price');

    if (planNameElement) planNameElement.textContent = selectedPlan.name;
    if (planPriceElement) planPriceElement.textContent = selectedPlan.price;
}
