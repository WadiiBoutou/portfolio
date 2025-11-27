# Modern Portfolio Website

A beautiful, responsive portfolio website with modern UI/UX design, smooth animations, and interactive features.

## Features

- **Modern Design**: Clean and aesthetically pleasing interface with professional blue/yellow color scheme (consistent across light and dark modes)
- **3D Rotating Badge**: Continuously rotating badge showing profile picture and custom badge with mouse drag control
- **Dark Theme Toggle**: Switch between light and dark modes with saved preference
- **Bilingual Support**: Toggle between English and French with persistent language preference
- **Fully Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: Engaging scroll animations and transitions
- **Interactive Elements**: Hover effects, parallax scrolling, and custom cursor
- **Certificates Section**: Showcase your achievements and certifications
- **Contact Form**: Functional contact form with validation
- **Performance Optimized**: Fast loading with optimized assets

## Sections

1. **Hero Section**: Eye-catching introduction with rotating badge
2. **About**: Personal information with animated statistics
3. **Skills**: Showcase your expertise with beautiful cards
4. **Certificates**: Display your certifications and awards
5. **Projects**: Display your portfolio projects
6. **Contact**: Get in touch form with social links

## Technologies Used

- HTML5
- CSS3 (with CSS Variables and Grid/Flexbox)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter & Poppins)

## Getting Started

### Installation

1. Clone or download this repository
2. Open `index.html` in your browser

That's it! No build process or dependencies required.

### Customization

#### Update Your Information

1. **Personal Details**: Edit the text in `index.html`
   - Name, title, and description in the hero section
   - About section content
   - Contact information

2. **Profile Images**: 
   - Replace `pic.jpeg` with your profile photo (front of card)
   - Replace `image.png` with your badge/logo (back of card)
   - Recommended size: 500x500px
   - Square format works best for both images

3. **Projects**: Update the project cards with your actual projects
   - Add project images (create a `/images` folder)
   - Update project descriptions and technologies
   - Add links to live demos or repositories

4. **Skills**: Customize the skills section
   - Update skill categories
   - Modify the skill tags
   - Change icons (currently using inline SVG)

5. **Colors**: The website uses a professional blue/yellow color scheme
   
   **Light Mode:**
   - Primary: `#2563eb` (Blue)
   - Secondary: `#facc15` (Soft Yellow)
   - Background: Soft white → lavender-gray gradient (hero section only)
   
   **Dark Mode:**
   - Primary: `#2563eb` (Blue - same as light)
   - Secondary: `#facc15` (Yellow - same as light)
   - Background: Pure black `#000000`

6. **Social Links**: Update your social media links in the contact section

7. **Certificates**: Update the certificates section with your actual achievements

8. **Language**: Add more translations by updating the `data-en` and `data-fr` attributes

#### Interactive Features

- **Rotating Badge**: Click and drag to manually rotate, auto-rotates when released
- **Dark Mode**: Click the sun/moon icon in the navigation to toggle themes
- **Language Toggle**: Click "EN/FR" button to switch between English and French
- **Custom Cursor**: Enabled on desktop (can be disabled by removing the `createCursor()` call)
- **Typing Effect**: Uncomment line in `script.js` to enable typing animation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## File Structure

```
portfolio/
│
├── index.html          # Main HTML file
├── styles.css          # All styles and animations
├── script.js           # Interactive functionality
├── pic.jpeg           # Profile picture
└── README.md          # This file
```

## Performance Tips

1. **Optimize Images**: Compress your profile picture and project images
2. **Lazy Loading**: For project images, consider adding lazy loading
3. **Minimize HTTP Requests**: Keep resources consolidated

## Deployment

You can deploy this website to:

- **GitHub Pages**: Free and easy
- **Netlify**: Drag and drop deployment
- **Vercel**: Simple hosting solution
- Any static hosting service

### GitHub Pages Deployment

1. Create a new repository on GitHub
2. Push your code to the repository
3. Go to Settings > Pages
4. Select your main branch as the source
5. Your site will be live at `https://yourusername.github.io/repository-name`

## Customization Guide

### Adding New Projects

```html
<div class="project-card">
    <div class="project-image">
        <div class="project-overlay">
            <a href="#" class="project-link">View Project</a>
        </div>
    </div>
    <div class="project-content">
        <h3>Project Name</h3>
        <p>Project description goes here.</p>
        <div class="project-tags">
            <span class="tag">Tech 1</span>
            <span class="tag">Tech 2</span>
        </div>
    </div>
</div>
```

### Modifying Statistics

Update the `data-target` attribute in the About section:

```html
<h3 class="stat-number" data-target="50">0</h3>
```

## License

This project is open source and available under the MIT License.

## Contact

Feel free to reach out if you have any questions or suggestions!

---

**Made with ❤️ and modern web technologies**

