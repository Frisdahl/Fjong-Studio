import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import type { TextProps } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DURATION = 0.35;
const STAGGER = 0.008;
const WAVE_AMPLITUDE = 0.4;

interface AnimatedTextProps {
  text: string;
  fontSize?: string | string[];
  fontFamily?: string;
  color?: string;
  textAlign?: TextProps["textAlign"];
  fontWeight?: string;
  isInverted?: boolean;
  duration?: number;
  stagger?: number;
  height?: string;
  lineHeight?: string;
  waveEffect?: boolean;
  waveAmplitude?: number;
  ease?: string;
  // Optional scroll trigger props
  useScrollTrigger?: boolean;
  scrollPin?: boolean;
  scrollStart?: string;
  scrollEnd?: string;
  scrollScrub?: boolean | number;
  scrollSnap?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize = "1.125rem",
  fontFamily = "'Clash Display', sans-serif",
  color = "inherit",
  textAlign = "center",
  fontWeight = "inherit",
  isInverted = false,
  duration = DURATION,
  stagger = STAGGER,
  height = "1.5em", // Increased for better handling of descenders
  lineHeight = "1.1", // Reduced for tighter text
  waveEffect = true,
  waveAmplitude = WAVE_AMPLITUDE,
  ease = "power2.out",
  // Scroll trigger options
  useScrollTrigger = false,
  scrollPin = false,
  scrollStart = "top bottom",
  scrollEnd = "bottom top",
  scrollScrub = false,
  scrollSnap = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const topCharsRef = useRef<HTMLSpanElement[]>([]);
  const bottomCharsRef = useRef<HTMLSpanElement[]>([]);
  const [isHovered, setIsHovered] = React.useState(false);
  const [animation, setAnimation] = React.useState<gsap.core.Timeline | null>(
    null
  );

  // Wave delay calculation for smoother flow
  const getWaveDelay = (index: number, total: number) => {
    if (!waveEffect || total <= 1) return stagger * index;

    // More subtle sine wave with adjustable phase
    const position = index / (total - 1);

    // For very short words, reduce the wave effect
    const adjustedAmplitude = total < 5 ? waveAmplitude * 0.5 : waveAmplitude;

    // Use a smoother sin curve with adjusted phase
    const wavePosition = Math.sin(position * Math.PI) * adjustedAmplitude;

    // Create a base delay with a smoother progression
    return stagger * index * (1 + wavePosition);
  };

  // Create and configure timeline
  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing animation
    if (animation) {
      animation.kill();
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
    }

    // Create timeline with optional ScrollTrigger
    const tl = gsap.timeline({
      paused: !useScrollTrigger, // Only pause if we're not using scroll trigger
      scrollTrigger: useScrollTrigger
        ? {
            trigger: containerRef.current,
            start: scrollStart,
            end: scrollEnd,
            pin: scrollPin,
            scrub: scrollScrub,
            snap: scrollSnap
              ? {
                  snapTo: "labels", // Changed from "labelled" to "labels" which is the correct value
                  duration: { min: 0.2, max: 1.5 },
                  delay: 0.1,
                  ease: "power1.inOut",
                }
              : undefined, // Changed from false to undefined
            toggleActions: "play none none reverse",
          }
        : undefined,
    });
    // Add animation sequence with labels
    tl.addLabel("start");

    // Initial setup for character positions
    gsap.set(topCharsRef.current, { y: 0 });
    gsap.set(bottomCharsRef.current, { y: "100%" });

    // Add wave animation for each character
    topCharsRef.current.forEach((char, i) => {
      const charDelay = getWaveDelay(i, text.length);

      tl.to(
        char,
        {
          y: useScrollTrigger ? "-100%" : isHovered ? "-100%" : 0,
          duration,
          ease,
          delay: useScrollTrigger ? 0 : charDelay,
        },
        useScrollTrigger ? charDelay : 0
      );

      tl.to(
        bottomCharsRef.current[i],
        {
          y: useScrollTrigger ? 0 : isHovered ? 0 : "100%",
          duration,
          ease,
          delay: useScrollTrigger ? 0 : charDelay,
        },
        useScrollTrigger ? charDelay : 0
      );
    });

    tl.addLabel("complete");

    // Store animation reference
    setAnimation(tl);

    // Play animation if hover mode (not scroll triggered)
    if (!useScrollTrigger && isHovered) {
      tl.play();
    }

    // Clean up on unmount
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [
    text,
    isHovered,
    useScrollTrigger,
    duration,
    ease,
    waveEffect,
    waveAmplitude,
    stagger,
    scrollPin,
    scrollStart,
    scrollEnd,
    scrollScrub,
    scrollSnap,
  ]);

  // Render character spans with consistent styling
  const renderCharacters = (
    refs: React.MutableRefObject<HTMLSpanElement[]>,
    keyPrefix: string
  ) =>
    text.split("").map((char, i) => {
      // Check for descender characters
      const hasDescender = /[gjpqy]/.test(char);

      return (
        <Box
          key={`${keyPrefix}-${i}`}
          as="span"
          display="inline-block"
          position="relative"
          overflow="visible" // Changed from "hidden" to "visible" to allow descenders to show
          lineHeight={lineHeight}
          paddingBottom={hasDescender ? "0.15em" : "0"} // Add padding for descenders
          verticalAlign="baseline" // Keep at baseline alignment
          sx={{
            // Ensure no shifting during animation
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        >
          <span
            ref={(el) => {
              if (el) refs.current[i] = el;
            }}
            style={{
              display: "inline-block",
              position: "relative",
              lineHeight,
              // Prevent any default browser adjustments
              textRendering: "geometricPrecision",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </Box>
      );
    });

  return (
    <Box
      ref={containerRef}
      position="relative"
      overflow="hidden"
      height={height}
      width="100%"
      display="inline-block"
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={isInverted ? "white" : color}
      lineHeight={lineHeight}
      onMouseEnter={() => !useScrollTrigger && setIsHovered(true)}
      onMouseLeave={() => !useScrollTrigger && setIsHovered(false)}
      cursor={!useScrollTrigger ? "pointer" : "default"}
    >
      <Box width="100%" textAlign={textAlign} position="relative">
        {renderCharacters(topCharsRef, "top")}
      </Box>
      <Box position="absolute" inset="0" width="100%" textAlign={textAlign}>
        {renderCharacters(bottomCharsRef, "bottom")}
      </Box>
    </Box>
  );
};

export default AnimatedText;
