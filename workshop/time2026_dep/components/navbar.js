// Navbar Component
export async function renderNavbar(containerId, options = {}) {
  const { isSubpage = false } = options;
  const basePath = isSubpage ? '../' : '';
  
  try {
    const [siteRes, navRes] = await Promise.all([
      fetch(`${basePath}data/site.json`),
      fetch(`${basePath}data/navigation.json`)
    ]);
    
    const site = await siteRes.json();
    const navigation = await navRes.json();
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navItems = navigation.map(item => {
      const href = isSubpage ? item.pageHref : item.href;
      const isActive = (isSubpage && item.pageHref === currentPage) || 
                       (!isSubpage && item.href === currentPage);
      return `<li class="nav-item"><a href="${href}"${isActive ? ' class="active"' : ''}>${item.label}</a></li>`;
    }).join('\n          ');
    
    const html = `
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <a href="${isSubpage ? '../index.html' : ''}#home" class="nav-brand">
          <img src="${site.logo}" alt="TIME Lab Logo">
          <span class="brand-text">${site.title}</span>
        </a>
        <button class="hamburger" id="hamburger" aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul class="nav-menu" id="navMenu">
          ${navItems}
        </ul>
      </div>
    </div>
  </nav>`;
    
    document.getElementById(containerId).innerHTML = html;
    
    // Initialize hamburger menu
    initHamburgerMenu();
    initNavbarScrollEffect();
    
  } catch (error) {
    console.error('Error loading navbar:', error);
  }
}

function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

function initNavbarScrollEffect() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const applyState = () => {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', applyState, { passive: true });
  applyState(); // initial state
}
