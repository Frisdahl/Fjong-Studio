import React, { useRef, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import type { TextProps } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
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
  height = "1.5em",
  lineHeight = "1.1",
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
  const textRef = useRef<HTMLDivElement>(null);
  const textBottomRef = useRef<HTMLDivElement>(null);
  const splitInstance = useRef<{
    top: SplitText | null;
    bottom: SplitText | null;
  }>({
    top: null,
    bottom: null,
  });

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

  // Create and configure animation
  useEffect(() => {
    if (!containerRef.current || !textRef.current || !textBottomRef.current)
      return;

    // Clear any existing animation
    if (animation) {
      animation.kill();
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
    }

    // Clear existing SplitText instances
    if (splitInstance.current.top) {
      splitInstance.current.top.revert();
      splitInstance.current.top = null;
    }

    if (splitInstance.current.bottom) {
      splitInstance.current.bottom.revert();
      splitInstance.current.bottom = null;
    }

    // Create new SplitText instances
    splitInstance.current.top = new SplitText(textRef.current, {
      type: "chars",
      charsClass: "top-char",
    });

    splitInstance.current.bottom = new SplitText(textBottomRef.current, {
      type: "chars",
      charsClass: "bottom-char",
    });

    const topChars = splitInstance.current.top.chars;
    const bottomChars = splitInstance.current.bottom.chars;

    // Create timeline with optional ScrollTrigger
    const tl = gsap.timeline({
      paused: !useScrollTrigger,
      scrollTrigger: useScrollTrigger
        ? {
            trigger: containerRef.current,
            start: scrollStart,
            end: scrollEnd,
            pin: scrollPin,
            scrub: scrollScrub,
            snap: scrollSnap
              ? {
                  snapTo: "labels",
                  duration: { min: 0.2, max: 1.5 },
                  delay: 0.1,
                  ease: "power1.inOut",
                }
              : undefined,
            toggleActions: "play none none reverse",
          }
        : undefined,
    });

    // Add animation sequence with labels
    tl.addLabel("start");

    // Initial setup
    gsap.set(topChars, { y: 0 });
    gsap.set(bottomChars, { y: "100%" });

    // Add wave animation for each character
    topChars.forEach((char, i) => {
      const charDelay = getWaveDelay(i, topChars.length);

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
        bottomChars[i],
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

      // Revert SplitText instances
      if (splitInstance.current.top) {
        splitInstance.current.top.revert();
      }
      if (splitInstance.current.bottom) {
        splitInstance.current.bottom.revert();
      }
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
      sx={{
        ".top-char, .bottom-char": {
          display: "inline-block",
          position: "relative",
          lineHeight: lineHeight,
          textRendering: "geometricPrecision",
          willChange: "transform",
          transform: "translateZ(0)",
        },
        // Special handling for characters with descenders
        ".top-char:has(:is(g, j, p, q, y)), .bottom-char:has(:is(g, j, p, q, y))":
          {
            paddingBottom: "0.15em",
          },
      }}
    >
      <Box
        ref={textRef}
        width="100%"
        textAlign={textAlign}
        position="relative"
        className="split-top"
      >
        {text}
      </Box>
      <Box
        ref={textBottomRef}
        position="absolute"
        inset="0"
        width="100%"
        textAlign={textAlign}
        className="split-bottom"
      >
        {text}
      </Box>
    </Box>
  );
};

export default AnimatedText;
