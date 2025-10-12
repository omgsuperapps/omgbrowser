# OMG Browser Extensions Website

A faithful recreation of the original OMG Browser extensions website with dynamic content management through JSON, maintaining the exact look and feel of the original design.

## Features

- 🚀 **Fast Loading** - Pure HTML/CSS/JavaScript for optimal performance
- 📱 **Responsive Design** - Matches original responsive behavior
- 🎨 **Original Design** - Exact replica of the original website styling
- 🖼️ **External Images** - Uses hosted images from GitHub, no local image management needed
- 🎠 **Bootstrap Carousels** - Interactive screenshot galleries for extensions
- 🔧 **Easy Management** - Update extensions via JSON file
- 📊 **Dynamic Loading** - All content loaded from JSON data

## Project Structure

```
omgnew/
├── 3rdpartyextensions.html    # Main 3rd party extensions page (ORIGINAL DESIGN)
├── index.html                 # Modern design homepage (alternative)
├── style-original.css         # Original website styling
├── script-original.js         # JavaScript for original design
├── styles.css                 # Modern design CSS (alternative)
├── script.js                  # Modern design JavaScript (alternative)
├── extensions.json            # Extensions data (edit this to add/modify extensions)
├── img/                       # Local images folder (if needed)
└── README.md                  # This file
```

## Main Files to Use

**For Original Design (Recommended):**
- `3rdpartyextensions.html` - Main page
- `style-original.css` - Original styling
- `script-original.js` - Original functionality

**For Modern Alternative:**
- `index.html` - Modern homepage
- `styles.css` - Modern styling
- `script.js` - Modern functionality

## Adding New Extensions

Edit the `extensions.json` file to add new extensions. The structure matches the original website:

```json
{
  "header": {
    "logo": "URL_TO_LOGO",
    "title": "OMG Browser",
    "subtitle": "One Browser for all",
    "downloadText": "Download",
    "downloadUrl": "../download/",
    "bgColor": "#E2DEDE",
    "textColor": "#161616",
    "comingSoonText": "More 3rd party extensions...",
    "sideImage": "URL_TO_IMAGE"
  },
  "extensions": [
    {
      "id": "extension-id",
      "name": "Extension Name",
      "description": "Extension description",
      "logo": "URL_TO_LOGO",
      "poster": "URL_TO_POSTER_IMAGE",
      "screenshots": ["URL1", "URL2", "URL3"],
      "category": "anime|ai|entertainment|web",
      "bgColor": "#COLOR_HEX",
      "textColor": "#COLOR_HEX",
      "hasCarousel": true|false,
      "downloadUrl": "#"
    }
  ]
}
```

## Original Color Scheme

The website uses these original color variables:

- **Green (#04DC77)** - AI/Tech extensions
- **Blue (#4F89EF)** - Entertainment extensions
- **Yellow (#F2DD2F)** - Web tools
- **Dark (#161616)** - Anime/Media extensions
- **Light Gray (#E2DEDE)** - Headers and backgrounds

## Image URLs

The JSON currently uses placeholder GitHub URLs. Update these with your actual hosted image URLs:

```
https://raw.githubusercontent.com/username/repo/main/Oldwebsite/img/filename.jpg
```

Replace with your actual:
- GitHub username
- Repository name
- Image filenames

## Local Development

1. **Clone/Download** the files
2. **Update image URLs** in `extensions.json`
3. **Open** `3rdpartyextensions.html` in browser
4. **Or use local server:**
   ```bash
   python3 -m http.server 8000
   # Visit: http://localhost:8000/3rdpartyextensions.html
   ```

## GitHub Pages Deployment

1. **Create GitHub repository** with all files
2. **Upload your original images** to `Oldwebsite/img/` folder
3. **Update JSON** with correct GitHub raw URLs
4. **Enable GitHub Pages** in repository settings
5. **Set main page** to `3rdpartyextensions.html` or create `index.html` redirect

Your website will be available at: `https://yourusername.github.io/repository-name/3rdpartyextensions.html`

## Original Website Structure Replicated

✅ **Header Section** - Logo, title, download button
✅ **Extensions Grid** - Individual colored blocks
✅ **Image Carousels** - Bootstrap carousel for screenshots
✅ **Original Typography** - Arvo font, exact sizing
✅ **Original Colors** - All original color variables
✅ **Responsive Design** - Mobile-friendly layout
✅ **Scroll to Top** - Floating scroll button
✅ **Lazy Loading Ready** - Preloader functionality

## Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers

## Notes

- **Images load from external URLs** - No need to manage local images
- **Bootstrap 5.1.3** used for carousels
- **Original CSS classes** preserved for authenticity
- **JSON-driven content** for easy updates
- **Faithful recreation** of the original design

## License

Open source. Modify and distribute freely.