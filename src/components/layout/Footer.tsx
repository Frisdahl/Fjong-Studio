import {
  VStack,
  Text,
  Image,
  HStack,
  Box,
  Grid,
  GridItem,
  Button,
  Icon,
  Stack,
} from "@chakra-ui/react";
import EmailIcon from "../../assets/svg/footer-svg/Mail.svg";
import PhoneIcon from "../../assets/svg/footer-svg/phone.svg";
import { useState } from "react";

import AndSymbol from "../../assets/svg/footer-svg/andSymbol.svg";
import CurlyBrackets from "../../assets/svg/footer-svg/curlyBrackets.svg";
import ArrowUp from "../../assets/svg/footer-svg/ArrowUp.svg";
import Star from "../../assets/svg/footer-svg/Star.svg";
import leftRectangle from "../../assets/svg/footer-svg/left-rectangle.svg";
import ScrollRevealText, {
  ScrollRevealContent,
} from "../animations/ScrollAnimation";
import ProjectCards from "../ProjectCards";

function Footer() {
  const [isHovered, setIsHovered] = useState(false);

  const headingSpacing = {
    base: "1rem",
    md: "1.5rem",
    lg: "2.5rem",
    xl: "5rem",
  };

  return (
    <>
      {/* Top SVG icons */}
      <Stack
        direction={{ base: "row", md: "row" }}
        alignItems="flex-end"
        width={{ base: "100%", md: "100%" }}
        justifyContent="space-around"
        spacing={{ base: 2, md: 4 }}
        px={{ base: 4, md: 0 }}
        display={{ base: "none", md: "flex" }} // Hide on very small screens
      >
        <VStack justifyContent="flex-end" alignItems={"flex-end"} height="100%">
          <Image src={leftRectangle} w={{ base: "2rem", md: "auto" }} />
        </VStack>
        <VStack justifyContent="flex-end" height="100%">
          <Image src={AndSymbol} w={{ base: "2rem", md: "auto" }} />
        </VStack>
        <VStack justifyContent="flex-end" height="100%">
          <Image src={CurlyBrackets} w={{ base: "2rem", md: "auto" }} />
        </VStack>
        <VStack justifyContent="flex-end" height="100%">
          <Image src={ArrowUp} w={{ base: "2rem", md: "auto" }} />
        </VStack>
        <VStack justifyContent="flex-end" height="100%">
          <Image src={Star} w={{ base: "2rem", md: "auto" }} />
        </VStack>
      </Stack>

      <VStack
        bg="font.dark"
        justifyContent={"center"}
        position={"relative"}
        borderRadius={{ base: "40px 40px 0px 0px", md: "100px 100px 0px 0px" }}
        padding={{ base: "75px 35px 35px 35px", md: "150px 75px 35px 75px" }}
        width="100%"
      >
        {/* Main content grid */}
        <Grid
          templateColumns={{ base: "1fr", md: " 1fr", lg: "1fr 1.5fr" }}
          width="100%"
          gap={{ base: "4rem", md: "2rem", lg: "2rem" }}
        >
          {/* Left Column - CTA and copyright */}
          <GridItem>
            <VStack
              alignItems={"flex-start"}
              height={"100%"}
              justifyContent={"space-between"}
              width={"100%"}
              spacing={{ base: "3rem", md: "4rem" }}
            >
              <Box width="100%">
                <VStack
                  flexDirection={"column"}
                  alignItems={"flex-start"}
                  mb={headingSpacing}
                  width="100%"
                >
                  <Text
                    as={"text"}
                    textStyle={"h5"}
                    color={"white.cream"}
                    fontSize={{ base: "1.25rem", md: "1.5rem", lg: "1.75rem" }}
                  >
                    <ScrollRevealContent
                      slideUp={true}
                      duration={0.6}
                      delay={0.2}
                    >
                      skal vi starte
                    </ScrollRevealContent>
                  </Text>
                  <Text
                    as={"h2"}
                    textStyle={"h2"}
                    color={"white.cream"}
                    lineHeight={{ base: "1.1", md: "1.2" }}
                  >
                    <ScrollRevealText
                      duration={1}
                      stagger={0.02}
                      waveAmplitude={0.7}
                      delay={0.7}
                      ease="power2.out"
                    >
                      dit projekt
                    </ScrollRevealText>
                  </Text>
                  <Button
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    _hover={"none"}
                    alignSelf={{ base: "center", sm: "flex-start" }}
                    width={{ base: "100%", sm: "auto" }}
                    py={{ base: "1.75rem", md: "2rem", lg: "2rem" }}
                    px={{ base: "1.5rem", md: "2rem", lg: "3.5rem" }}
                    gap={"10px"}
                    bg={"accent.yellow"}
                    color={"font.dark"}
                    fontSize={{ base: "1rem", md: "1.25rem", lg: "1.25rem" }}
                    fontWeight={"regular"}
                    borderRadius={{ base: "50px", md: "50px", lg: "50px" }}
                    mt={{ base: "1.5rem", md: "2rem" }}
                  >
                    send os en besked
                    {/* Arrow icon section - keep existing code */}
                    <Box
                      overflow="hidden"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      width="1.25rem"
                      height="1.25rem"
                      ml={{ base: ".25rem", md: ".25rem", lg: ".5rem" }}
                    >
                      {/* Keep existing arrow icons */}
                      <Box
                        position="relative"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        width="100%"
                        height="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        {/* First Arrow Icon */}
                        <Icon
                          viewBox="0 0 15 13"
                          fill="font.dark"
                          width={"100%"}
                          height={"100%"}
                          transition="transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.4s"
                          position="absolute"
                          top="0"
                          left="0"
                          style={{
                            transform: isHovered
                              ? "translate(20px, -20px) scale(0.8)"
                              : "translate(0, 0) scale(1)",
                          }}
                        >
                          <path
                            d="M12.525 9.9551C12.5411 9.95514 12.8489 9.77069 13.209 9.54521C13.5691 9.3197 13.8566 9.12174 13.848 9.10534C13.8393 9.08894 13.6664 8.85542 13.4637 8.58642C13.0565 8.04622 12.6646 7.33206 12.4909 6.81402C11.9497 5.19946 12.1988 3.52288 13.1811 2.16956L13.4312 1.82494L12.955 1.34876L12.4788 0.872556L12.1641 1.09687C10.1019 2.56648 7.63033 2.39738 5.43904 0.63683C5.29596 0.521857 5.17363 0.433129 5.16716 0.439598C5.1076 0.499155 4.3586 1.7238 4.35878 1.76131C4.3589 1.78842 4.4899 1.89934 4.64987 2.00771C6.4211 3.20783 8.44766 3.59913 10.0142 3.04358L10.3899 2.91032L5.16567 8.15359L1.86219 11.4691L2.82589 12.4328L6.14994 9.12084L11.3809 3.90894L11.2224 4.39306C10.8111 5.64896 10.9796 7.13735 11.7029 8.63795C11.9089 9.06549 12.464 9.95481 12.525 9.9551Z"
                            fill="font.dark"
                          />
                        </Icon>
                        {/* Second Arrow Icon */}
                        <Icon
                          viewBox="0 0 15 13"
                          fill="font.dark"
                          width={"100%"}
                          height={"100%"}
                          transition="transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.4s"
                          position="absolute"
                          top="0"
                          left="0"
                          style={{
                            transform: isHovered
                              ? "translate(0, 0) scale(1)"
                              : "translate(-20px, 20px) scale(0.8)",
                          }}
                        >
                          <path
                            d="M12.525 9.9551C12.5411 9.95514 12.8489 9.77069 13.209 9.54521C13.5691 9.3197 13.8566 9.12174 13.848 9.10534C13.8393 9.08894 13.6664 8.85542 13.4637 8.58642C13.0565 8.04622 12.6646 7.33206 12.4909 6.81402C11.9497 5.19946 12.1988 3.52288 13.1811 2.16956L13.4312 1.82494L12.955 1.34876L12.4788 0.872556L12.1641 1.09687C10.1019 2.56648 7.63033 2.39738 5.43904 0.63683C5.29596 0.521857 5.17363 0.433129 5.16716 0.439598C5.1076 0.499155 4.3586 1.7238 4.35878 1.76131C4.3589 1.78842 4.4899 1.89934 4.64987 2.00771C6.4211 3.20783 8.44766 3.59913 10.0142 3.04358L10.3899 2.91032L5.16567 8.15359L1.86219 11.4691L2.82589 12.4328L6.14994 9.12084L11.3809 3.90894L11.2224 4.39306C10.8111 5.64896 10.9796 7.13735 11.7029 8.63795C11.9089 9.06549 12.464 9.95481 12.525 9.9551Z"
                            fill="font.dark"
                          />
                        </Icon>
                      </Box>
                    </Box>
                  </Button>
                </VStack>
              </Box>

              {/* Copyright section */}
              <Grid
                templateColumns={{
                  base: "1fr",
                  sm: "1fr 1fr",
                  md: "auto auto auto",
                }}
                gap={{ base: "0.5rem", md: "2rem" }}
                mt={{ base: "1rem", md: "0" }}
                width="100%"
              >
                <GridItem>
                  <Text
                    color={"white.cream"}
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontWeight={"light"}
                  >
                    © 2023 Fjong Studio
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    color={"white.cream"}
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontWeight={"light"}
                  >
                    All rights reserved
                  </Text>
                </GridItem>
                <GridItem>
                  <Text
                    color={"white.cream"}
                    fontSize={{ base: "0.875rem", md: "1rem" }}
                    fontWeight={"light"}
                  >
                    CVR: 44638835
                  </Text>
                </GridItem>
              </Grid>
            </VStack>
          </GridItem>

          {/* Right Column - Contact info and social media */}
          <GridItem>
            <Grid
              templateRows="auto auto"
              height="100%"
              width="100%"
              gap={{ base: "2.5rem", md: "5rem" }}
            >
              {/* Social Media Cards - always first */}
              <GridItem order={{ base: 1, md: 1, lg: 3 }}>
                <Grid
                  templateColumns={{
                    base: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  width={"100%"}
                  gap={{ base: "1.5rem", md: "2rem" }}
                >
                  <GridItem>
                    <ProjectCards
                      socialMedia="Facebook"
                      footerCard={true}
                      bgColor="gray.soft"
                    />
                  </GridItem>
                  <GridItem>
                    <ProjectCards
                      socialMedia="Instagram"
                      footerCard={true}
                      bgColor="accent.darksand"
                    />
                  </GridItem>
                  <GridItem colSpan={{ base: "auto", sm: 2, md: 1 }}>
                    <ProjectCards
                      socialMedia="Tiktok"
                      footerCard={true}
                      bgColor="gray.metallic"
                    />
                  </GridItem>
                </Grid>
              </GridItem>

              {/* Contact Information - always last */}
              <GridItem order={{ base: 2, md: 2, lg: 1 }}>
                <Grid
                  templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                  width={"100%"}
                  gap={{ base: "1.5rem", md: "2rem" }}
                >
                  <GridItem>
                    <HStack alignItems={"center"} gap={"15px"}>
                      <Image
                        src={EmailIcon}
                        height={{ base: "1.5rem", md: "2rem" }}
                        width={{ base: "1.5rem", md: "2rem" }}
                      />
                      <Text
                        color={"white.cream"}
                        textStyle={"h5"}
                        fontWeight={"light"}
                        fontSize={{ base: "1rem", md: "1.25rem", lg: "1.5rem" }}
                      >
                        Fjongstudio@gmail.com
                      </Text>
                    </HStack>
                  </GridItem>
                  <GridItem>
                    <HStack alignItems={"center"} gap={"15px"}>
                      <Image
                        src={PhoneIcon}
                        height={{ base: "1.5rem", md: "2rem" }}
                        width={{ base: "1.5rem", md: "2rem" }}
                      />
                      <Text
                        color={"white.cream"}
                        textStyle={"h5"}
                        fontWeight={"light"}
                        fontSize={{ base: "1rem", md: "1.25rem", lg: "1.5rem" }}
                      >
                        +45 42 73 93 63
                      </Text>
                    </HStack>
                  </GridItem>
                </Grid>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </VStack>
    </>
  );
}

export default Footer;
