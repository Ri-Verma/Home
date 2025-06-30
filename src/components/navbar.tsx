import { useState, useEffect } from 'react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';

// Import GSAP and ScrollToPlugin for smooth scrolling
declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
    isNavigating: boolean;
  }
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const socialLinks = [
    { href: 'https://github.com/Ri-Verma', icon: <FiGithub />, label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/rishikesh-verma-aab4a1256/', icon: <FiLinkedin />, label: 'LinkedIn' },
    // { href: 'https://www.instagram.com/yourusername', icon: <FaInstagram />, label: 'Instagram' },
    // { href: 'https://x.com/yourusername', icon: <FaXTwitter />, label: 'X' },
    { href: 'https://leetcode.com/u/Ri_Verma/', icon: <SiLeetcode />, label: 'LeetCode' },
    { href: 'https://codeforces.com/profile/Ri-Verma', icon: <SiCodeforces />, label: 'Codeforces' },
  ];

  // Handle smooth scrolling with proper cleanup
  const handleScrollTo = (sectionId) => {
    setIsOpen(false); // Close mobile menu
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    // Set navigation flag to prevent conflicts
    window.isNavigating = true;
    
    // Kill any existing scroll animations
    if (window.gsap) {
      window.gsap.killTweensOf(window);
    }
    
    // Temporarily disable ScrollTrigger during navigation
    if (window.ScrollTrigger) {
      window.ScrollTrigger.disable();
    }
    
    // Reset all sections to relative positioning during navigation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
      if (window.gsap) {
        window.gsap.set(section, { 
          position: "relative", 
          clearProps: "transform,top,zIndex",
          immediateRender: true
        });
      }
    });
    
    // Calculate target position with navbar offset
    const elementTop = element.offsetTop;
    const navbarHeight = 80;
    const targetPosition = Math.max(0, elementTop - navbarHeight);
    
    // Use GSAP for smooth scrolling if available, otherwise use native scrollTo
    if (window.gsap) {
      window.gsap.to(window, {
        scrollTo: {
          y: targetPosition,
          autoKill: false
        },
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          // Re-enable ScrollTrigger after navigation completes
          if (window.ScrollTrigger) {
            window.ScrollTrigger.enable();
            // Small delay to ensure smooth transition
            setTimeout(() => {
              window.ScrollTrigger.refresh();
            }, 100);
          }
          
          // Clear navigation flag
          window.isNavigating = false;
          
          // Update active section
          setActiveSection(sectionId);
        }
      });
    } else {
      // Fallback to native smooth scroll
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Cleanup after fallback scroll
      setTimeout(() => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.enable();
          window.ScrollTrigger.refresh();
        }
        window.isNavigating = false;
        setActiveSection(sectionId);
      }, 1000);
    }
  };

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Don't update active section during navigation
      if (window.isNavigating) return;
      
      const sections = ['about', 'projects', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 120; // Increased offset for better detection
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check after a small delay to ensure sections are rendered
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener('scroll', throttledScroll);
  }, []);

  return (
    <nav className="shadow-xl bg-transparent backdrop-blur-xs top-0 fixed w-full z-50 bg-blend-color-dodge">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer">
              Portfolio
            </span>
          </div>
          {/* Social Icons Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {socialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-gray-300 hover:text-blue-400 transition-colors duration-300"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-blue-400 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Social Icons */}
      <div className={`md:hidden transition-all duration-300 ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex justify-center space-x-8 py-4 backdrop-blur-sm bg-black/20">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-300 hover:text-blue-400 transition-colors duration-300"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;