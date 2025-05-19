import React from "react";
import { VStack, Text, HStack, Image, Box, Flex } from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";
import AlexanderPortrait from "../assets/images/alexander-portrait.jpg";
import asterisk from "../assets/svg/asterisk.svg";

const AboutUs = {
  name: "Alexander Frisdahl",
  title: "Webudvikler",
  workarea1: "Skaber brandidentitet gennem React, Typescript og Figma",
  workarea2: "Udvikler intuitive brugeroplevelser med moderne teknologi",
  quete: "Building digital solutions with focus on design and performance.",
};

function AboutUsCards() {
  return (
    <>
      <VStack
        position="relative"
        borderRadius={{ base: "25px", md: "50px" }}
        p={{ base: "25px", md: "35px", lg: "50px" }}
        alignItems="start"
        w="100%"
        boxShadow="0px 4px 20px 0px rgba(27, 26, 26, 0.1)" // Add this line for the shadow
      >
        <VStack
          pb={{ base: "10px", md: "10px", lg: "15px" }}
          align="start"
          gap={0}
        >
          <Text
            as="h4"
            textStyle="h4"
            pb={{ base: "5px", md: "5px", lg: "10px" }}
          >
            {AboutUs.name}
          </Text>
          <Text as="text" textStyle="h5" fontWeight={"extralight"}>
            {AboutUs.title}
          </Text>
        </VStack>

        <Divider borderColor="font.dark" opacity={0.3} borderWidth="1px" />

        {/* Main content section - stack vertically on mobile */}
        <Flex
          pt={{ base: "25px", md: "50px", lg: "75px" }}
          direction={{ base: "column", md: "row" }}
          w="100%"
          align={{ base: "center", md: "center", lg: "center" }}
          gap={{ base: 8, md: 4 }}
        >
          {/* Left content */}
          <VStack
            gap={{ base: "25px", md: "35px", lg: "50px" }}
            maxW={{ base: "100%", md: "50%", lg: "50%" }}
            align="start"
            flex="1"
          >
            <HStack alignItems="flex-start">
              <Image
                src={asterisk}
                boxSize={{ base: "0.8rem", md: "1rem" }}
                color="font"
                opacity="50%"
              />
              <Text as="text" textStyle="text" color="font">
                {AboutUs.workarea1}
              </Text>
            </HStack>

            <HStack alignItems="flex-start" spacing={3}>
              <Image
                src={asterisk}
                boxSize={{ base: "0.8rem", md: "1rem" }}
                color="font"
                opacity="50%"
              />
              <Text as="text" textStyle="text" color="font">
                {AboutUs.workarea2}
              </Text>
            </HStack>
          </VStack>

          {/* Image - order changes on mobile */}
          <Box
            flex={{ base: "1", md: "0.8" }}
            order={{ base: -1, md: 2 }}
            mb={{ base: 4, md: 0 }}
            textAlign={{ base: "center", md: "right" }}
            display={"flex"}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <Image
              src={AlexanderPortrait}
              borderRadius="50%"
              width={{ base: "100%", md: "80%", lg: "100%" }}
            />
          </Box>
        </Flex>

        {/* Quote section */}
        <Flex
          pt={{ base: "25px", md: "40px" }}
          alignItems="flex-end"
          justifyContent="space-between"
          width="100%"
        >
          <VStack align="start" spacing={1}>
            <Text
              fontStyle="italic"
              as={"text"}
              textStyle="text"
              color="font"
              fontWeight={"medium"}
              mb={"10px"}
            >
              {AboutUs.quete}{" "}
            </Text>
            <Text as={"text"} textStyle="text" color="font">
              {"— "}
              {AboutUs.name}
            </Text>
          </VStack>
        </Flex>
      </VStack>
    </>
  );
}

export default AboutUsCards;
