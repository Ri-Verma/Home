import React, { useRef, useEffect, memo, useState } from "react";
import { SiReact, SiNodedotjs, SiPython} from "react-icons/si";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


// creating sections
const Section = ({ children, bgColor, bgImage, index, id }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !gsap) return;
    const scrollTrigger = gsap.fromTo(section, 
      {
        opacity: 0.8,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          refreshPriority: -1,

          id: `section-${id}` 
        }
      }
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!window.isNavigating) {
            if (entry.isIntersecting) {
              gsap.set(section, { position: "sticky", top: 0 });
            } else {
              gsap.set(section, { position: "relative" });
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (scrollTrigger.scrollTrigger) {
        scrollTrigger.scrollTrigger.kill();
      }
    };
  }, [id]);

  return (
    <div
      ref={sectionRef}
      className={`section min-h-screen w-full will-change-transform will-change-opacity relative`}
      id={id}
    >
      <div className={`w-full h-screen ${bgColor} relative`}>
        {bgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="h-full flex items-center justify-center relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

// floating particles animation 
const FloatingParticles = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!gsap || !containerRef.current) return;

    const particles = [];
    const container = containerRef.current;

    for (let i = 0; i < 120; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-2 h-2 bg-blue-600/70 rounded-full';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = Math.random() * window.innerHeight + 'px';
      container.appendChild(particle);
      particles.push(particle);

      gsap.to(particle, {
        x: `+=${Math.random() * 100 - 50}`,
        y: `+=${Math.random() * 100 - 50}`,
        scale: Math.random() * 0.7 + 0.7,
        opacity: Math.random() * 0.5 + 0.5,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2
      });
    }

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none"></div>;
};


const SkillCard = memo(({ icon, title, description, image, url }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!gsap || !cardRef.current) return;
    const card = cardRef.current;
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 30,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
          refreshPriority: -1
        }
      }
    );
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const CardContent = (
    <div className="flex flex-col items-center w-full h-full w-min-h-[420px]">
      {image && (
        <img src={image} alt={title} className="w-full h-36 object-cover rounded-t-lg mb-4" />
      )}
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white text-center">{title}</h3>
      <p className="text-gray-300 text-sm text-justify">{description}</p>
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline border-t border-white mt-4 pt-2 transition-colors duration-300">
          Follow Link
        </a>
    </div>
  );

  return (
    <div
      ref={cardRef}
      className="flex flex-col items-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all cursor-pointer w-full min-h-[420px] max-w-xs mx-auto shadow-lg"
    >
      {CardContent}
    </div>
  );
});

