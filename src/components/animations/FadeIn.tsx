import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface FadeInProps extends BoxProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  ease?: string;
  startingOpacity?: number;
  scaleFrom?: number;
  transformOrigin?: string;
  animateScale?: boolean;
  animateWidth?: boolean;
  animateHeight?: boolean;
  onComplete?: () => void;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 1,
  ease = "power2.inOut",
  startingOpacity = 0,
  scaleFrom = 0,
  transformOrigin = "center center",
  animateScale = false,
  animateWidth = false,
  animateHeight = false,
  onComplete,
  ...boxProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set initial state
    const initialState: gsap.TweenVars = { opacity: startingOpacity };

    // Add scale/width/height initial values if needed
    if (animateScale) {
      initialState.scale = scaleFrom;
      initialState.transformOrigin = transformOrigin;
    }
    if (animateWidth) {
      initialState.width = "0%";
    }
    if (animateHeight) {
      initialState.height = "0%";
    }

    gsap.set(containerRef.current, initialState);

    // Prepare animation target state
    const animationProps: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease,
      onComplete,
    };

    // Add scale/width/height target values if needed
    if (animateScale) {
      animationProps.scale = 1;
    }
    if (animateWidth) {
      animationProps.width = "100%";
    }
    if (animateHeight) {
      animationProps.height = "100%";
    }

    // Create and play animation
    const animation = gsap.to(containerRef.current, animationProps);

    // Cleanup
    return () => {
      animation.kill();
    };
  }, [
    delay,
    duration,
    ease,
    startingOpacity,
    scaleFrom,
    transformOrigin,
    animateScale,
    animateWidth,
    animateHeight,
    onComplete,
  ]);

  return (
    <Box ref={containerRef} {...boxProps}>
      {children}
    </Box>
  );
};

export default FadeIn;
