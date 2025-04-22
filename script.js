window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.padding = '10px 0';
    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
  } else {
    navbar.style.padding = '15px 0';
    navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  }
});


document.addEventListener('DOMContentLoaded', function() {
  
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });

  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  
  const heroHeading = document.querySelector('.hero-content h1');
  const heroSubheading = document.querySelector('.hero-content h2');
  
  if (heroHeading) {
    
    heroHeading.innerHTML += '<span class="cursor">|</span>';
    const cursor = heroHeading.querySelector('.cursor');
    const text = heroHeading.innerHTML.replace('<span class="cursor">|</span>', '');
    heroHeading.innerHTML = '<span class="cursor">|</span>';
    
    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroHeading.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        setTimeout(typeWriter, 100);
      } else {
        
        cursor.style.animation = 'blink 1s infinite';
        
        if (heroSubheading) {
          setTimeout(() => {
            heroSubheading.style.opacity = '1';
            heroSubheading.style.transform = 'translateY(0)';
          }, 500);
        }
        
        const heroParagraphs = document.querySelectorAll('.hero-content p');
        heroParagraphs.forEach((p, index) => {
          setTimeout(() => {
            p.style.opacity = '1';
            p.style.transform = 'translateY(0)';
          }, 1000 + (index * 200));
        });
      }
    };
    
    setTimeout(typeWriter, 500);
  }

  
  if (heroSubheading) {
    heroSubheading.style.opacity = '0';
    heroSubheading.style.transform = 'translateY(20px)';
    heroSubheading.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  }
  
  document.querySelectorAll('.hero-content p').forEach(p => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(20px)';
    p.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  
  const skillCards = document.querySelectorAll('.skill-card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  skillCards.forEach((card, index) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const formElements = this.elements;
      
      
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      
      if (!name || !email || !message) {
        alert('Please fill all fields');
        return;
      }
      
      
      Array.from(formElements).forEach(element => {
        if (element.tagName !== 'BUTTON') {
          element.disabled = true;
        }
      });
      
      
      const submitButton = this.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      
      
      setTimeout(() => {
        
        Array.from(formElements).forEach(element => {
          if (element.tagName !== 'BUTTON') {
            element.disabled = false;
            element.value = '';
          }
        });
        
        
        const textarea = this.querySelector('textarea');
        if (textarea) textarea.value = '';
        
        
        submitButton.textContent = 'Message Sent!';
        
        
        setTimeout(() => {
          submitButton.textContent = originalButtonText;
        }, 3000);
      }, 1500);
    });
  }

  
  // Projects carousel functionality
  const projectsGrid = document.querySelector('.projects-grid');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const indicatorsContainer = document.querySelector('.project-indicators');
  
  if (projectsGrid && projectCards.length > 0) {
    // Create indicators
    projectCards.forEach((_, index) => {
      const indicator = document.createElement('div');
      indicator.classList.add('project-indicator');
      if (index === 0) indicator.classList.add('active');
      indicatorsContainer.appendChild(indicator);
      
      // Add click event to indicators
      indicator.addEventListener('click', () => {
        scrollToProject(index);
        updateIndicators(index);
      });
    });
    
    // Navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const currentIndex = getCurrentProjectIndex();
        const targetIndex = currentIndex > 0 ? currentIndex - 1 : 0;
        scrollToProject(targetIndex);
        updateIndicators(targetIndex);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const currentIndex = getCurrentProjectIndex();
        const maxIndex = projectCards.length - 1;
        const targetIndex = currentIndex < maxIndex ? currentIndex + 1 : maxIndex;
        scrollToProject(targetIndex);
        updateIndicators(targetIndex);
      });
    }
    
    // Detect scroll to update indicators
    projectsGrid.addEventListener('scroll', () => {
      const currentIndex = getCurrentProjectIndex();
      updateIndicators(currentIndex);
    });
    
    // Touch swipe functionality
    let startX, scrollLeft;
    
    projectsGrid.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - projectsGrid.offsetLeft;
      scrollLeft = projectsGrid.scrollLeft;
    }, { passive: true });
    
    projectsGrid.addEventListener('touchmove', (e) => {
      if (!startX) return;
      const x = e.touches[0].pageX - projectsGrid.offsetLeft;
      const distance = x - startX;
      projectsGrid.scrollLeft = scrollLeft - distance;
    }, { passive: true });
    
    projectsGrid.addEventListener('touchend', () => {
      startX = null;
      snapToProject();
    });
    
    function getCurrentProjectIndex() {
      const scrollPosition = projectsGrid.scrollLeft;
      const cardWidth = projectCards[0].offsetWidth + 30; // Width + gap
      return Math.round(scrollPosition / cardWidth);
    }
    
    function scrollToProject(index) {
      const cardWidth = projectCards[0].offsetWidth + 30; // Width + gap
      projectsGrid.scrollLeft = index * cardWidth;
    }
    
    function updateIndicators(activeIndex) {
      const indicators = document.querySelectorAll('.project-indicator');
      indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    function snapToProject() {
      const currentIndex = getCurrentProjectIndex();
      scrollToProject(currentIndex);
    }
    
    // Also handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      
      if (e.key === 'ArrowLeft') {
        const currentIndex = getCurrentProjectIndex();
        const targetIndex = Math.max(0, currentIndex - 1);
        scrollToProject(targetIndex);
        updateIndicators(targetIndex);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = getCurrentProjectIndex();
        const targetIndex = Math.min(projectCards.length - 1, currentIndex + 1);
        scrollToProject(targetIndex);
        updateIndicators(targetIndex);
      }
    });
  }
});


const revealElements = () => {
  const elements = document.querySelectorAll('.section-title, .about-content, .projects-grid, .contact-content');
  
  elements.forEach(element => {
    if (isElementInViewport(element) && !element.classList.contains('revealed')) {
      element.classList.add('revealed');
      element.style.opacity = 1;
      element.style.transform = 'translateY(0)';
    }
  });
};


const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 &&
    rect.bottom >= 0
  );
};


document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.section-title, .about-content, .projects-grid, .contact-content');
  
  elements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(50px)';
    element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });
  
  
  revealElements();
  window.addEventListener('scroll', revealElements);
});
