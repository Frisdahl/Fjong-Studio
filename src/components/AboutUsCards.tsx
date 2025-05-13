import React, { useState } from "react";
import { VStack, Text, HStack, Image, Box, Link } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Divider } from "@chakra-ui/react";
import AlexanderPortrait from "../assets/images/alexander-portrait.jpg";
import ArrowIcon from "../assets/arrow.svg";

const MotionImage = motion(Image);

const AboutUs = {
  name: "Alexander Frisdahl",
  title: "Webudvikler",
  workarea1: "Skaber brandidentitet gennem React, Typescript og Figma",
  workarea2: "Udvikler intuitive brugeroplevelser med moderne teknologi",
  quete: "“Building digital solutions with focus on design and performance.”",
};

function AboutUsCards() {
  const [isLinkHovered, setIsLinkHovered] = useState(false);

  return (
    <>
      <VStack
        position="relative"
        bg="accent.sandLight"
        borderRadius="50px"
        p="50px"
        alignItems="start"
      >
        <VStack pb={"20px"} align="start">
          <Text as={"h4"} textStyle={"h4"}>
            {AboutUs.name}
          </Text>
          <Text as={"text"} textStyle={"text"}>
            {AboutUs.title}
          </Text>
        </VStack>
        <Divider borderColor="font.dark" opacity={0.3} borderWidth="1px" />

        <HStack pt={"75px"}>
          <VStack gap={"50px"}>
            <Text as={"text"} textStyle={"text"}>
              {AboutUs.workarea1}
            </Text>
            <Text as={"text"} textStyle={"text"}>
              {AboutUs.workarea2}
            </Text>
          </VStack>
          <Image src={AlexanderPortrait} borderRadius={"50%"} width={"50%"} />
        </HStack>
        <HStack
          alignItems={"flex-end"}
          justifyContent={"space-between"}
          width="100%"
        >
          <VStack pt={"50px"} align="start">
            <Text>{AboutUs.quete}</Text>
            <Text>
              {"— "}
              {AboutUs.name}
            </Text>
          </VStack>

          {/* Custom Link with Inverted Border Radius */}
          <Box
            className="c-card__title"
            position="relative"
            onMouseEnter={() => setIsLinkHovered(true)}
            onMouseLeave={() => setIsLinkHovered(false)}
          >
            <Box
              className="--inverted-border-radius --bottom-right"
              position="relative"
              width="fit-content"
              paddingY="0.5em"
              paddingX="1em"
              bg="font.dark"
              color="white.cream"
              borderRadius="8px"
              borderBottomRightRadius="0"
              fontWeight="medium"
              cursor="pointer"
              _after={{
                content: '""',
                position: "absolute",
                width: "10px",
                height: "10px",
                bottom: "0",
                right: "0",
                transform: "translate(100%)",
                background: "transparent",
                borderBottomLeftRadius: "8px",
                boxShadow: "-3px 2px 0 0 var(--bg-color)",
              }}
              sx={{ "--bg-color": "var(--chakra-colors-font-dark)" }}
            >
              <Link
                href="#contact"
                display="flex"
                alignItems="center"
                _hover={{ textDecoration: "none" }}
              >
                Book en samtale
                <Box as="span" ml={2} display="inline-flex">
                  <MotionImage
                    src={ArrowIcon}
                    alt="Arrow"
                    width="24px"
                    height="24px"
                    filter="brightness(0) invert(1)" // Makes the icon white
                    initial={{ x: 0, y: 0 }}
                    animate={
                      isLinkHovered
                        ? {
                            x: [0, 3, 0],
                            y: [-1, -5, -1],
                          }
                        : { x: 0, y: 0 } // Reset position when not hovered
                    }
                    transition={{
                      x: {
                        duration: 2,
                        ease: "easeInOut",
                        repeat: isLinkHovered ? Infinity : 0,
                        repeatType: "loop",
                      },
                      y: {
                        duration: 2,
                        ease: "easeInOut",
                        repeat: isLinkHovered ? Infinity : 0,
                        repeatType: "loop",
                      },
                    }}
                  />
                </Box>
              </Link>
            </Box>
          </Box>
        </HStack>
      </VStack>

      {/* Add CSS for inverted border radius */}
      <Box
        as="style"
        dangerouslySetInnerHTML={{
          __html: `
        .c-card__title .--inverted-border-radius::before,
        .c-card__title .--inverted-border-radius::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
        }
        
        .c-card__title .--inverted-border-radius.--bottom-right {
          border-bottom-right-radius: 0;
        }
        
        .c-card__title .--inverted-border-radius.--bottom-right::after {
          bottom: 0;
          right: 0;
          transform: translate(100%);
          background: transparent;
          border-bottom-left-radius: 8px;
          box-shadow: -3px 2px 0 0 var(--bg-color);
        }
      `,
        }}
      />
    </>
  );
}

export default AboutUsCards;
