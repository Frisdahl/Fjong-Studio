import {
  Box,
  Text,
  VStack,
  Flex,
  Button,
  Image,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useRef } from "react";
import playIcon from "../assets/play-icon.svg";
import SellingCards from "../components/SellingCards";
import ProjectCards from "../components/ProjectCards";
import { Divider } from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import AboutUsCards from "../components/AboutUsCards";
import FAQ from "../components/FAQ";

function Homepage() {
  // Create a ref for the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    // Play the video when the play button is clicked
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <>
      <HStack
        flexDirection={"column"}
        alignItems={"flex-start"}
        padding={{ base: "0px 35px", md: "0px 75px" }}
      >
        <Box
          marginTop={{ base: "35px", md: "100px", lg: "100px" }}
          height={"calc(80vh - 150px)"}
          width="100%"
          display="flex"
          flexDirection={{ base: "column", lg: "row" }}
          alignItems={{ base: "flex-start", lg: "flex-start" }}
          justifyContent="space-between"
          position={"relative"}
        >
          <VStack
            alignItems={"flex-start"}
            maxWidth={{ base: "100%", md: "90%", lg: "100%" }}
            spacing={4}
          >
            {/* Title with play button */}
            <Flex
              alignItems="baseline"
              flexWrap="nowrap"
              width="100%"
              gap={"0px"}
            >
              <Text
                as="h1"
                textStyle="h1"
                fontFamily="Clash Display"
                color="font.dark"
                fontSize={{
                  base: "2rem", // Small screens
                  md: "3rem", // Medium screens
                  lg: "4rem", // Large screens
                  xl: "6rem", // Extra-large screens
                  "2xl": "7.875rem", // Screens wider than 1500px
                }}
                whiteSpace="normal"
                width="auto"
                marginRight="10px"
              >
                Vi skaber digitale <br></br> oplevelser{" "}
                <span>
                  <Button
                    variant="unstyled"
                    p={0}
                    onClick={handlePlayClick}
                    _hover={{ transform: "scale(1.1)" }}
                    transition="transform 0.2s ease"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    zIndex={998}
                  >
                    <Image
                      src={playIcon}
                      alt="Play"
                      width={{ base: "2rem", md: "3.5rem", lg: "5rem" }}
                      height={{ base: "2rem", md: "3.5rem", lg: "5rem" }}
                    />
                  </Button>
                </span>
              </Text>
            </Flex>

            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              fontFamily="ClashDisplay-Light"
              as={"h4"}
              textStyle={"h4"}
              width="100%"
            >
              Hjemmesider, der kombinerer funktion og følelse
            </Text>
          </VStack>

          {/* Video container */}
          <Box
            className="homepage-video"
            position={"absolute"}
            top={{ base: "20%", md: "0px", lg: "-20%" }}
            right={{ base: "0%", md: "0px", lg: "2%" }}
            width={{ base: "100%", md: "50%", lg: "60%" }}
            maxWidth={{ base: "100%", md: "750px", lg: "1500px" }}
            mt={{ base: 8, lg: 0 }}
            borderRadius="md"
            overflow="hidden"
          >
            <Box
              as="video"
              ref={videoRef}
              width="100%"
              height="auto"
              objectFit="cover"
              controls={false}
              muted
              loop
              src="/007.mp4"
              sx={{
                mixBlendMode: "multiply", // or try "screen" for light backgrounds
              }}
            />
          </Box>

          <HStack
            flexDirection={"column"}
            alignItems={"flex-end"}
            height="100%" // Fill parent height
            width={{ base: "100%", lg: "auto" }} // Full width on mobile, auto on desktop
            justifyContent="space-between" // Create space between children
            alignSelf="stretch" // Stretch to fill container height
          >
            <Box display={{ base: "none", lg: "block" }}>
              <VStack align="flex-end" spacing={2}>
                <Text>konceptudvikling</Text>
                <Text>adaptive layout</Text>
                <Text>admin panel</Text>
                <Text>prototype</Text>
                <Text>design</Text>
              </VStack>
            </Box>

            <HStack
              marginTop="auto"
              flexDirection={"column"}
              alignItems={"flex-end"}
              textAlign="right" // Ensure text alignment is set to right
            >
              {/* Push this to the bottom */}
              <Text
                as={"h4"}
                textStyle={"h3"}
                fontFamily="ClashDisplay-Light"
                fontWeight={"light"}
              >
                20
                <Text as="span" color="#005CFF" display="inline">
                  +
                </Text>
              </Text>
              <Text
                as={"h5"}
                textStyle={"h5"}
                fontFamily="ClashDisplay-Light"
                alignSelf={"flex-end"}
                textAlign="right" // Ensure text alignment is set to right
              >
                Implementerede <br></br> Projekter
              </Text>
            </HStack>
          </HStack>
        </Box>

        <HStack
          flexDirection={"column"}
          width={"100%"}
          alignItems={"flex-start"}
          marginTop={{ base: "50px", md: "150px", lg: "150px" }}
        >
          <HStack flexDirection={"column"} alignItems={"flex-start"}>
            <Text
              as={"text"}
              textStyle={"text"}
              fontFamily="ClashDisplay-extraLight"
            >
              Mere end bare hjemmesider
            </Text>
            <Text
              as={"h2"}
              textStyle={"h2"}
              fontFamily="ClashDisplay-extraLight"
            >
              moderne <br></br> applikationer
            </Text>
          </HStack>
          <Divider />
          <SellingCards cardIndex={0} />
          <Divider />
          <SellingCards cardIndex={1} />
          <Divider />
          <SellingCards cardIndex={2} />
          <Divider />
        </HStack>
      </HStack>
      <HStack
        flexDirection={"column"}
        padding={{ base: "150px 35px", md: "150px 75px" }}
        bg={"accent.sandMed"}
        borderRadius={"100px"}
        width={"100%"}
        alignItems={"flex-start"}
        marginTop={{ base: "50px", md: "150px", lg: "150px" }}
      >
        <HStack
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"flex-end"}
        >
          <HStack flexDirection={"column"} alignItems={"flex-start"}>
            <Text
              as={"text"}
              textStyle={"text"}
              fontFamily="ClashDisplay-extraLight"
            >
              Check ud
            </Text>
            <Text
              as={"h2"}
              textStyle={"h2"}
              fontFamily="ClashDisplay-extraLight"
            >
              vores <br></br> portfolio
            </Text>
          </HStack>

          <HStack flexDirection={"column"} alignItems={"flex-end"}>
            <Image src={logo} alt="Portfolio" objectFit="cover" />
            <Text
              as={"text"}
              textStyle={"text"}
              fontFamily="ClashDisplay-extraLight"
              maxW={"400px"}
              textAlign={"right"}
            >
              Vi har hjulpet mange kunder med deres digitale identitet – her er
              et udvalg af vores arbejde.
            </Text>
          </HStack>
        </HStack>
        <Grid
          templateColumns="repeat(2, 1fr)"
          gap={"50px"}
          width="100%"
          mt={"100px"}
        >
          <GridItem
            width={"100%"}
            bg={"accent.blue"}
            borderRadius={"50px"}
            height={"100%"}
          >
            <ProjectCards cardIndex={0} />
          </GridItem>
          <GridItem
            width={"100%"}
            bg={"accent.sand"}
            borderRadius={"50px"}
            height={"100%"}
          >
            <ProjectCards cardIndex={1} />
          </GridItem>
          <GridItem
            width={"100%"}
            bg={"gray.mid"}
            borderRadius={"50px"}
            height={"100%"}
          >
            <ProjectCards cardIndex={2} />
          </GridItem>
          <GridItem
            width={"100%"}
            bg={"gray.light"}
            borderRadius={"50px"}
            height={"100%"}
          >
            <ProjectCards cardIndex={3} />
          </GridItem>
        </Grid>
      </HStack>

      <VStack width={"100%"} alignItems={"flex-start"} padding={"150px 75px"}>
        <VStack alignItems={"flex-start"}>
          <Text
            as={"text"}
            textStyle={"text"}
            fontFamily="ClashDisplay-extraLight"
          >
            vi er
          </Text>
          <Text as={"h2"} textStyle={"h2"} fontFamily="ClashDisplay-extraLight">
            de kreative
          </Text>
        </VStack>
        <Grid templateColumns="repeat(2, 1fr)" gap={"50px"} width="100%">
          <GridItem>
            <AboutUsCards />
          </GridItem>
        </Grid>
      </VStack>

      <VStack alignItems={"flex-start"} width={"100%"} padding={"150px 75px"}>
        <VStack alignItems={"flex-start"}>
          <Text
            as={"text"}
            textStyle={"text"}
            fontFamily="ClashDisplay-extraLight"
          >
            se vores
          </Text>
          <Text as={"h2"} textStyle={"h2"} fontFamily="ClashDisplay-extraLight">
            Ofte stillede spørgsmål
          </Text>
        </VStack>
        <VStack width={"100%"}>
          <FAQ />
          <Button
            bg={"font.dark"}
            color={"white.cream"}
            fontWeight={"regular"}
            _hover={{ bg: "font.dark" }}
            borderRadius={"50px"}
          >
            Se alle spørgsmål
          </Button>
        </VStack>
      </VStack>
    </>
  );
}

export default Homepage;
