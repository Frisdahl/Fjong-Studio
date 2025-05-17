import { VStack, Text, Image, HStack } from "@chakra-ui/react";
import logo from "../../assets/svg/logo-white.svg";
import EmailIcon from "../../assets/svg/footer-svg/Mail.svg";
import PhoneIcon from "../../assets/svg/footer-svg/phone.svg";
import Instagram from "../../assets/svg/footer-svg/instagram.svg";
import Facebook from "../../assets/svg/footer-svg/facebook.svg";
import TikTok from "../../assets/svg/footer-svg/TikTok.svg";
import AndSymbol from "../../assets/svg/footer-svg/andSymbol.svg";
import CurlyBrackets from "../../assets/svg/footer-svg/curlyBrackets.svg";
import ArrowUp from "../../assets/svg/footer-svg/ArrowUp.svg";
import Star from "../../assets/svg/footer-svg/Star.svg";
import leftRectangle from "../../assets/svg/footer-svg/left-rectangle.svg";

function Footer() {
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
            width={"50%"}
            alignItems={"flex-start"}
            height={"100%"}
            justifyContent={"space-between"}
          >
            <Image src={logo} width={"350px"} />
            <HStack>
              <HStack mr={"50px"}>
                <Text
                  color={"white.cream"}
                  textStyle={"text"}
                  fontFamily={"extralight"}
                >
                  © 2023 Fjong Studio
                </Text>
                <Text
                  color={"white.cream"}
                  textStyle={"text"}
                  fontFamily={"extralight"}
                >
                  All rights reserved
                </Text>
              </HStack>
              <Text
                color={"white.cream"}
                textStyle={"text"}
                fontFamily={"extralight"}
              >
                CVR: 44638835
              </Text>
            </HStack>
          </VStack>

          <VStack
            height={"100%"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            width={"50%"}
          >
            <VStack alignItems={"flex-start"} gap={"50px"} width={"100%"}>
              <Text
                color={"white.cream"}
                textStyle={"text"}
                fontFamily={"extralight"}
              >
                Har du spørgsmål? <br></br> Skriv endelig — vi svarer hurtigt!
              </Text>

              <VStack gap={"25px"} alignItems={"flex-start"} width={"100%"}>
                <HStack alignItems={"flex-end"} gap={"20px"}>
                  <Image src={EmailIcon} height={"2rem"} width={"2rem"} />

                  <Text
                    color={"white.cream"}
                    textStyle={"h5"}
                    fontFamily={"extralight"}
                  >
                    Fjongstudio@gmail.com
                  </Text>
                </HStack>
                <HStack alignItems={"flex-end"} gap={"20px"}>
                  <Image src={PhoneIcon} height={"2rem"} width={"2rem"} />

                  <Text
                    color={"white.cream"}
                    textStyle={"h5"}
                    fontFamily={"extralight"}
                  >
                    +45 42 73 93 63
                  </Text>
                </HStack>
              </VStack>
            </VStack>

            <HStack width={"100%"} justifyContent={"flex-end"}>
              <Image src={Instagram} />
              <Image src={TikTok} />
              <Image src={Facebook} />
            </HStack>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
}

export default Footer;
