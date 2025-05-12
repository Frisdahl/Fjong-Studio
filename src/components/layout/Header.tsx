import React from "react";
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
import logo from "../../assets/logo.svg";
import logoWhite from "../../assets/logo-white.svg";
import BurgerMenuIcon from "../BurgerMenuIcon";
// Constants and motion components
const DURATION = 0.25;
const STAGGER = 0.025;
const MotionBox = motion(Box);
const MotionImage = motion(Image);

// NavLink component
const NavLink: React.FC<NavLinkProps> = ({
  children,
  to,
  isMobile = false,
  isInverted = false,
}) => {
  const text = children?.toString() || "";
  const [isHovered, setIsHovered] = React.useState(false);
  const [hasRendered, setHasRendered] = React.useState(false);

  React.useEffect(() => {
    setHasRendered(true);
  }, []);

  return (
    <RouterLink
      to={to}
      style={{
        textDecoration: "none",
        display: "inline-block",
        height: isMobile ? "5em" : "1.5em",
        lineHeight: isMobile ? "5em" : "1.5em",
      }}
    >
      <Box
        position="relative"
        overflow="hidden"
        height="100%"
        width="100%"
        display="inline-block"
        fontFamily={
          isMobile ? "ClashDisplay-Extralight" : "'Clash Display', sans-serif"
        }
        fontSize={isMobile ? "3.5rem" : "1.125rem"}
        textStyle="links"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        cursor="pointer"
        color={isInverted ? "white" : "inherit"}
      >
        {/* Top text */}
        <Box width="100%" textAlign="center" position="relative">
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
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
                immediate: !hasRendered,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </MotionBox>
          ))}
        </Box>

        {/* Bottom text */}
        <Box position="absolute" inset="0" width="100%" textAlign="center">
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
                duration: DURATION,
                ease: "easeInOut",
                delay: STAGGER * i,
                immediate: !hasRendered,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </MotionBox>
          ))}
        </Box>
      </Box>
    </RouterLink>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
  isMobile?: boolean;
  isInverted?: boolean;
}

const Links = [
  { name: "Projekter", path: "/projekter" },
  { name: "Ydelser", path: "/ydelser" },
  { name: "Kontakt", path: "/kontakt" },
];

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const [togglePosition, setTogglePosition] = React.useState({ x: 0, y: 0 });

  // Update toggle position when it changes
  React.useEffect(() => {
    const updatePosition = () => {
      if (toggleRef.current) {
        const rect = toggleRef.current.getBoundingClientRect();
        setTogglePosition({
          x: rect.right - rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    };

    updatePosition();

    // Update position on resize
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <Box
      padding={{ base: "35px 35px", md: "50px 75px" }}
      position="relative"
      zIndex={999}
    >
      <Flex
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
          // Update the Mobile navigation menu section
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
    </Box>
  );
}

export default Header;
