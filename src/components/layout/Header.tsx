import React, { useState, useEffect, useRef } from "react";
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
  Divider,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useScroll } from "../../context/ScrollContext";
import logo from "../../assets/svg/logo.svg";
import logoWhite from "../../assets/svg/logo-white.svg";
import BurgerMenuIcon from "../BurgerMenuIcon";
import AnimatedElement from "../animations/AnimatedElement";

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

const links = [
  { name: "Projekter", path: "projekter" }, // Changed from "/projekter" to "projekter"
  { name: "Ydelser", path: "ydelser" }, // Changed from "/ydelser" to "ydelser"
  { name: "Kontakt", path: "kontakt" }, // Changed from "/kontakt" to "kontakt"
];

function Header() {
  // Add location to detect route changes

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
  const headerRef = useRef<HTMLDivElement>(null);

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

  // Fixed NavLink component to properly use AnimatedLink
  const NavLink: React.FC<NavLinkProps> = ({
    children,
    to,
    isMobile = false,
    isInverted = false,
  }) => {
    const { scrollToSection } = useScroll();
    const isActive = to === activeSection;

    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent default link behavior

      if (isMobile && onClose) {
        // First close the menu
        onClose();

        // Then scroll after animation completes
        setTimeout(() => {
          scrollToSection(to);
        }, 800); // Wait for menu close animation
      } else {
        // On desktop, just scroll immediately
        scrollToSection(to);
      }
    };

    return (
      <Box
        as="button"
        onClick={handleClick}
        color={
          isInverted ? "white.cream" : isActive ? "accent.blue" : "inherit"
        }
        fontWeight={isActive ? "medium" : "medium"}
        fontSize={isMobile ? "4rem" : "1.25rem"}
        lineHeight={isMobile ? "1.5em" : "1.5em"}
        textDecoration="none"
        background="none"
        border="none"
        cursor="pointer"
        position="relative"
        _focus={{ outline: "none" }}
        _hover={{
          color: isInverted ? "white.cream" : "accent.blue",
        }}
        transition="color 0.3s"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        role="group"
      >
        <Box>{children}</Box>

        {!isMobile && (
          <Divider
            orientation="horizontal"
            width="0px"
            height="1px"
            backgroundColor={isInverted ? "white.cream" : "accent.blue"}
            transition="width 0.3s ease-in-out"
            _groupHover={{ width: "100%" }}
          />
        )}
      </Box>
    );
  };

  // Add this near your other state variables
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const newScrolled = offset > 50;

      // Only log when state changes to avoid console spam
      if (newScrolled !== scrolled) {
        console.log("Scroll state changed:", newScrolled);
        setScrolled(newScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]); // Add scrolled as dependency

  return (
    <AnimatedElement
      animationType="fade"
      duration={1.2}
      delay={0.2}
      ease="power2.inOut"
      width="100%"
    >
      <HStack
        ref={headerRef}
        zIndex={"999"}
        position="fixed"
        height={"100px"}
        width={"100%"}
        alignItems={"center"} // Changed from space-between to center
        justifyContent={"center"} // Changed from space-between to center
        bg="transparent"
        transition="all 0.3s ease-in-out"
        sx={{
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backdropFilter:
              !isOpen && scrolled ? "blur(10px) saturate(180%)" : "none", // Increased blur and saturation
            WebkitBackdropFilter:
              !isOpen && scrolled ? "blur(10px) saturate(180%)" : "none",
            backgroundColor:
              !isOpen && scrolled ? "rgba(255, 255, 255, 0.65)" : "transparent", // Reduced opacity for more transparency
            boxShadow:
              !isOpen && scrolled
                ? "0 8px 32px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.04)" // Layered shadow for depth
                : "none",
            borderTop:
              !isOpen && scrolled
                ? "1px solid rgba(255, 255, 255, 0.7)"
                : "none", // Subtle light border on top
            zIndex: 0,
            transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          },
        }}
      >
        <Flex
          width={"90%"}
          bg="transparent"
          alignItems="center"
          justifyContent="space-between" // Keep space-between for logo and nav
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
            <HStack as="nav" textStyle="links" gap={!isOpen ? "2rem" : "0rem"}>
              {links.map((link) => (
                <React.Fragment key={link.name}>
                  <NavLink to={link.path} isInverted={isOpen}>
                    {link.name}
                  </NavLink>
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
              <Center
                height={"calc(100vh - 100px)"}
                alignItems={"center"}
                mt={"100px"}
              >
                <Stack
                  as="nav"
                  align="center"
                  justify="center"
                  spacing={"5rem"}
                >
                  {links.map((link, index) => (
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
    </AnimatedElement>
  );
}

export default Header;
