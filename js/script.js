// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between bars and times
    const icon = menuToggle.querySelector('i');
    if(navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Sticky Navigation
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Intersection Observer for Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // Unobserve after animating if we want it to happen only once
      // observer.unobserve(entry.target); 
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-up, .animate-left, .animate-right').forEach(el => {
  observer.observe(el);
});

// Animated Counters
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = +entry.target.getAttribute('data-target');
      const duration = 2000; // ms
      const increment = target / (duration / 16); // 60fps
      
      let current = 0;
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          entry.target.innerText = Math.ceil(current);
          requestAnimationFrame(updateCounter);
        } else {
          entry.target.innerText = target;
        }
      };
      
      updateCounter();
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// Simple form submission prevention for static demo
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Create luxury modal
    const modal = document.createElement('div');
    modal.className = 'luxury-modal';
    
    // Check if it's the newsletter or booking form based on inputs
    const isNewsletter = form.querySelector('input[type="email"]') && !form.querySelector('input[type="date"]');
    const title = isNewsletter ? 'Subscription Successful' : 'Reservation Request Sent';
    const message = isNewsletter 
      ? 'Thank you for subscribing to our newsletter. You will now receive exclusive offers and news.'
      : 'Thank you for your inquiry. A member of our concierge team will contact you shortly to confirm the details of your stay.';
    
    modal.innerHTML = `
      <div class="luxury-modal-content">
        <i class="fa-solid fa-envelope-open-text text-gold" style="font-size: 3rem; margin-bottom: 20px;"></i>
        <h3 style="font-family: var(--font-heading); font-size: 2rem; margin-bottom: 15px; color: var(--text-dark);">${title}</h3>
        <p style="color: #666; margin-bottom: 30px; font-size: 1.05rem;">${message}</p>
        <button class="btn btn-primary close-modal-btn">Close Window</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Trigger animation
    setTimeout(() => {
      modal.classList.add('active');
    }, 10);
    
    // Close modal logic
    modal.querySelector('.close-modal-btn').addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 400);
    });
    
    // Reset the form
    form.reset();
  });
});
