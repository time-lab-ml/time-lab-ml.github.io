// Main App - Central module loader
import { renderNavbar } from './navbar.js';
import { renderFooter } from './footer.js';
import { renderHero } from './hero.js';
import { renderOrganizers } from './organizers.js';
import { renderThemes } from './themes.js';
import { renderContact } from './contact.js';

// Export all components
export {
  renderNavbar,
  renderFooter,
  renderHero,
  renderOrganizers,
  renderThemes,
  renderContact
};

// Initialize common components (navbar + footer)
export async function initCommon(options = {}) {
  const { isSubpage = false } = options;
  
  await Promise.all([
    renderNavbar('navbar-container', { isSubpage }),
    renderFooter('footer-container', { isSubpage })
  ]);
}

// Initialize home page
export async function initHomePage() {
  await initCommon({ isSubpage: false });
  
  await Promise.all([
    renderHero('hero-container', { isSubpage: false }),
    renderThemes('themes-container', { isSubpage: false }),
    renderContact('contact-container', { isSubpage: false })
  ]);
}

// Initialize subpage
export async function initSubpage(heroOptions = {}) {
  await initCommon({ isSubpage: true });
  
  if (heroOptions.title) {
    await renderHero('hero-container', { isSubpage: true, ...heroOptions });
  }
}
