import React, { useRef, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import type { ButtonProps } from "@chakra-ui/react";
import gsap from "gsap";

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  animationType?: "fade" | "scale" | "slide-up" | "slide-right" | "fade-scale";
  triggerOnScroll?: boolean;
  threshold?: number;
  once?: boolean;
  hoverScale?: number;
  hoverSpeed?: number; // New prop for hover animation speed
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  duration = 0.4,
  delay = 0,
  animationType = "fade",
  triggerOnScroll = false,
  threshold = 0.2,
  once = true,
  hoverScale = 1.1,
  hoverSpeed = 0.15, // Default hover animation speed (faster than before)
  ...buttonProps
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hoverTween = useRef<gsap.core.Tween | null>(null);

  // Set initial styles based on animation type
  useEffect(() => {
    if (!buttonRef.current) return;

    // Initial animation state
    switch (animationType) {
      case "fade":
        gsap.set(buttonRef.current, { opacity: 0 });
        break;
      case "scale":
        gsap.set(buttonRef.current, { scale: 0.5, opacity: 0 });
        break;
      case "slide-up":
        gsap.set(buttonRef.current, { y: 30, opacity: 0 });
        break;
      case "slide-right":
        gsap.set(buttonRef.current, { x: -30, opacity: 0 });
        break;
      case "fade-scale":
        gsap.set(buttonRef.current, { scale: 0.8, opacity: 0 });
        break;
      default:
        gsap.set(buttonRef.current, { opacity: 0 });
    }

    // If not triggered on scroll, play animation immediately with delay
    if (!triggerOnScroll) {
      animateButton(delay);
    }

    // Add hover event listeners
    const button = buttonRef.current;
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("focus", handleMouseEnter); // For accessibility
    button.addEventListener("blur", handleMouseLeave); // For accessibility

    // Clean up event listeners
    return () => {
      if (button) {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
        button.removeEventListener("focus", handleMouseEnter);
        button.removeEventListener("blur", handleMouseLeave);
      }
    };
  }, [animationType, delay, triggerOnScroll, hoverScale, hoverSpeed]);

  // Handle hover events with GSAP
  const handleMouseEnter = () => {
    if (!buttonRef.current) return;

    // Kill any existing animation
    if (hoverTween.current) {
      hoverTween.current.kill();
    }

    // Create new hover animation
    hoverTween.current = gsap.to(buttonRef.current, {
      scale: hoverScale,
      duration: hoverSpeed, // Use the new prop
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;

    // Kill any existing animation
    if (hoverTween.current) {
      hoverTween.current.kill();
    }

    // Return to normal scale
    hoverTween.current = gsap.to(buttonRef.current, {
      scale: 1,
      duration: hoverSpeed, // Use the new prop
      ease: "power2.out",
    });
  };

  // Handle scroll-triggered animation using Intersection Observer
  useEffect(() => {
    if (!triggerOnScroll || !buttonRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateButton(delay);
            if (once && observerRef.current) {
              observerRef.current.disconnect();
            }
          }
        });
      },
      { threshold }
    );

    observerRef.current.observe(buttonRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [animationType, duration, delay, threshold, once, triggerOnScroll]);

  // Animate function to be called when not using scroll trigger
  const animateButton = (entryDelay = 0) => {
    if (!buttonRef.current) return;

    switch (animationType) {
      case "fade":
        gsap.to(buttonRef.current, {
          opacity: 1,
          duration,
          delay: entryDelay,
          ease: "power2.out",
        });
        break;
      case "scale":
        gsap.to(buttonRef.current, {
          scale: 1,
          opacity: 1,
          duration,
          delay: entryDelay,
          ease: "back.out(0.7)",
        });
        break;
      case "slide-up":
        gsap.to(buttonRef.current, {
          y: 0,
          opacity: 1,
          duration,
          delay: entryDelay,
          ease: "power2.out",
        });
        break;
      case "slide-right":
        gsap.to(buttonRef.current, {
          x: 0,
          opacity: 1,
          duration,
          delay: entryDelay,
          ease: "power2.out",
        });
        break;
      case "fade-scale":
        gsap.to(buttonRef.current, {
          scale: 1,
          opacity: 1,
          duration,
          delay: entryDelay,
          ease: "power2.out",
        });
        break;
      default:
        gsap.to(buttonRef.current, {
          opacity: 1,
          duration,
          delay: entryDelay,
          ease: "power2.out",
        });
    }
  };

  // Use Chakra's button but remove _hover prop to avoid conflicts with GSAP
  const { ...restButtonProps } = buttonProps;

  return (
    <Button
      ref={buttonRef}
      opacity={0} // Start invisible
      {...restButtonProps}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;
