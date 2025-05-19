import {
  VStack,
  Text,
  Image,
  HStack,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import EmailIcon from "../../assets/svg/footer-svg/Mail.svg";
import PhoneIcon from "../../assets/svg/footer-svg/phone.svg";

import AndSymbol from "../../assets/svg/footer-svg/andSymbol.svg";
import CurlyBrackets from "../../assets/svg/footer-svg/curlyBrackets.svg";
import ArrowUp from "../../assets/svg/footer-svg/ArrowUp.svg";
import Star from "../../assets/svg/footer-svg/Star.svg";
import leftRectangle from "../../assets/svg/footer-svg/left-rectangle.svg";
import ScrollRevealText, {
  ScrollRevealContent,
} from "../animations/ScrollAnimation";
import FooterCards from "../FooterCards";

function Footer() {
  const headingSpacing = {
    base: "1.5rem",
    md: "2rem",
    lg: "2.5rem",
    xl: "5rem",
  };

  return (
    <>
      <HStack
        alignItems="flex-end"
        width={{ base: "100%", md: "60%", lg: "100%" }}
        justifyContent="space-around"
      >
        <VStack justifyContent="flex-end" alignItems={"flex-end"} height="100%">
          <Image src={leftRectangle} />
        </VStack>
        <VStack justifyContent="flex-end" height="100%">
          <Image src={AndSymbol} />
        </VStack>
        <VStack justifyContent="flex-end" height="100%">
          <Image src={CurlyBrackets} />
        </VStack>
        <VStack justifyContent="flex-end" height="100%">
          <Image src={ArrowUp} />
        </VStack>
        <VStack justifyContent="flex-end" height="100%">
          <Image src={Star} />
        </VStack>
      </HStack>

      <VStack
        bg="font.dark"
        height="80vh"
        justifyContent={"center"}
        position={"relative"}
        borderRadius={"100px 100px 0px 0px"}
        padding={"150px 75px 35px 75px"}
      >
        <HStack
          alignItems={"flex-start"}
          height={"100%"}
          width={"100%"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", md: "row" }}
        >
          <VStack
            alignItems={"flex-start"}
            height={"100%"}
            justifyContent={"space-between"}
            width={"45%"}
          >
            <Box>
              <VStack
                flexDirection={"column"}
                alignItems={"flex-start"}
                mb={headingSpacing}
              >
                <Text as={"text"} textStyle={"h5"} color={"white.cream"}>
                  <ScrollRevealContent
                    slideUp={true}
                    duration={0.6}
                    delay={0.2}
                  >
                    skal vi starte
                  </ScrollRevealContent>
                </Text>
                <Text as={"h2"} textStyle={"h2"} color={"white.cream"}>
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
              </VStack>
            </Box>
            <HStack>
              <HStack mr={"50px"}>
                <Text
                  color={"white.cream"}
                  textStyle={"text"}
                  fontWeight={"light"}
                >
                  © 2023 Fjong Studio
                </Text>
                <Text
                  color={"white.cream"}
                  textStyle={"text"}
                  fontWeight={"light"}
                >
                  All rights reserved
                </Text>
              </HStack>
              <Text
                color={"white.cream"}
                textStyle={"text"}
                fontWeight={"light"}
              >
                CVR: 44638835
              </Text>
            </HStack>
          </VStack>

          <VStack
            height={"100%"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            width={"75%"}
          >
            <VStack
              alignItems={"flex-start"}
              gap={"100px"}
              width={"100%"}
              height={"100%"}
              justifyContent={"space-between"}
            >
              <VStack gap={"2rem"} alignItems={"flex-start"}>
                <HStack alignItems={"flex-end"} gap={"20px"}>
                  <Image src={EmailIcon} height={"2rem"} width={"2rem"} />
                  <Text
                    color={"white.cream"}
                    textStyle={"h5"}
                    fontWeight={"light"}
                  >
                    Fjongstudio@gmail.com
                  </Text>
                </HStack>

                <HStack alignItems={"flex-start"} gap={"20px"}>
                  <Image src={PhoneIcon} height={"2rem"} width={"2rem"} />
                  <Text
                    color={"white.cream"}
                    textStyle={"h5"}
                    fontWeight={"light"}
                  >
                    +45 42 73 93 63
                  </Text>
                </HStack>
              </VStack>

              <Grid
                templateColumns={"repeat(3, 1fr)"}
                width={"100%"}
                gap={"1.5rem"}
              >
                <GridItem>
                  <FooterCards
                    bgColor="gray.metallic"
                    socialMedia="Instagram"
                  />
                </GridItem>
                <GridItem>
                  <FooterCards bgColor="gray.metallic" socialMedia="Facebook" />
                </GridItem>
                <GridItem>
                  <FooterCards bgColor="gray.metallic" socialMedia="Tiktok" />
                </GridItem>
              </Grid>
            </VStack>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}

export default Footer;
