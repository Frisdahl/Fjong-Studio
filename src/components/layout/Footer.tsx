import { VStack, Text, Image, HStack } from "@chakra-ui/react";
import logo from "../../assets/svg/logo-white.svg";
import EmailIcon from "../../assets/svg/Mail.svg";
import PhoneIcon from "../../assets/svg/phone.svg";
import Instagram from "../../assets/svg/instagram.svg";
import Facebook from "../../assets/svg/facebook.svg";
import TikTok from "../../assets/svg/TikTok.svg";
import LeftSymbols from "../../assets/svg/leftSymbols.svg";
import AndSymbol from "../../assets/svg/andSymbol.svg";
import CurlyBrackets from "../../assets/svg/curlyBrackets.svg";
import ArrowUp from "../../assets/svg/ArrowUp.svg";
import Star from "../../assets/svg/Star.svg";

function Footer() {
  return (
    <>
      <HStack
        alignItems={"flex-end"}
        width={"100%"}
        justifyContent={"space-around"}
      >
        <Image src={LeftSymbols} pl={"50px"} />
        <Image src={AndSymbol} />
        <Image src={CurlyBrackets} />
        <Image src={ArrowUp} />
        <Image src={Star} />
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
