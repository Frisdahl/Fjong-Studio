import { HStack, Text, Image, VStack, Center } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Test from "../assets/images/test.webp";
import VisualAtelier from "../assets/images/Visuel Atelier.webp";
import VisualAtelier2 from "../assets/images/Visuel Atelier2.webp";
import BangOlufsen from "../assets/images/iPhone 16 Pro.jpg";
import ArrowIcon from "../assets/svg/arrow.svg";

// Create motion components
const MotionCenter = motion(Center);
const MotionImage = motion(Image);
const MotionText = motion(Text);

// Animation properties for the circle
const motionProps = {
  initial: { width: "0px", height: "0px", opacity: 0 },
  animate: {
    width: "120px",
    height: "120px",
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: {
    width: "0px",
    height: "0px",
    opacity: 0,
    transition: { duration: 0.1, ease: "easeIn" }, // Faster exit animation
  },
};

interface ProjectCardsProps {
  cardIndex: number; // Index to select which card content to display
  bgColor?: string; // Optional background color prop
}

function ProjectCards({
  cardIndex = 0,
  bgColor = "black.900",
}: ProjectCardsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle mouse movement to update circle position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate position relative to the card
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    }
  };

  const cardContent = [
    {
      title: "Abtion",
      description:
        "redesign af hjemmesiden for at forbedre brugeroplevelsen og optimere konverteringsraten.",
      imageSrc: VisualAtelier,
    },
    {
      title: "CryoByBreum",
      description:
        "responsivt design og optimering af hjemmesiden for at sikre en ensartet oplevelse på alle enheder.",
      imageSrc: Test,
    },
    {
      title: "Visuel Atelier",
      description:
        "optimering af hastigheden og ydeevnen på hjemmesiden for at forbedre brugeroplevelsen.",
      imageSrc: VisualAtelier2,
    },
    {
      title: "Bang&Olufsen",
      description:
        "Redesign af hjemmesiden der fokuserer på at optimere brugeroplevelsen og konverteringsraten.",
      imageSrc: BangOlufsen,
    },
  ];

  return (
    <HStack
      ref={cardRef}
      flexDirection={"column"}
      alignItems={"flex-start"}
      className="project-card"
      gap={"0px"}
      boxShadow="0px 4px 10px rgba(26, 26, 26, 0.25)"
      borderRadius={{ base: "25px", md: "50px" }}
      overflow="hidden"
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      cursor="none"
      bg={bgColor}
    >
      {/* Hover Circle with Arrow and Text */}
      <AnimatePresence>
        {isHovered && (
          <MotionCenter
            position="absolute"
            top={`${mousePosition.y}px`}
            left={`${mousePosition.x}px`}
            borderRadius="50%"
            zIndex="10"
            flexDirection="column"
            pointerEvents="none"
            bg={"white.100"}
            style={{
              transform: "translate(-50%, -50%)",
            }}
            {...motionProps}
          >
            {/* Animated Arrow with fade-in effect */}
            <MotionImage
              src={ArrowIcon}
              alt="Arrow"
              width="24px"
              height="24px"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                x: [0, 3, 0], // Reduced from 5px to 3px horizontal movement
                y: [-1, -5, -1], // Reduced from -8px to -5px vertical movement
              }}
              transition={{
                opacity: { duration: 0.3, delay: 0.2 },
                x: { repeat: Infinity, duration: 2, ease: "easeInOut" }, // Slower animation (1.5s → 2s)
                y: { repeat: Infinity, duration: 2, ease: "easeInOut" }, // Slower animation (1.5s → 2s)
              }}
            />
            {/* Text with fade-in effect */}
            <MotionText
              fontSize="1.25rem"
              fontWeight="medium"
              color="black.100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              se case
            </MotionText>
          </MotionCenter>
        )}
      </AnimatePresence>

      {/* Dark overlay on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: 5,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.7,
              exit: { duration: 0.3 }, // Faster exit animation
            }}
          />
        )}
      </AnimatePresence>

      <Image
        borderRadius={{ base: "15px", md: "50px" }}
        width={"100%"}
        src={
          typeof cardContent[cardIndex].imageSrc === "string"
            ? cardContent[cardIndex].imageSrc
            : ""
        }
        fallbackSrc="https://via.placeholder.com/300x250"
        objectFit="cover"
      />

      <VStack
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        padding={{ base: "25px", md: "25px", lg: "25px", xl: "50px" }}
        width="100%"
      >
        <Text as="h4" textStyle="h4" color={"white.100"}>
          {cardContent[cardIndex].title}
        </Text>
        <Text
          as="text"
          textStyle="text"
          fontSize={{ base: ".75rem", md: "1.125rem", lg: "1.25rem" }}
          color={"white.off"}
        >
          {cardContent[cardIndex].description}
        </Text>
      </VStack>
    </HStack>
  );
}

export default ProjectCards;
