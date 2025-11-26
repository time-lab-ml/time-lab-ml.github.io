// Announcements Component - Renders announcements from JSON data

/**
 * Render a single announcement card
 * @param {Object} announcement - The announcement data
 * @returns {string} HTML string for the announcement card
 */
function renderAnnouncementCard(announcement) {
  const featuredClass = announcement.featured ? ' featured' : '';
  const badgeHtml = announcement.badge 
    ? `<div class="announcement-badge">${announcement.badge}</div>` 
    : '';
  
  // Render content paragraphs
  const contentHtml = announcement.content
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('\n            ');
  
  // Render list if exists
  const listHtml = announcement.list 
    ? `<ul>\n${announcement.list.map(item => `              <li>${item}</li>`).join('\n')}\n            </ul>` 
    : '';
  
  // Render link if exists
  let linkHtml = '';
  if (announcement.link) {
    const targetAttr = announcement.link.external ? ' target="_blank"' : '';
    linkHtml = `<a href="${announcement.link.url}" class="announcement-link"${targetAttr}>${announcement.link.text}</a>`;
  }

  return `
        <article class="announcement-card${featuredClass}">
          ${badgeHtml}
          <div class="announcement-header">
            <h3>${announcement.title}</h3>
            <span class="announcement-date">${announcement.date}</span>
          </div>
          <div class="announcement-content">
            ${contentHtml}
            ${listHtml}
            ${linkHtml}
          </div>
        </article>`;
}

/**
 * Render all announcements
 * @param {Array} announcements - Array of announcement objects
 * @returns {string} HTML string for all announcement cards
 */
function renderAnnouncements(announcements) {
  return announcements.map(renderAnnouncementCard).join('\n');
}

/**
 * Load and render announcements from JSON
 * @param {string} containerId - The ID of the container element
 * @param {string} dataPath - Path to the announcements JSON file
 */
async function loadAnnouncements(containerId = 'announcements-list', dataPath = '../data/announcements.json') {
  try {
    const response = await fetch(dataPath);
    if (!response.ok) {
      throw new Error(`Failed to load announcements: ${response.status}`);
    }
    
    const data = await response.json();
    const container = document.getElementById(containerId);
    
    if (container && data.announcements) {
      container.innerHTML = renderAnnouncements(data.announcements);
    }
  } catch (error) {
    console.error('Error loading announcements:', error);
  }
}

/**
 * Get the latest N announcements
 * @param {Array} announcements - Array of announcement objects
 * @param {number} count - Number of announcements to return
 * @returns {Array} Array of latest announcements
 */
function getLatestAnnouncements(announcements, count = 3) {
  return announcements.slice(0, count);
}

/**
 * Get featured announcements
 * @param {Array} announcements - Array of announcement objects
 * @returns {Array} Array of featured announcements
 */
function getFeaturedAnnouncements(announcements) {
  return announcements.filter(a => a.featured);
}

export { 
  loadAnnouncements, 
  renderAnnouncements, 
  renderAnnouncementCard,
  getLatestAnnouncements,
  getFeaturedAnnouncements
};
