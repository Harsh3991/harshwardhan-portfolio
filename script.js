// ==================== NAVIGATION ==================== //
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  
  // Animate hamburger
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = navMenu.classList.contains('active') 
    ? 'rotate(45deg) translate(5px, 5px)' 
    : '';
  spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
  spans[2].style.transform = navMenu.classList.contains('active') 
    ? 'rotate(-45deg) translate(7px, -6px)' 
    : '';
});

// Smooth scroll and close mobile menu
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu
      navMenu.classList.remove('active');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
    }
  });
});

// Active link highlight
window.addEventListener('scroll', () => {
  let current = '';
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ==================== SCROLL ANIMATIONS ==================== //
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      
      // Animate skill bars
      if (entry.target.classList.contains('skill-category')) {
        const progressBars = entry.target.querySelectorAll('.skill-progress');
        progressBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 300);
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.skill-category, .project-card, .cert-card, .small-project-card');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});

// ==================== CONTACT FORM ==================== //
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Compose mailto link
  const mailtoLink = `mailto:dhobleharshwardhan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
  
  // Open mail client
  window.location.href = mailtoLink;
  
  // Show success message
  alert('Thank you for your message! Your default email client should open now.');
  
  // Reset form
  contactForm.reset();
});

// ==================== TYPING EFFECT ==================== //
const heroTitle = document.querySelector('.hero-title');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';

let charIndex = 0;
function typeText() {
  if (charIndex < titleText.length) {
    heroTitle.textContent += titleText.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100);
  }
}

// Start typing when page loads
window.addEventListener('load', () => {
  setTimeout(typeText, 500);
});

// ==================== SCROLL TO TOP ==================== //
const createScrollToTop = () => {
  const button = document.createElement('button');
  button.innerHTML = '<i class="fas fa-arrow-up"></i>';
  button.className = 'scroll-to-top';
  button.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--gradient-primary);
    border: none;
    border-radius: 50%;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: var(--shadow-lg);
  `;
  
  document.body.appendChild(button);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      button.style.opacity = '1';
      button.style.visibility = 'visible';
    } else {
      button.style.opacity = '0';
      button.style.visibility = 'hidden';
    }
  });
  
  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
};

createScrollToTop();

// ==================== PRELOADER ==================== //
window.addEventListener('load', () => {
  const preloader = document.createElement('div');
  preloader.style.cssText = `
    position: fixed;
    inset: 0;
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
  `;
  
  preloader.innerHTML = `
    <div style="
      width: 50px;
      height: 50px;
      border: 4px solid var(--bg-tertiary);
      border-top-color: var(--primary);
      border-radius: 50%;
      animation: spin 1s linear infinite;
    "></div>
  `;
  
  document.body.prepend(preloader);
  
  setTimeout(() => {
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.remove();
    }, 500);
  }, 1000);
});

// Add spin animation
const style = document.createElement('style');
style.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

console.log('🚀 Portfolio loaded successfully!');
