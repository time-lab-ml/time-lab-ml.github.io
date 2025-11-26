// Contact Component
export async function renderContact(containerId, options = {}) {
  const { isSubpage = false } = options;
  const basePath = isSubpage ? '../' : '';
  
  try {
    const response = await fetch(`${basePath}data/site.json`);
    const site = await response.json();
    
    const html = `
      <div class="contact-grid">
        <div class="contact-card">
          <div class="contact-icon">✉️</div>
          <h4>Get in Touch</h4>
          <p>For questions regarding the TIME 2026 workshop, please don't hesitate to reach out to us:</p>
          <p class="contact-info">
            <strong>Email:</strong><br>
            <a href="mailto:${site.email}">${site.email}</a>
          </p>
        </div>
        <div class="contact-card">
          <div class="contact-icon">🌐</div>
          <h4>Websites</h4>
          <p class="contact-info">
            <strong>Workshop Website:</strong><br>
            <a href="${site.websites.workshop}" target="_blank">${site.websites.workshop.replace('https://', '')}</a>
          </p>
          <p class="contact-info">
            <strong>WWW 2026 Conference:</strong><br>
            <a href="${site.websites.conference}" target="_blank">${site.websites.conference.replace('https://', '')}</a>
          </p>
        </div>
        <div class="contact-card">
          <div class="contact-icon">📱</div>
          <h4>More Information</h4>
          <p>Visit our official website and resources:</p>
          <div class="social-links">
            <a href="${site.websites.workshop}" target="_blank" class="social-link">Official Website</a>
            <a href="#" class="social-link">GitHub</a>
          </div>
        </div>
      </div>`;
    
    document.getElementById(containerId).innerHTML = html;
    
  } catch (error) {
    console.error('Error loading contact:', error);
  }
}
