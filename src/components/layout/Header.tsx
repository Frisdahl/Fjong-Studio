import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import {
  Box,
  Link,
  Flex,
  IconButton,
  useDisclosure,
  Stack,
  Image,
  HStack,
  Center,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useScroll } from "../../context/ScrollContext";
import logo from "../../assets/svg/logo.svg";
import logoWhite from "../../assets/svg/logo-white.svg";
import BurgerMenuIcon from "../BurgerMenuIcon";
import AnimatedText from "../AnimatedText"; // Import the AnimatedText component
import { useLocation } from "react-router-dom"; // Add this import

// Constants and motion components
const MotionBox = motion(Box);
const MotionImage = motion(Image);

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  isMobile?: boolean;
  isInverted?: boolean;
}

// Add this interface definition after your other interfaces
interface SectionObserver {
  element: Element;
  observer: IntersectionObserver;
}

const Links = [
  { name: "Projekter", path: "projekter" }, // Changed from "/projekter" to "projekter"
  { name: "Ydelser", path: "ydelser" }, // Changed from "/ydelser" to "ydelser"
  { name: "Kontakt", path: "kontakt" }, // Changed from "/kontakt" to "kontakt"
];

function Header() {
  // Add location to detect route changes
  const location = useLocation();

  // Add activeSection state
  const [activeSection, setActiveSection] = useState("");

  // Use IntersectionObserver to detect which section is in view
  useEffect(() => {
    const sections = ["projekter", "ydelser", "kontakt"];
    const observers: SectionObserver[] = []; // Add the type annotation here

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          },
          { threshold: 0.3 } // When 30% of the section is visible
        );

        observer.observe(element);
        observers.push({ element, observer });
      }
    });

    // Cleanup
    return () => {
      observers.forEach(({ element, observer }) => {
        observer.unobserve(element);
      });
    };
  }, []);

  // Rest of your state variables
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const [togglePosition, setTogglePosition] = React.useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Add this useLayoutEffect to update the toggle position when it changes
  useLayoutEffect(() => {
    const updatePosition = () => {
      if (toggleRef.current) {
        const rect = toggleRef.current.getBoundingClientRect();
        setTogglePosition({
          x: rect.right - rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    // Update position initially
    updatePosition();

    // Update position on resize and scroll
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);

    // Clean up
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, []);

  // Add this to update position when menu state changes
  useEffect(() => {
    if (toggleRef.current) {
      const rect = toggleRef.current.getBoundingClientRect();
      setTogglePosition({
        x: rect.right - rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  }, [isOpen]);

  // Enhanced animation with reset
  useEffect(() => {
    if (headerRef.current) {
      // Create a reusable timeline for header animations
      const tl = gsap.timeline();

      // First set initial state or reset to invisible
      tl.set(headerRef.current, { opacity: 0 });

      // Then animate to visible
      tl.to(headerRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      });

      return () => {
        // Clean up by killing the timeline when unmounting or route changes
        tl.kill();
      };
    }
  }, [location.pathname]);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Updated NavLink component with better scrolling
  const NavLink: React.FC<NavLinkProps> = ({
    children,
    to,
    isMobile = false,
    isInverted = false,
  }) => {
    const text = children?.toString() || "";
    const { scrollToSection } = useScroll();

    // Check if this link is for the active section
    const isActive = to === activeSection;

    // Handle click to scroll instead of navigate
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();

      // Close the mobile menu if it's open
      if (isMobile && onClose) {
        onClose();
      }

      // Add small delay for mobile menu to close first
      const delay = isMobile ? 300 : 0;
      setTimeout(() => {
        scrollToSection(to);
      }, delay);
    };

    return (
      <Link
        as="a"
        href={`#${to}`}
        onClick={handleClick}
        textDecoration="none"
        display="inline-block"
        height={isMobile ? "5em" : "1.5em"}
        lineHeight={isMobile ? "5em" : "1.5em"}
        color={isActive ? "accent.blue" : "inherit"}
        fontWeight={isActive ? "medium" : "regular"}
      >
        <AnimatedText
          text={text}
          fontSize={isMobile ? "3.5rem" : "1.125rem"}
          fontFamily={
            isMobile ? "ClashDisplay-Extralight" : "'Clash Display', sans-serif"
          }
          isInverted={isInverted}
          height={isMobile ? "1.2em" : "1.5em"}
          lineHeight={isMobile ? "1.2em" : "1.5em"}
          waveEffect={true}
          waveAmplitude={isMobile ? 1.0 : 0.7}
          duration={isMobile ? 0.5 : 0.4}
          stagger={isMobile ? 0.02 : 0.015}
        />
      </Link>
    );
  };

  return (
    <HStack
      ref={headerRef} // Add this ref to your HStack
      padding={{ base: "35px 35px", md: "50px 75px" }}
      zIndex={999}
      position="fixed"
      height={"100px"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bg={
        isOpen
          ? "transparent"
          : scrolled
          ? "rgba(255, 255, 255, 0.8)"
          : "white.100"
      }
      backdropFilter={scrolled ? "blur(10px)" : "none"}
      transition="all 0.3s ease-in-out"
      boxShadow={scrolled ? "0 4px 12px rgba(0, 0, 0, 0.05)" : "none"}
      borderBottom={scrolled ? "1px solid" : "none"}
      borderColor={scrolled ? "gray.100" : "transparent"}
      opacity={0} // Start with opacity 0
    >
      <Flex
        width={"100%"}
        bg="transparent" // Make background transparent so the circle shows through
        alignItems="center"
        justifyContent="space-between"
        position="relative"
        zIndex={1001}
      >
        {/* Logo */}
        <Link as={RouterLink} to="/">
          <AnimatePresence mode="wait">
            {isOpen ? (
              <MotionImage
                key="logo-white"
                height={"50px"}
                src={logoWhite}
                alt="Fjong Studio Logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5, // Increased from 0.3
                  ease: "easeOut", // Added easing
                }}
              />
            ) : (
              <MotionImage
                key="logo-regular"
                src={logo}
                height={"50px"}
                alt="Fjong Studio Logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5, // Increased from 0.3
                  ease: "easeOut", // Added easing
                }}
              />
            )}
          </AnimatePresence>
        </Link>

        {/* Mobile menu button */}
        <IconButton
          ref={toggleRef}
          size="md"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          variant="unstyled"
          icon={<BurgerMenuIcon isOpen={isOpen} />}
          position="relative"
          zIndex={1002}
        />

        {/* Desktop navigation */}
        <Stack
          direction="row"
          alignItems="center"
          display={{ base: "none", md: "flex" }}
          zIndex={1001}
        >
          <HStack as="nav" spacing="30px" textStyle="links">
            {Links.map((link, index) => (
              <React.Fragment key={link.name}>
                <NavLink to={link.path} isInverted={isOpen}>
                  {link.name}
                </NavLink>
                {index < Links.length - 1 && (
                  <Box
                    as="span"
                    color={isOpen ? "#1a1a1a" : "inherit"}
                    opacity={0.3}
                    fontSize="1.125rem"
                    fontFamily="'Clash Display', sans-serif"
                  >
                    /
                  </Box>
                )}
              </React.Fragment>
            ))}
          </HStack>
        </Stack>
      </Flex>

      {/* Circle animation overlay */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            pointerEvents="none"
            zIndex={1000}
            overflow="hidden"
          >
            <Box
              as="svg"
              viewBox="0 0 100 100"
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
            >
              <motion.circle
                cx={togglePosition.x}
                cy={togglePosition.y}
                r="0"
                fill="#1a1a1a"
                initial={{ r: 0 }}
                animate={{ r: 1000 }}
                exit={{ r: 0 }}
                transition={{
                  duration: 3,
                  delay: 0.2, // Add delay to let burger menu animate first
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              />
            </Box>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {isOpen && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6, // Increased from 0.3
              delay: 0.5, // Adjusted to better match circle animation
            }}
            display={{ md: "none" }}
            position="fixed"
            top="0"
            left="0"
            right="0"
            bottom="0"
            zIndex={1000}
            pointerEvents="auto"
          >
            <Center h="100%">
              <Stack as="nav" spacing="8" align="center" justify="center">
                {Links.map((link, index) => (
                  <MotionBox
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.7 + 0.15 * index, // Increased delay and spacing between items
                      duration: 0.5, // Increased from 0.3
                      ease: "easeOut", // Added easing
                    }}
                  >
                    <NavLink to={link.path} isMobile={true} isInverted={true}>
                      {link.name}
                    </NavLink>
                  </MotionBox>
                ))}
              </Stack>
            </Center>
          </MotionBox>
        )}
      </AnimatePresence>
    </HStack>
  );
}

export default Header;
