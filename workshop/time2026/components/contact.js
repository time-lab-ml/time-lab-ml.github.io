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
          <h4>More Information</h4>
          <p>Connect with us through our official channels:</p>
          <div class="social-links">
            <a href="${site.websites.workshop}" target="_blank" class="social-link">Official Website</a>
            ${site.social.linkedin ? `<a href="${site.social.linkedin}" target="_blank" class="social-link">LinkedIn</a>` : ''}
            ${site.social.twitter ? `<a href="${site.social.twitter}" target="_blank" class="social-link">Twitter/X</a>` : ''}
          </div>
        </div>
      </div>`;

    document.getElementById(containerId).innerHTML = html;

  } catch (error) {
    console.error('Error loading contact:', error);
  }
}
