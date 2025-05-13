import React from "react";
import { Box } from "@chakra-ui/react";
import type { TextProps } from "@chakra-ui/react";
import { motion } from "framer-motion";

// Constants - adjusted for wave effect
const DURATION = 0.4; // Slightly longer duration
const STAGGER = 0.015; // Smaller stagger for smoother wave
const WAVE_AMPLITUDE = 0.7; // Controls the "peakiness" of the wave

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
  // New wave props
  waveEffect?: boolean;
  waveAmplitude?: number;
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
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [hasRendered, setHasRendered] = React.useState(false);

  React.useEffect(() => {
    setHasRendered(true);
  }, []);

  // Calculate delay for wave effect
  const getWaveDelay = (index: number, total: number) => {
    if (!waveEffect) return stagger * index;

    // For wave effect, use a sine wave pattern to create a flowing animation
    // This makes letters in the middle start moving slightly after the first ones
    const position = index / (total - 1); // 0 to 1
    const wavePosition = Math.sin(position * Math.PI) * waveAmplitude;
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
              ease: "easeInOut",
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
              ease: "easeInOut",
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
