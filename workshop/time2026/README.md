# TIME 2026 Workshop Website

The Second International Workshop on Transformative Insights in Multi-faceted Evaluation

Website for TIME 2026 workshop at The Web Conference 2026 (WWW 2026) in Dubai, UAE.

## 🌐 Live Website

The website is automatically deployed to GitHub Pages at:
- **Production URL**: `https://zichengpan.github.io/TIME2026-WWW/`

## 📁 Project Structure

```
TIME2026-WWW/
├── index.html              # Main homepage
├── pages/                  # Additional pages
│   ├── calls.html         # Call for papers
│   ├── important-dates.html
│   └── media.html         # Announcements and news
├── assets/                 # Static assets
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── _config.yml            # Jekyll configuration
├── Gemfile                # Ruby dependencies
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions deployment
```

## 📝 Making Updates

### Update Content

1. Edit HTML files in `pages/` or `index.html`
2. Update styles in `assets/css/style.css`
3. Modify JavaScript in `assets/js/main.js`

### Add Images

Place images in `assets/images/` and reference them as:
```html
<img src="assets/images/your-image.jpg" alt="Description">
```

For pages in `pages/` directory, use relative paths:
```html
<img src="../assets/images/your-image.jpg" alt="Description">
```

### Update Important Dates

Edit `pages/important-dates.html` to update deadlines and milestones.

### Add Announcements

Edit `pages/media.html` to add new announcements or news items.

## 🔧 Configuration

### _config.yml

Key settings:
- `baseurl`: `/TIME2026-WWW` (repository name)
- `url`: `https://zichengpan.github.io` (GitHub username)

### Excluded Files

The following are excluded from Jekyll build:
- `archive/` - Previous workshop materials
- `node_modules/`
- Development files (`.gitignore`, `Gemfile.lock`, etc.)

## 📦 Dependencies

- Jekyll 4.3.0
- jekyll-seo-tag
- jekyll-sitemap
- webrick

## 🛠️ Troubleshooting

### Build Failures

1. Check GitHub Actions logs in the "Actions" tab
2. Ensure all files are properly formatted
3. Verify paths in HTML files are correct

### Local Development Issues

```bash
# Clean Jekyll cache
bundle exec jekyll clean

# Rebuild
bundle exec jekyll serve --trace
```

### Page Not Found (404)

Make sure to use correct paths:
- From `index.html`: `pages/calls.html`
- From pages: `../index.html` or `../assets/css/style.css`

## 📧 Contact

For questions or issues:
- Email: time.workshop@griffith.edu.au
- Website: https://time.griffith.edu.au

## 📄 License

© 2026 TIME Workshop. All rights reserved.
