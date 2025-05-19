import {
  HStack,
  Text,
  Image,
  VStack,
  Button,
  Icon,
  Box,
} from "@chakra-ui/react";
import Test from "../assets/images/test.webp";
import Iphone from "../assets/images/iphone.webp";
import { useState } from "react";

interface ProjectCardsProps {
  cardIndex?: number; // Index to select which card content to display
  bgColor?: string; // Optional background color prop
  socialMedia?: string; // Optional social media prop
  footerCard?: boolean; // Optional prop to determine if it's a footer card
}

function ProjectCards({
  cardIndex = 0,
  bgColor = "black.900",
  socialMedia,
  footerCard = false,
}: ProjectCardsProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardContent = [
    {
      title: "Abtion",
      description: "Optimering af ansøgningsproces",
      imageSrc: Test,
    },
    {
      title: "CryoByBreum",
      description: "Cryosauna hjemmeside.",
      imageSrc: Test,
    },
    {
      title: "Visuel Atelier",
      description: "design af hjemmeside",
      imageSrc: Iphone,
    },
    {
      title: "Bang&Olufsen",
      description: "Prototype til ny hjemmeside",
      imageSrc: Iphone,
    },
  ];

  return (
    <HStack
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      height={"100%"}
      flexDirection={"column"}
      alignItems={"flex-start"}
      className="project-card"
      gap={"0px"}
      borderRadius={{ base: "2.5rem", md: "2.5rem", xl: "2.5rem" }}
      overflow="hidden"
      position="relative"
      bg={bgColor}
      cursor={"pointer"}
    >
      <Box
        borderRadius={{ base: "2.5rem", md: "2.5rem", xl: "2.5rem" }}
        overflow="hidden"
      >
        <Image
          borderRadius={{ base: "2.5rem", md: "2.5rem", xl: "2.5rem" }}
          width={"100%"}
          src={
            typeof cardContent[cardIndex].imageSrc === "string"
              ? cardContent[cardIndex].imageSrc
              : ""
          }
          fallbackSrc="https://via.placeholder.com/300x250"
          objectFit="cover"
          transition="transform 0.5s cubic-bezier(0.4,0,0.2,1)"
          transform={isHovered ? "scale(1.08)" : "scale(1)"}
        />
      </Box>

      <VStack
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        flexDirection={"column"}
        padding={{ base: "2.5rem", md: "2.5rem", xl: "2.5rem" }}
        width="100%"
      >
        <Text as="h4" textStyle="h4" color={"white.100"}>
          {footerCard ? socialMedia : cardContent[cardIndex].title}
        </Text>
        {!footerCard && (
          <Text
            as="text"
            textStyle="text"
            fontSize={{ base: ".75rem", md: "1rem", lg: "1rem" }}
            color={"white.off"}
          >
            {cardContent[cardIndex].description}
          </Text>
        )}
        <Button
          bg={isHovered ? "white.cream" : "transparent"}
          color={isHovered ? "font.dark" : "white.cream"}
          transition={"all .5s ease"}
          border={"1px solid"}
          _hover={"none"}
          width={"100%"}
          fontSize={{ base: "1rem", md: "1.25rem", lg: "1.25rem" }}
          fontWeight={"regular"}
          borderRadius={{ base: "2.5rem", md: "2.5rem", xl: "2.5rem" }}
          borderColor={"white.cream"}
          py={{ base: "1rem", md: "1.5rem", lg: "1.75rem" }}
          px={{ base: "1rem", md: "1.5rem", lg: "2.5rem" }}
          marginTop={"20px"}
        >
          {footerCard ? `se medie` : "se case"}
          {/* First Arrow Icon (moves out top right on hover) */}
          <Box
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="1.25rem"
            height="1.25rem"
            ml={{ base: ".25rem", md: ".25rem", lg: ".5rem" }}
            // Hide overflow for all children
          >
            <Box
              position="relative"
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              overflow="hidden"
            >
              {/* First Arrow Icon (moves out top right on hover) */}
              <Icon
                viewBox="0 0 15 13"
                fill="accent.yellow"
                width="100%"
                height="100%"
                transition="transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.4s"
                position="absolute"
                top="0"
                left="0"
                style={{
                  transform: isHovered
                    ? "translate(100%, -100%) scale(0.8)"
                    : "translate(0, 0) scale(1)",
                  opacity: 1,
                  pointerEvents: "none",
                }}
              >
                <path
                  d="M12.525 9.9551C12.5411 9.95514 12.8489 9.77069 13.209 9.54521C13.5691 9.3197 13.8566 9.12174 13.848 9.10534C13.8393 9.08894 13.6664 8.85542 13.4637 8.58642C13.0565 8.04622 12.6646 7.33206 12.4909 6.81402C11.9497 5.19946 12.1988 3.52288 13.1811 2.16956L13.4312 1.82494L12.955 1.34876L12.4788 0.872556L12.1641 1.09687C10.1019 2.56648 7.63033 2.39738 5.43904 0.63683C5.29596 0.521857 5.17363 0.433129 5.16716 0.439598C5.1076 0.499155 4.3586 1.7238 4.35878 1.76131C4.3589 1.78842 4.4899 1.89934 4.64987 2.00771C6.4211 3.20783 8.44766 3.59913 10.0142 3.04358L10.3899 2.91032L5.16567 8.15359L1.86219 11.4691L2.82589 12.4328L6.14994 9.12084L11.3809 3.90894L11.2224 4.39306C10.8111 5.64896 10.9796 7.13735 11.7029 8.63795C11.9089 9.06549 12.464 9.95481 12.525 9.9551Z"
                  fill="accent.yellow"
                />
              </Icon>
              {/* Second Arrow Icon (moves in from bottom left to first arrow's start position on hover) */}
              <Icon
                viewBox="0 0 15 13"
                fill="accent.yellow"
                width="100%"
                height="100%"
                transition="transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.4s"
                position="absolute"
                top="0"
                left="0"
                style={{
                  transform: isHovered
                    ? "translate(0, 0) scale(1)"
                    : "translate(-120%, 120%) scale(0.8)",
                  opacity: isHovered ? 1 : 0,
                  pointerEvents: "none",
                }}
              >
                <path
                  d="M12.525 9.9551C12.5411 9.95514 12.8489 9.77069 13.209 9.54521C13.5691 9.3197 13.8566 9.12174 13.848 9.10534C13.8393 9.08894 13.6664 8.85542 13.4637 8.58642C13.0565 8.04622 12.6646 7.33206 12.4909 6.81402C11.9497 5.19946 12.1988 3.52288 13.1811 2.16956L13.4312 1.82494L12.955 1.34876L12.4788 0.872556L12.1641 1.09687C10.1019 2.56648 7.63033 2.39738 5.43904 0.63683C5.29596 0.521857 5.17363 0.433129 5.16716 0.439598C5.1076 0.499155 4.3586 1.7238 4.35878 1.76131C4.3589 1.78842 4.4899 1.89934 4.64987 2.00771C6.4211 3.20783 8.44766 3.59913 10.0142 3.04358L10.3899 2.91032L5.16567 8.15359L1.86219 11.4691L2.82589 12.4328L6.14994 9.12084L11.3809 3.90894L11.2224 4.39306C10.8111 5.64896 10.9796 7.13735 11.7029 8.63795C11.9089 9.06549 12.464 9.95481 12.525 9.9551Z"
                  fill="accent.yellow"
                />
              </Icon>
            </Box>
          </Box>
        </Button>
      </VStack>
    </HStack>
  );
}

export default ProjectCards;