const Home = () => {
  const containerRef = useRef(null);
  const [mobileProjectIndex, setMobileProjectIndex] = useState(0);
  const [mobileCertIndex, setMobileCertIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  
  
  // project and certificate data
  const projects = [
    {
      image: "/lms.jpg",
      icon: <SiReact className="text-blue-500" />,
      title: "Learning Management System",
      url: "https://github.com/Ri-Verma/Learning-management-system",
      description: "Full-stack web application built with React, Node.js, and MongoDB. Features user authentication, course management, and real-time updates. with realtime differnt dashbord for students and Instructor. The application is designed to allowing users to access courses, track progress, and manage their learning journey efficiently."
    },
    {
      image: "/vehicle.jpg",
      icon: <SiPython className="text-yellow-500" />,
      title: "Vehicle Rental Control Hub tool",
      url: "https://github.com/Ri-Verma/Vehicle-Rental-Control-Hub",
      description: "Python-based user-friendly car rental application built with Python and MySQL for seamless booking and secure data management. All user and rental details are securely stored in an SQL database, ensuring data integrity. The intuitive interface enhances makes the rental process effortless and efficient."
    },
    {
      image: "/images.jpg",
      icon: <SiNodedotjs className="text-green-500" />,
      title: "Simmple E-commerce Platform",
      url: "https://github.com/Ri-Verma/E-commerce_Website",
      description: "MERN Stack based E-Commerce platform, featuring MongoDB for database management, React-Vite + Tailwind CSS for a dynamic frontend, and a Node.js + Express.js backend for seamless server operations. This project demonstrates my ability to develop robust, full-stack web applications."
    }
  ];
  const certificates = [
    {
      icon: "🔒",
      title: "Foundations of Cybersecurity",
      image: "/Coursera 0002.jpg",
      url: "https://coursera.org/share/351d5062023d9918c89370da9897aa20",
      description: "Recognize core skills and knowledge needed to become a cybersecurity analyst Identify how security attacks impact business operations, Explain security ethics, Identify common tools used by cybersecurity analysts"
    },
    {
      icon: "🔒",
      title: "Play It Safe: Manage Security Risks",
      image: "/Coursera 0001.jpg",
      url: "https://coursera.org/share/f161bcb5018b81cd9ee805085cad5d17",
      description: "Identify the primary threats, risks, and vulnerabilities to business operations, Examine how organizations use security frameworks and controls to protect business operations, Define commonly used Security Information and Event Management (SIEM) tools, Use a playbook to respond to threats, risks, and vulnerabilities"
    }
  ];

  // Swipe handlers 
  const handleProjectTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleProjectTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };
  // Swipe handlers for projects (looping)
  const handleProjectTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (diff > 50) {
        setMobileProjectIndex(i => (i + 1) % projects.length);
      } else if (diff < -50) {
        setMobileProjectIndex(i => (i - 1 + projects.length) % projects.length);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Swipe handlers 
  const handleCertTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleCertTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleCertTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (diff > 50) {
        setMobileCertIndex(i => (i + 1) % certificates.length);
      } else if (diff < -50) {
        setMobileCertIndex(i => (i - 1 + certificates.length) % certificates.length);
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div ref={containerRef} className="snap-start relative w-full">
      <div className="snap-start relative">
        {/* Front Page */}
        <Section id="about" bgColor="bg-[#020617]" bgImage="branden.jpg" index={1}>
          <FloatingParticles />
          <AboutMeAnimated mobileFix />
        </Section>
        {/* Projects Section */}
        <Section id="projects" bgColor="bg-[#030927]" bgImage="axville.jpg" index={2}>
          <div className="snap-start max-w-6xl mx-auto px-4">
            
            {isMobile ? (
              <div className="snap-start max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold mt-24 pt-16 text-center text-white">
              Featured Projects
            </h2>
              <div
                className="relative h-screen flex items-center justify-center w-full overflow-hidden"
                onTouchStart={handleProjectTouchStart}
                onTouchMove={handleProjectTouchMove}
                onTouchEnd={handleProjectTouchEnd}
              >
                {projects.map((p, idx) => {
                  const offset = idx - mobileProjectIndex;
                  const isActive = offset === 0;
                  return (
                    <div
                      key={idx}
                      className={`absolute transition-all duration-500 w-[85%] max-w-sm ${
                        isActive ? 'z-20 scale-100 opacity-100' : 'z-10 scale-90 opacity-60'
                      }`}
                      style={{
                        transform: `translate(-50%, -50%) scale(${isActive ? 1 : 0.9 - Math.abs(offset)*0.1})`,
                        left: '50%',
                        top: '50%',
                        filter: isActive ? 'none' : 'blur(2px)',
                        opacity: Math.abs(offset) > 1 ? 0 : (isActive ? 1 : 0.6),
                        zIndex: 10 - Math.abs(offset),
                        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                        display: Math.abs(offset) > 1 ? 'none' : 'block',
                      }}
                    >
                      <SkillCard {...p} />
                    </div>
                  );
                })}
              </div>
              </div>
            ) : (
              <div className="max-w-6xl mx-auto px-4 snap-start scroll-trigger-ready__worm-wrap">
                 <h2 className="text-4xl font-bold mb-12 text-white">
              Featured Projects
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  {projects.map((p, idx) => (
                  <SkillCard key={idx} {...p} />
                ))}
                </div>

                
              </div>
            )}
          </div>
        </Section>
        {/* Certifications Section */}
        <Section id="certifications" bgColor="bg-[#090927]" bgImage="lorenzo.jpg" index={3}>
          <div className="snap-start max-w-6xl mx-auto">
            
            {isMobile ? (
              <div className="snap-start max-w-6xl mx-auto px-4">
                <h2 className="text-4xl font-bold mt-24 pt-16 text-center text-white">
              Certifications
            </h2>
              <div
                className="relative h-screen flex items-center justify-center w-full overflow-visible"
            
                onTouchStart={handleCertTouchStart}
                onTouchMove={handleCertTouchMove}
                onTouchEnd={handleCertTouchEnd}
              >
                
                {certificates.map((c, idx) => {
                  const offset = idx - mobileCertIndex;
                  const isActive = offset === 0;
                  return (
                    <div
                      key={idx}
                      className={`absolute transition-all duration-500  w-[100%] max-w-sm ${
                        isActive ? 'z-20 scale-105 opacity-100' : 'z-10 scale-90 opacity-60'
                      }`}
                      style={{
                        transform: `translate(-50%, -50%) scale(${isActive ? 1. : 0.9 - Math.abs(offset)*0.1})`,
                        left: '50%',
                        top: '50%',
                        filter: isActive ? 'none' : 'blur(2px)',
                        opacity: Math.abs(offset) > 1 ? 0 : (isActive ? 1 : 0.6),
                        zIndex: 10 - Math.abs(offset),
                        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                        display: Math.abs(offset) > 1 ? 'none' : 'block',
                      }}
                    >
                      <SkillCard {...c} />
                    </div>
                  );
                })}
              </div>
              </div>
            ) : (   ///change here
              <div className="max-w-6xl mx-auto px-4 snap-start scroll-trigger-ready__worm-wrap">
                 <h2 className="text-4xl font-bold mb-12 text-white mt-10">
              Certifications
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  {certificates.map((c, idx) => (
                  <SkillCard key={idx} {...c} />
                ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      </div>
    </div>
  );
};

// --- About Me Section ---
const AboutMeAnimated = ({ mobileFix }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const overlayRef = useRef(null);
  const [expanded, setExpanded] = React.useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (!gsap || !imgRef.current || !textRef.current || !containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    // Initial setup
    gsap.set(textRef.current, {
      opacity: 0,
      y: isMobile ? 100 : 0,
      x: isMobile ? 0 : 50,
      scale: 1,
      filter: isMobile ? 'none' : 'blur(12px)'
    });
    gsap.set(imgRef.current, {
      scale: 1,
      y: isMobile ? -50 : 0
    });
    if (!expanded && isMobile) {
      gsap.to(imgRef.current, {
        scale: 1.05,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }
    return () => {
      if (isMobile) {
        gsap.killTweensOf(imgRef.current);
      }
    };
  }, [isMobile, expanded]);

  const handleExpand = () => {
    if (expanded) return;
    setExpanded(true);
    const tl = gsap.timeline({
      onComplete: () => setAnimationComplete(true)
    });
    if (isMobile) {
      gsap.killTweensOf(imgRef.current);
      tl.to(imgRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(imgRef.current, {
        width: '100%',
        height: '100%',
        borderRadius: '10',
        y: 0,
        x: 0,
        duration: 0.8,
        ease: 'power3.inOut',
      })
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, '-=0.3');
    } else {
      tl.to(imgRef.current, {
        zIndex: 30,
        backgroundColor: 'rgba(255,255,255,0)',
        boxShadow: '0 0 0 0 rgba(0,0,0,0)',
        duration: 0.5,
        ease: 'power2.inOut',
      })
      .to(imgRef.current, {
        width: '80%',
        height: '80%',
        maxWidth: '600px',
        maxHeight: '600px',
        minWidth: '260px',
        minHeight: '260px',
        borderRadius: '2rem',
        x: 0,
        duration: 1.1,
        ease: 'power4.inOut',
      }, '-=0.3')
      .to(textRef.current, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        ease: 'power3.out',
      }, '-=0.7');
    }
  };
  useEffect(() => {
    if (animationComplete) {
      gsap.to(textRef.current, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'power3.out',
      });
    }
  }, [animationComplete]);
  useEffect(() => {
    if (expanded && !isMobile) {
      gsap.to(overlayRef.current, {
        display: 'block',
        opacity: 0.5,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    } else {
      gsap.to(overlayRef.current, {
        display: 'none',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    }
  }, [expanded, isMobile]);
  return (
    <div
      ref={containerRef}
      className={`snap-start flex flex-col items-center justify-center w-full min-h-screen px-4 relative overflow-hidden pt-20 md:flex-row md:h-[520px] md:pt-0`}
    >
      <div
        ref={imgRef}
        className={`relative ${isMobile ? 'w-48 h-48 mb-6 rounded-2xl' : 'z-20 flex items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full -to-93% border-0 border-l-transparent transition-all duration-700'} overflow-hidden cursor-pointer transition-all duration-700 shadow-lg`}
        onClick={handleExpand}
        style={{
          transformOrigin: 'center center',
          zIndex: expanded ? 30 : 20,
          scale: expanded ? 1 : 1.05,
        }}
      >
        <img
          src="/hero-2.png"
          alt="Profile"
          className={`w-full h-full object-cover`}
          draggable="false"
        />
        {!expanded && (
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-gray-500 bg-white/80 px-2 py-0.5 rounded-full shadow">
            Tap Me
          </span>
        )}
      </div>
      <div
        ref={textRef}
        className={`w-full max-w-md bg-white/5 rounded-2xl p-6 shadow-xl backdrop-blur-md border border-white/10 text-white md:ml-12 md:p-8 md:w-[420px] ${isMobile ? '' : 'mt-8'}`}
        style={{
          opacity: 0,
          transform: isMobile ? 'translateY(50px)' : 'translateX(50px)',
          filter: isMobile ? 'none' : 'blur(12px)',
        }}
      >
        <h1 className={`font-bold mb-4 text-center ${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>About Me</h1>
        <p className={isMobile ? 'text-gray-200 text-base leading-relaxed text-center' : 'text-gray-200 text-lg leading-relaxed'}>
          Hi! I'm Rishikesh, a passionate full stack developer and cybersecurity enthusiast. 
          I love building modern web applications, exploring new technologies, and solving 
          real-world problems with code. My journey includes hands-on experience in React, 
          Node.js, Python, C++, and a growing expertise in security best practices. 
          Let's connect and create something amazing together!
        </p>
      </div>
      <div ref={overlayRef} style={{display: 'none'}} />
    </div>
  );
};
export default memo(Home);