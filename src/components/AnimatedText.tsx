import React from "react";
import { Box } from "@chakra-ui/react";
import type { TextProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Constants - refined for smoother animation
const DURATION = 0.35; // Slightly faster for smoother feel
const STAGGER = 0.008; // Much smaller stagger for cohesion
const WAVE_AMPLITUDE = 0.4; // Reduced amplitude for subtler wave

const MotionBox = motion(Box);

interface AnimatedTextProps {
  text: string;
  fontSize?: string | string[];
  fontFamily?: string;
  color?: string;
  textAlign?: TextProps["textAlign"];
  isMobile?: boolean;
  fontWeight?: string;
  isInverted?: boolean;
  duration?: number;
  stagger?: number;
  height?: string;
  lineHeight?: string;
  // Wave props
  waveEffect?: boolean;
  waveAmplitude?: number;
  // New smoothness props
  ease?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  fontSize = "1.125rem",
  fontFamily = "'Clash Display', sans-serif",
  color = "inherit",
  textAlign = "center",
  isInverted = false,
  duration = DURATION,
  stagger = STAGGER,
  height = "1.5em",
  lineHeight = "1.5em",
  fontWeight = "inherit",
  waveEffect = true,
  waveAmplitude = WAVE_AMPLITUDE,
  ease = "circOut", // Better easing function for smoothness
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [hasRendered, setHasRendered] = React.useState(false);

  React.useEffect(() => {
    setHasRendered(true);
  }, []);

  // Improved wave delay calculation for smoother flow
  const getWaveDelay = (index: number, total: number) => {
    if (!waveEffect || total <= 1) return stagger * index;
    
    // More subtle sine wave with adjustable phase
    const position = index / (total - 1);
    
    // For very short words, reduce the wave effect further
    const adjustedAmplitude = total < 5 ? waveAmplitude * 0.5 : waveAmplitude;
    
    // Use a smoother sin curve with adjusted phase
    const wavePosition = Math.sin(position * Math.PI) * adjustedAmplitude;
    
    // Create a base delay with a smoother progression
    return stagger * index * (1 + wavePosition);
  };

  // Get total characters for wave calculation
  const totalChars = text.length;

  return (
    <Box
      position="relative"
      overflow="hidden"
      height={height}
      width="100%"
      display="inline-block"
      fontFamily={fontFamily}
      fontSize={fontSize}
      fontWeight={fontWeight}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cursor="pointer"
      color={isInverted ? "white" : color}
      lineHeight={lineHeight}
    >
      {/* Top text */}
      <Box width="100%" textAlign={textAlign} position="relative">
        {text.split("").map((char, i) => (
          <MotionBox
            key={`top-${i}`}
            as="span"
            display="inline-block"
            initial={{ y: 0 }}
            animate={{
              y: isHovered ? "-100%" : 0,
            }}
            transition={{
              duration,
              ease, // Use improved easing function
              delay: getWaveDelay(i, totalChars),
              immediate: !hasRendered,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </MotionBox>
        ))}
      </Box>

      {/* Bottom text */}
      <Box position="absolute" inset="0" width="100%" textAlign={textAlign}>
        {text.split("").map((char, i) => (
          <MotionBox
            key={`bottom-${i}`}
            as="span"
            display="inline-block"
            initial={{ y: "100%" }}
            animate={{
              y: isHovered ? 0 : "100%",
            }}
            transition={{
              duration,
              ease, // Use improved easing function
              delay: getWaveDelay(i, totalChars),
              immediate: !hasRendered,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </MotionBox>
        ))}
      </Box>
    </Box>
  );
};

export default AnimatedText;
