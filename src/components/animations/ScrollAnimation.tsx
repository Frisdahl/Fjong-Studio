import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Import SplitText at the top with other imports
import { SplitText } from "gsap/SplitText";

// Register plugins with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

// Animation constants
const DURATION = 0.35;
const STAGGER = 0.015;
const WAVE_AMPLITUDE = 0.6;
const SLIDE_DISTANCE = 40; // Default slide distance in pixels

const ScrollRevealText = ({
  children,
  duration = DURATION,
  stagger = STAGGER,
  waveAmplitude = WAVE_AMPLITUDE,
  direction = "up",
  threshold = 0.2,
  once = true,
  delay = 0,
  ease = "power2.inOut",
  animateOnLoad = false,
  slideUp = false,
  slideDistance = SLIDE_DISTANCE,
  overflow = "hidden",
  containerHeight,
  multiLine = false, // New prop for multi-line animation
  staggerLines = 0.1, // New prop for line stagger amount
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
  animateOnLoad?: boolean;
  slideUp?: boolean;
  slideDistance?: number;
  overflow?: string;
  containerHeight?: string | number;
  multiLine?: boolean; // New prop type
  staggerLines?: number; // New prop type
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitText | null>(null); // Ref for SplitText instance

  // Get the animation direction value
  const getStartY = () => {
    if (slideUp) {
      return slideDistance;
    }
    return direction === "up" ? slideDistance : -slideDistance;
  };

  // Split the text into individual characters
  const textContent = React.Children.toArray(children)[0];
  const isTextString = typeof textContent === "string";
  const characters =
    !multiLine && isTextString ? textContent.toString().split("") : null;

  // Wave delay calculation
  const getWaveDelay = (index: number, total: number) => {
    if (total <= 1) return stagger * index + delay;

    // More pronounced wave effect with clear left-to-right progression
    const position = index / (total - 1);
    const baseDelay = stagger * index;
    const wavePosition = Math.sin(position * Math.PI) * waveAmplitude;

    return baseDelay * (1 + wavePosition * 0.5) + delay;
  };

  // Multi-line animation effect
  useEffect(() => {
    if (isTextString && containerRef.current && multiLine) {
      // Create SplitText instance
      const splitInstance = new SplitText(containerRef.current, {
        type: "lines,words",
        linesClass: "line",
        wordsClass: "word",
      });

      splitRef.current = splitInstance;

      const lines = splitInstance.lines;

      // Set initial state for all lines
      gsap.set(lines, {
        opacity: 0,
        y: getStartY(),
      });

      // Create animation timeline
      const tl = !animateOnLoad
        ? gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top bottom-=${threshold * 100}%`,
              toggleActions: once
                ? "play none none none"
                : "play reverse play reverse",
            },
          })
        : gsap.timeline();

      // Animate each line with staggered delay
      lines.forEach((line, index) => {
        tl.to(
          line,
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            delay: animateOnLoad ? staggerLines * index + delay : 0,
            clearProps: "transform", // Add this to prevent stuttering at the end
          },
          animateOnLoad ? 0 : staggerLines * index
        );

        // If needed, animate words within each line
        if (stagger > 0) {
          // Get words in this line
          const words = splitInstance.words.filter((word) =>
            line.contains(word)
          );

          words.forEach((word, wordIndex) => {
            const wordDelay = getWaveDelay(wordIndex, words.length);

            tl.to(
              word,
              {
                opacity: 1,
                y: 0,
                duration: duration * 0.8,
                ease,
                delay: animateOnLoad
                  ? wordDelay + staggerLines * index + delay
                  : 0,
              },
              animateOnLoad ? 0 : `line${index}+=${wordDelay}`
            );
          });
        }
      });

      // Clean up
      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
        splitInstance.revert(); // Revert the split
      };
    }
  }, [
    multiLine,
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
    animateOnLoad,
    slideUp,
    slideDistance,
    staggerLines,
  ]);

  // Original character-by-character animation (when multiLine is false)
  useEffect(() => {
    if (isTextString && containerRef.current && !multiLine) {
      // Create our animation timeline for text
      const chars = charsRef.current;

      // Set initial state of all characters
      gsap.set(chars, {
        opacity: 0,
        y: getStartY(),
      });

      // Create the timeline
      const tl = !animateOnLoad
        ? gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: `top bottom-=${threshold * 100}%`,
              toggleActions: once
                ? "play none none none"
                : "play reverse play reverse",
            },
          })
        : gsap.timeline();

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
            delay: animateOnLoad ? charDelay : 0,
            clearProps: "transform", // Add this to prevent stuttering
          },
          animateOnLoad ? 0 : charDelay
        );
      });

      // Clean up
      return () => {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill();
        }
        tl.kill();
      };
    }
  }, [
    multiLine, // Add dependency to re-run when this changes
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
    animateOnLoad,
    slideUp,
    slideDistance,
  ]);

  // Second effect for non-text content remains unchanged
  useEffect(() => {
    if (!isTextString && contentRef.current) {
      let startY;

      if (slideUp) {
        startY = containerHeight;
      } else {
        startY = direction === "up" ? slideDistance : -slideDistance;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contentRef.current,
          start: `top bottom-=${threshold * 100}%`,
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
        },
      });

      gsap.set(contentRef.current, {
        opacity: 0,
        y: startY,
      });

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
    slideUp,
    slideDistance,
  ]);

  // Conditional rendering based on content type and multiLine setting
  if (!isTextString) {
    return <div ref={contentRef}>{children}</div>;
  }

  if (multiLine) {
    return (
      <Box
        ref={containerRef}
        position="relative"
        overflow={overflow}
        height={containerHeight}
        width="100%"
        className="split-text"
        sx={{
          ".line": {
            display: "block",
            overflow: "hidden",
            position: "relative",
          },
          ".word": {
            display: "inline-block",
            position: "relative",
          },
        }}
      >
        {textContent}
      </Box>
    );
  }

  // Original character-by-character rendering
  return (
    <Box
      ref={containerRef}
      display="inline-block"
      position="relative"
      overflow={overflow}
      height={containerHeight}
      sx={{
        "& > span": {
          verticalAlign: "baseline",
        },
      }}
    >
      {characters?.map((char, i) => {
        return (
          <Box
            key={`char-${i}`}
            display="inline-block"
            position="relative"
            overflow={overflow}
            verticalAlign="baseline"
            sx={{
              "& > span": {
                display: "inline-block",
                position: "relative",
                lineHeight: "1",
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

const ScrollRevealContent = ({
  children,
  duration = DURATION,
  direction = "up",
  threshold = 0.2,
  once = true,
  delay = 0,
  ease = "power2.inOut", // Change default from power3.out to power2.inOut
  slideUp = false,
  slideDistance = SLIDE_DISTANCE,
  overflow = "hidden", // Default to hidden for consistency
  containerHeight, // Support explicit container height
}: {
  children: React.ReactNode;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  threshold?: number;
  once?: boolean;
  delay?: number;
  ease?: string;
  slideUp?: boolean;
  slideDistance?: number;
  overflow?: string;
  containerHeight?: string | number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    let x = 0,
      y = 0;

    if (slideUp) {
      y = slideDistance;
    } else {
      const directionValues = {
        up: { y: slideDistance, x: 0 },
        down: { y: -slideDistance, x: 0 },
        left: { x: slideDistance, y: 0 },
        right: { x: -slideDistance, y: 0 },
      };
      ({ x, y } = directionValues[direction]);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: `top bottom-=${threshold * 100}%`,
        toggleActions: once
          ? "play none none none"
          : "play reverse play reverse",
      },
    });

    // Set initial state on the content element, not the container
    gsap.set(contentRef.current, {
      opacity: 0,
      x,
      y,
    });

    // Animate the content element
    tl.to(contentRef.current, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      ease,
      delay,
      clearProps: "all", // Change from "filter" to "all" to fully reset properties
    });

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [
    children,
    direction,
    duration,
    threshold,
    once,
    delay,
    ease,
    slideUp,
    slideDistance,
  ]);

  return (
    <Box
      ref={containerRef}
      position="relative"
      overflow={overflow}
      height={containerHeight}
      width="100%"
      display="block"
    >
      <Box ref={contentRef} position="relative" width="100%" height="100%">
        {children}
      </Box>
    </Box>
  );
};

export { ScrollRevealText, ScrollRevealContent };
export default ScrollRevealText;
