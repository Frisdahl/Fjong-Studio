import React, { useEffect, useRef, useState } from "react";
import { Box, Link } from "@chakra-ui/react";
import type { LinkProps } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { gsap } from "gsap";

interface AnimatedLinkProps extends Omit<LinkProps, "as"> {
  children: React.ReactNode;
  to: string;
  underlineColor?: string;
  underlineHeight?: string | number;
  underlineBorderRadius?: string | number;
  underlineOffset?: string | number;
  underlineDuration?: number;
  isActive?: boolean;
  isExternal?: boolean;
  scroll?: (sectionId: string) => void;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  children,
  to,
  underlineColor = "accent.blue",
  underlineHeight = "2px",
  underlineBorderRadius = "1px",
  underlineOffset = "2px",
  underlineDuration = 0.3,
  isActive = false,
  isExternal = false,
  scroll,
  color,
  _hover,
  ...linkProps
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Handle hover animation
  useEffect(() => {
    if (!underlineRef.current) return;

    // Clear any existing animations
    gsap.killTweensOf(underlineRef.current);

    if (isHovered || isActive) {
      // Animate underline in - grow from left to right
      gsap.set(underlineRef.current, {
        left: 0,
        right: "auto",
        transformOrigin: "left",
      });

      gsap.to(underlineRef.current, {
        width: "100%",
        duration: underlineDuration,
        ease: "power2.out",
      });
    } else {
      // For hover out - shrink from right to left (left side stays anchored)
      // Important: We keep left: 0 but animate width down to 0
      gsap.to(underlineRef.current, {
        width: 0,
        left: 0,
        right: "auto",
        duration: underlineDuration,
        ease: "power2.in",
      });
    }
  }, [isHovered, isActive, underlineDuration]);

  // Handle click for scroll behavior
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (scroll && to && !isExternal) {
      e.preventDefault();
      // Remove the # if present
      const sectionId = to.startsWith("#") ? to.substring(1) : to;
      scroll(sectionId);
    }
  };

  return (
    <Box
      display="inline-block"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        ref={linkRef}
        as={isExternal ? undefined : RouterLink}
        to={isExternal ? undefined : to}
        href={isExternal ? to : undefined}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        onClick={handleClick}
        color={isActive ? "accent.blue" : color}
        _hover={{
          textDecoration: "none",
          ...(_hover || {}),
        }}
        {...linkProps}
      >
        {children}
      </Link>
      <Box
        ref={underlineRef}
        position="absolute"
        bottom={underlineOffset}
        height={underlineHeight}
        bg={underlineColor}
        borderRadius={underlineBorderRadius}
        left={0}
        width={isActive ? "100%" : "0%"}
        style={{
          pointerEvents: "none", // Make sure it doesn't interfere with link clicks
        }}
      />
    </Box>
  );
};

export default AnimatedLink;
