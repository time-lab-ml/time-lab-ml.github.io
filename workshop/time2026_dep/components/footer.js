// Footer Component
export async function renderFooter(containerId, options = {}) {
  const { isSubpage = false } = options;
  const basePath = isSubpage ? '../' : '';
  
  try {
    const response = await fetch(`${basePath}data/site.json`);
    const site = await response.json();
    
    const html = `
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <p>&copy; 2026 TIME Workshop. All rights reserved.</p>
        <p><strong>TIME Lab</strong> | Griffith University</p>
        <p>Contact: <a href="mailto:${site.email}">${site.email}</a></p>
      </div>
    </div>
  </footer>`;
    
    document.getElementById(containerId).innerHTML = html;
    
  } catch (error) {
    console.error('Error loading footer:', error);
  }
}
