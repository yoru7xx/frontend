import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const useGsapAnimations = () => {
  useEffect(() => {
    // Detect if device is mobile
    const isMobile = window.innerWidth < 768;

    // 1. Hero Section Animations (Home Page)
    const heroContent = document.querySelector(".gsap-hero-content");
    const heroImage = document.querySelector(".gsap-hero-image");

    if (heroContent) {
      gsap.fromTo(
        heroContent,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
    }

    if (heroImage) {
      gsap.fromTo(
        heroImage,
        { opacity: 0, x: 50, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: 0.7 }
      );
    }

    // 2. Generic Reveal Animations for all pages
    const revealElements = document.querySelectorAll(".gsap-reveal");
    
    revealElements.forEach((el) => {
      // Skip ScrollTrigger on mobile to prevent scroll issues
      if (isMobile) {
        // On mobile, just apply the final state immediately
        gsap.set(el, {
          opacity: 1,
          y: 0,
          visibility: "visible"
        });
      } else {
        // On desktop, use ScrollTrigger for scroll animations
        gsap.fromTo(
          el,
          { 
            opacity: 0, 
            y: 50,
            visibility: "hidden" 
          },
          {
            opacity: 1,
            y: 0,
            visibility: "visible",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%", // when the top of the element hits 85% of the viewport height
              toggleActions: "play none none none", // play once
              markers: false,
            },
          }
        );
      }
    });

    // Handle window resize to refresh ScrollTrigger
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
};
