// Intro Animation
document.addEventListener('DOMContentLoaded', () => {
    const intro = document.querySelector('.intro-animation');
    if (intro) {
        setTimeout(() => {
            intro.style.display = 'none';
        }, 3000);
    }

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true
    });

    // Smooth Scroll
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
});

// Mobile Menu
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        document.body.classList.toggle('overflow-hidden');
    });
}

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'text-green-500 mt-2 text-sm';
            successMessage.textContent = 'Thank you for subscribing! Check your email for confirmation.';
            e.target.appendChild(successMessage);
            
            // Reset form
            e.target.reset();
        } catch (error) {
            console.error('Subscription error:', error);
        } finally {
            submitBtn.innerHTML = originalText;
        }
    });
}

// Pricing Toggle
const pricingButtons = document.querySelectorAll('.pricing-btn, .pricing-btn-popular');
pricingButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const plan = btn.closest('.pricing-card').querySelector('h3').textContent;
        const isAnnual = document.querySelector('#annual-pricing')?.checked;
        
        // Redirect to payment page with plan details
        window.location.href = `/subscribe.html?plan=${encodeURIComponent(plan)}&billing=${isAnnual ? 'annual' : 'monthly'}`;
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', entry.target.dataset.animation);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animation]').forEach(el => observer.observe(el));

// Dynamic copyright year
document.querySelector('#copyright-year').textContent = new Date().getFullYear();

// Feature hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.feature-icon').classList.add('floating');
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.feature-icon').classList.remove('floating');
    });
});
