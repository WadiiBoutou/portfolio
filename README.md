# Modern Portfolio Website

A beautiful, responsive portfolio website with modern UI/UX design, smooth animations, and interactive features.

## Features

- **Modern Design**: Responsive portfolio with warm colors, labeled technology logos, and balanced project cards
- **3D Rotating Badge**: Continuously rotating badge showing profile picture and custom badge with mouse drag control
- **Dark Theme Toggle**: Magic UI Animated Theme Toggler with a saved preference and reduced-motion support
- **Bilingual Support**: Toggle between English and French (English is the default on every visit)
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
4. **Projects**: Display your portfolio projects
5. **Certificates**: Display your certifications and awards
6. **Contact**: Get in touch form with social links

## Technologies Used

- React and Vite
- HTML5 and CSS3 (with CSS Variables and Grid/Flexbox)
- JavaScript (ES modules)
- [Magic UI Animated Theme Toggler](https://magicui.design/docs/components/animated-theme-toggler)
- Google Fonts (Inter & Poppins)

## Getting Started

### Installation

1. Install Node.js 20.19+ or 22.12+.
2. Install dependencies with `npm install`.
3. Start the local development server with `npm run dev`.
4. Open the URL printed by Vite (normally `http://localhost:5173`).

Create a production build with `npm run build`; preview it locally with `npm run preview`.

The portfolio content is maintained in `portfolio-source.html` and rendered
inside the React/Vite shell. The Magic UI Animated Theme Toggler component is
copied into `src/ui/animated-theme-toggler.jsx`.

### Customization

The page content (including project cards, skill tags, links, and translations)
is in `portfolio-source.html`. Keep public assets under `public/` so Vite serves
them from the site root; for example, project images belong in `public/images/`
and CV files in `public/CV/`.

Update colors, responsive layouts, and animations in `styles.css`. The Magic UI
theme toggle is in `src/ui/animated-theme-toggler.jsx`, while the
React/Vite entry point is `src/main.jsx`. Existing site interactions remain in
`script.js`.

Use `npm run dev -- --port 3000` to preview on port 3000, `npm run build` to
create a production build, and `npm run preview` to serve that build locally.
