// TIME 2026 Workshop - Main JavaScript
// Modern, smooth interactions with premium feel

document.addEventListener('DOMContentLoaded', function() {
  // ===== Mobile Navigation Toggle =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a nav link
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = event.target.closest('nav');
      if (!isClickInsideNav && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
  
  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        return;
      }
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        
        // Calculate offset for fixed navbar
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ===== Navbar Scroll Effect =====
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
  
  // ===== Intersection Observer for Fade-in Animations =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  const animateElements = document.querySelectorAll('.theme-card, .speaker-card, .organizer-card, .topic-card, .announcement-card, .process-card');
  animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
  
  // Add fade-in class styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .navbar.scrolled {
      box-shadow: 0 4px 16px rgba(45, 122, 74, 0.12);
    }
  `;
  document.head.appendChild(style);
  
  // ===== Card Hover Effects Enhancement =====
  const cards = document.querySelectorAll('.theme-card, .speaker-card, .organizer-card, .topic-card, .contact-card, .process-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });
  
  // ===== Active Navigation Link Highlighting =====
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item a');
  
  function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
  // ===== Timeline Animation =====
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  const timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 100);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    timelineObserver.observe(item);
  });
  
  // ===== Form Validation (if needed for newsletter) =====
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Add your form submission logic here
      console.log('Form submitted');
    });
  });
  
  // ===== Lazy Load Images =====
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
  
  // ===== Parallax Effect for Hero Background =====
  const heroBackground = document.querySelector('.hero-background');
  
  if (heroBackground) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
  }
  
  // ===== Copy to Clipboard Functionality =====
  const codeBlocks = document.querySelectorAll('.code-block');
  codeBlocks.forEach(block => {
    const button = document.createElement('button');
    button.textContent = 'Copy';
    button.className = 'copy-btn';
    button.style.cssText = `
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.4rem 0.8rem;
      background: var(--color-primary);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.85rem;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    block.style.position = 'relative';
    block.appendChild(button);
    
    block.addEventListener('mouseenter', () => button.style.opacity = '1');
    block.addEventListener('mouseleave', () => button.style.opacity = '0');
    
    button.addEventListener('click', function() {
      const code = block.querySelector('code');
      if (code) {
        navigator.clipboard.writeText(code.textContent).then(() => {
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        });
      }
    });
  });
  
  // ===== Add Loading State to External Links =====
  const externalLinks = document.querySelectorAll('a[target="_blank"]');
  externalLinks.forEach(link => {
    link.addEventListener('click', function() {
      this.style.opacity = '0.6';
      setTimeout(() => {
        this.style.opacity = '1';
      }, 300);
    });
  });
  
  // ===== Console Welcome Message =====
  console.log('%c🎓 TIME 2026 Workshop', 'color: #2d7a4a; font-size: 24px; font-weight: bold;');
  console.log('%cThe Second International Workshop on Transformative Insights in Multi-faceted Evaluation', 'color: #555; font-size: 14px;');
  console.log('%cApril 13-14, 2026 | WWW 2026 | Dubai, UAE', 'color: #888; font-size: 12px;');
  
  // ===== Performance Monitoring =====
  if ('performance' in window) {
    window.addEventListener('load', function() {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
      }, 0);
    });
  }
  
  // ===== Scroll to Top Button (Optional) =====
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '↑';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(45, 122, 74, 0.3);
    z-index: 999;
  `;
  
  document.body.appendChild(scrollToTopBtn);
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = '1';
      scrollToTopBtn.style.visibility = 'visible';
    } else {
      scrollToTopBtn.style.opacity = '0';
      scrollToTopBtn.style.visibility = 'hidden';
    }
  });
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  scrollToTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px) scale(1.05)';
    this.style.boxShadow = '0 6px 24px rgba(45, 122, 74, 0.4)';
  });
  
  scrollToTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
    this.style.boxShadow = '0 4px 16px rgba(45, 122, 74, 0.3)';
  });
});

// ===== Utility Functions =====

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
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
