// Hero Component
export async function renderHero(containerId, options = {}) {
  const { 
    isSubpage = false,
    title = null,
    subtitle = null,
    backgroundImage = null,
    id = 'home'
  } = options;
  
  const basePath = isSubpage ? '../' : '';
  
  try {
    const response = await fetch(`${basePath}data/site.json`);
    const site = await response.json();
    
    const heroTitle = title || site.title;
    const heroSubtitle = subtitle || `${site.location} | ${site.date}`;
    const bgImage = backgroundImage || `${basePath}assets/images/uae.jpg`;
    
    const html = `
  <section class="hero page-hero page-hero-corner" id="${id}">
    <div class="hero-background" style="background-image: url('${bgImage}');">
      <div class="hero-overlay"></div>
    </div>
    <div class="container">
      <div class="hero-content hero-content-corner">
        <h1 class="hero-title">${heroTitle}</h1>
        <p class="hero-subtitle">${heroSubtitle}</p>
      </div>
    </div>
  </section>`;
    
    document.getElementById(containerId).innerHTML = html;
    
  } catch (error) {
    console.error('Error loading hero:', error);
  }
}
