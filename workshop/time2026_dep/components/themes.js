// Themes Component
export async function renderThemes(containerId, options = {}) {
  const { isSubpage = false } = options;
  const basePath = isSubpage ? '../' : '';
  
  try {
    const response = await fetch(`${basePath}data/themes.json`);
    const themes = await response.json();
    
    const themesHtml = themes.map(theme => `
          <div class="theme-card">
            <div class="theme-icon">${theme.icon}</div>
            <h4>${theme.title}</h4>
            <p>${theme.description}</p>
          </div>`).join('');
    
    const html = `
        <div class="themes-grid">
          ${themesHtml}
        </div>`;
    
    document.getElementById(containerId).innerHTML = html;
    
  } catch (error) {
    console.error('Error loading themes:', error);
  }
}
