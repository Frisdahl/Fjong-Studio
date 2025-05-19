// Update import section at the top of your file
import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Import ScrollTrigger explicitly

// Register ScrollTrigger with GSAP outside of the component
gsap.registerPlugin(ScrollTrigger);

export type AnimationType =
  | "fade" // Simple fade in
  | "fade-up" // Fade in while moving up
  | "fade-down" // Fade in while moving down
  | "fade-left" // Fade in while moving left
  | "fade-right" // Fade in while moving right
  | "fade-scale" // Fade in while scaling up
  | "scale" // Just scale up
  | "bounce" // Bounce in
  | "flip" // Flip in
  | "rotate" // Rotate in
  | "pulse"; // Pulse effect

interface AnimatedElementProps extends BoxProps {
  children: React.ReactNode;
  animationType?: AnimationType;
  duration?: number;
  delay?: number;
  ease?: string;
  animateOnLoad?: boolean;
  triggerOnScroll?: boolean;
  threshold?: number;
  distance?: number;
  scale?: number;
  stagger?: number;
  staggerChildren?: boolean;
  hoverAnimation?: boolean;
  hoverScale?: number;
  hoverRotate?: number;
  hoverSpeed?: number;
  exitAnimation?: boolean;
  onAnimationComplete?: () => void;
  repeat?: number;
  yoyo?: boolean;
}

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  animationType = "fade",
  duration = 0.8,
  delay = 0,
  ease = "power2.out",
  animateOnLoad = true,
  triggerOnScroll = false,
  threshold = 0.1,
  distance = 50,
  scale = 0.9,
  stagger = 0.1,
  staggerChildren = false,
  hoverAnimation = false,
  hoverScale = 1.05,
  hoverRotate = 0,
  hoverSpeed = 0.3,
  exitAnimation = false,
  onAnimationComplete,
  repeat = 0,
  yoyo = false,
  ...boxProps
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const hoverRef = useRef<gsap.core.Timeline | null>(null);

  // Set up the initial animation
  useEffect(() => {
    if (!elementRef.current) return;

    // Create animation timeline
    const tl = gsap.timeline({
      paused: !animateOnLoad,
      onComplete: onAnimationComplete,
      repeat,
      yoyo,
    });

    // Save timeline reference
    animationRef.current = tl;

    // Set initial state based on animation type
    const initialState: gsap.TweenVars = { opacity: 0 };
    const animationState: gsap.TweenVars = { opacity: 1, duration, ease };

    switch (animationType) {
      case "fade":
        // Already set up above
        break;
      case "fade-up":
        initialState.y = distance;
        animationState.y = 0;
        break;
      case "fade-down":
        initialState.y = -distance;
        animationState.y = 0;
        break;
      case "fade-left":
        initialState.x = distance;
        animationState.x = 0;
        break;
      case "fade-right":
        initialState.x = -distance;
        animationState.x = 0;
        break;
      case "fade-scale":
        initialState.scale = scale;
        animationState.scale = 1;
        break;
      case "scale":
        initialState.opacity = 1; // Keep visible
        initialState.scale = scale;
        animationState.scale = 1;
        break;
      case "bounce":
        initialState.scale = 0.5;
        initialState.opacity = 0;
        animationState.scale = 1;
        animationState.ease = "elastic.out(1, 0.3)";
        break;
      case "flip":
        initialState.rotationY = -90;
        initialState.opacity = 0;
        animationState.rotationY = 0;
        break;
      case "rotate":
        initialState.rotation = -15;
        initialState.opacity = 0;
        animationState.rotation = 0;
        break;
      case "pulse":
        initialState.scale = 0.95;
        initialState.opacity = 0.7;
        animationState.scale = 1;
        animationState.ease = "power1.inOut";
        animationState.repeat = 1;
        animationState.yoyo = true;
        break;
    }

    // Apply initial state
    gsap.set(elementRef.current, initialState);

    // Add the animation to the timeline with delay
    tl.to(elementRef.current, { ...animationState, delay });

    // If we're animating on scroll
    if (triggerOnScroll) {
      gsap.registerPlugin(ScrollTrigger);

      // Create scroll trigger
      ScrollTrigger.create({
        trigger: elementRef.current,
        start: `top bottom-=${threshold * 100}%`,
        onEnter: () => tl.play(),
      });
    } else if (animateOnLoad) {
      // Play immediately if animateOnLoad is true
      tl.play();
    }

    // Clean up
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.vars.trigger === elementRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, [
    animationType,
    duration,
    delay,
    ease,
    animateOnLoad,
    triggerOnScroll,
    threshold,
    distance,
    scale,
    onAnimationComplete,
    repeat,
    stagger,
    staggerChildren,
    exitAnimation,
    yoyo,
  ]);

  // Set up hover animation if enabled
  useEffect(() => {
    if (!hoverAnimation || !elementRef.current) return;

    const element = elementRef.current;

    // Create hover animation
    const onMouseEnter = () => {
      if (!hoverRef.current) {
        hoverRef.current = gsap.timeline();

        const hoverState: gsap.TweenVars = {
          duration: hoverSpeed,
          ease: "power1.out",
        };

        if (hoverScale !== 1) {
          hoverState.scale = hoverScale;
        }

        if (hoverRotate !== 0) {
          hoverState.rotation = hoverRotate;
        }

        hoverRef.current.to(element, hoverState);
      } else {
        hoverRef.current.play();
      }
    };

    const onMouseLeave = () => {
      if (hoverRef.current) {
        hoverRef.current.reverse();
      }
    };

    // Add event listeners
    element.addEventListener("mouseenter", onMouseEnter);
    element.addEventListener("mouseleave", onMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", onMouseEnter);
      element.removeEventListener("mouseleave", onMouseLeave);

      if (hoverRef.current) {
        hoverRef.current.kill();
      }
    };
  }, [hoverAnimation, hoverScale, hoverRotate, hoverSpeed]);

  return (
    <Box ref={elementRef} {...boxProps}>
      {children}
    </Box>
  );
};

export default AnimatedElement;
