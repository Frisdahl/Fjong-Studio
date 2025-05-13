import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation constants
const DURATION = 0.35;
const STAGGER = 0.015;
const WAVE_AMPLITUDE = 0.6;

// Fix the conditional useEffect error

const ScrollRevealText = ({
  children,
  duration = DURATION,
  stagger = STAGGER,
  waveAmplitude = WAVE_AMPLITUDE,
  direction = "up",
  threshold = 0.2,
  once = true,
  delay = 0,
  ease = "power2.out",
}: {
  children: React.ReactNode;
  duration?: number;
  stagger?: number;
  waveAmplitude?: number;
  direction?: "up" | "down";
  threshold?: number;
  once?: boolean;
  delay?: number;
  ease?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Split the text into individual characters
  const textContent = React.Children.toArray(children)[0];
  const isTextString = typeof textContent === "string";
  const characters = isTextString ? textContent.toString().split("") : null;

  // Wave delay calculation
  const getWaveDelay = (index: number, total: number) => {
    if (total <= 1) return stagger * index + delay;

    // More pronounced wave effect with clear left-to-right progression
    const position = index / (total - 1);
    const baseDelay = stagger * index;
    const wavePosition = Math.sin(position * Math.PI) * waveAmplitude;

    return baseDelay * (1 + wavePosition * 0.5) + delay;
  };

  // Always call hooks at the top level, never inside conditionals
  useEffect(() => {
    // Early return for text animations
    if (isTextString && containerRef.current) {
      // Create our animation timeline for text
      const chars = charsRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `top bottom-=${threshold * 100}%`,
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
        },
      });

      // Set initial state of all characters
      gsap.set(chars, {
        opacity: 0,
        y: direction === "up" ? 40 : -40,
      });

      // Animate each character with its own delay to create wave effect
      chars.forEach((char, index) => {
        const charDelay = getWaveDelay(index, chars.length);

        tl.to(
          char,
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            delay: charDelay,
          },
          0
        );
      });

      // Clean up the ScrollTrigger when component unmounts
      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    }
  }, [
    isTextString,
    children,
    direction,
    duration,
    stagger,
    waveAmplitude,
    threshold,
    once,
    delay,
    ease,
  ]);

  // Second effect for non-text content
  useEffect(() => {
    // Only run for non-text content
    if (!isTextString && contentRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: `top bottom-=${threshold * 100}%`,
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
        },
      });

      // Set initial state
      gsap.set(contentRef.current, {
        opacity: 0,
        y: direction === "up" ? 50 : -50,
      });

      // Animate
      tl.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration,
        ease,
        delay,
      });

      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    }
  }, [
    isTextString,
    children,
    direction,
    duration,
    threshold,
    once,
    delay,
    ease,
  ]);

  // Conditional rendering based on content type
  if (!isTextString) {
    return <div ref={contentRef}>{children}</div>;
  }

  return (
    <Box ref={containerRef} display="inline-block" position="relative">
      {characters?.map((char, i) => {
        return (
          <Box
            key={`char-${i}`}
            display="inline-block"
            position="relative"
            overflow="visible" // Changed from "hidden" to "visible"
            verticalAlign="baseline" // Changed from "text-bottom" to "baseline"
            sx={{
              // Add these style overrides
              "& > span": {
                display: "inline-block",
                position: "relative",
                lineHeight: "1", // Use a consistent line height
              },
            }}
          >
            <span
              ref={(el) => {
                if (el) charsRef.current[i] = el;
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </Box>
        );
      })}
    </Box>
  );
};

// ScrollRevealContent with GSAP
const ScrollRevealContent = ({
  children,
  duration = DURATION,
  direction = "up",
  threshold = 0.2,
  once = true,
  delay = 0,
  ease = "power2.out",
}: {
  children: React.ReactNode;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
  once?: boolean;
  delay?: number;
  ease?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Direction mapping
    const directionValues = {
      up: { y: 50, x: 0 },
      down: { y: -50, x: 0 },
      left: { x: 50, y: 0 },
      right: { x: -50, y: 0 },
    };

    const { x, y } = directionValues[direction];

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top bottom-=${threshold * 100}%`,
        toggleActions: once
          ? "play none none none"
          : "play reverse play reverse",
      },
    });

    // Set initial state
    gsap.set(containerRef.current, {
      opacity: 0,
      x,
      y,
    });

    // Animate
    tl.to(containerRef.current, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      ease,
      delay,
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [children, direction, duration, threshold, once, delay, ease]);

  return <div ref={containerRef}>{children}</div>;
};

export { ScrollRevealText, ScrollRevealContent };
export default ScrollRevealText;
