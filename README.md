# Rishikesh's Portfolio Website

This is a modern, responsive portfolio website built with React, TypeScript, Tailwind CSS, and GSAP animations. It showcases my projects, certifications, and skills as a full stack developer and cybersecurity enthusiast.

## Features

- **Responsive Design:** Looks great on all devices (desktop, tablet, mobile)
- **Animated Sections:** Smooth GSAP-powered scroll and card animations
- **Project Carousel:** Swipeable project and certificate cards on mobile
- **Sticky/Snap Sections:** Each section snaps to the top for a clean navigation experience
- **Social Links:** Quick access to GitHub, LinkedIn, LeetCode, Codeforces, and more
- **About Me:** Interactive, animated introduction section

## Tech Stack

- [React](https://react.dev/) (with TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [GSAP](https://greensock.com/gsap/) (GreenSock Animation Platform)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Vite](https://vitejs.dev/) (for fast development)

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ri-Verma/portfolio-website.git
   cd portfolio-website/frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal)

## Folder Structure

- `src/pages/landing.tsx` - Main landing page with all sections
- `src/components/navbar.tsx` - Responsive navigation bar
- `src/components/footer.tsx` - (Optional) Footer component
- `src/index.css` - Tailwind and custom styles

## Customization

- **Update your projects/certificates:**
  Edit the `projects` and `certificates` arrays in `landing.tsx` to showcase your own work.
- **Profile Image:**
  Replace `/hero-2.png` or `/me-png.png` with your own image in the `public` folder.
- **Social Links:**
  Update the `socialLinks` array in `navbar.tsx` with your own profiles.

## Deployment

You can deploy this site easily to Vercel, Netlify, GitHub Pages, or any static hosting provider.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ by Rishikesh Verma**
