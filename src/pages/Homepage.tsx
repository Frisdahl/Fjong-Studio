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
import { useRef, useEffect } from "react";
import playIcon from "../assets/svg/play-icon.svg";
import SellingCards from "../components/SellingCards";
import ProjectCards from "../components/ProjectCards";
import { Divider } from "@chakra-ui/react";
import logo from "../assets/svg/logo.svg";
import AboutUsCards from "../components/AboutUsCards";
import FAQ from "../components/FAQ";
import AnimatedText from "../components/animations/AnimatedText";
import {
  ScrollRevealText,
  ScrollRevealContent,
} from "../components/animations/ScrollAnimation";
import AnimatedElement from "../components/animations/AnimatedElement";
import FadeIn from "../components/animations/FadeIn";

function Homepage() {
  // Create a ref for the video element
  const videoRef = useRef<HTMLVideoElement>(null);

  // Add new section refs
  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // Small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      // Force GSAP to refresh
      window.dispatchEvent(new Event("resize"));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HStack
        className="hero-section"
        flexDirection={"column"}
        alignItems={"flex-start"}
        padding={{ base: "0px 35px", md: "0px 75px" }}
      >
        <Box
          marginTop={{ base: "35px", md: "100px", lg: "250px" }}
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
            zIndex={"500"}
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
                  base: "2rem",
                  md: "3rem",
                  lg: "4rem",
                  xl: "6rem",
                  "2xl": "7.875rem",
                }}
                whiteSpace="normal"
                width="auto"
                marginRight="10px"
              >
                {/* First line of text */}
                <ScrollRevealText
                  animateOnLoad={true}
                  duration={0.7}
                  stagger={0.02}
                  waveAmplitude={0.7}
                  delay={0.5}
                >
                  Vi skaber digitale
                </ScrollRevealText>
                <br />

                {/* Second line with text and button side by side */}
                <Flex
                  alignItems="center"
                  display="inline-flex"
                  flexWrap="nowrap"
                >
                  <ScrollRevealText
                    animateOnLoad={true}
                    duration={0.7}
                    stagger={0.02}
                    waveAmplitude={0.7}
                    delay={1}
                  >
                    oplevelser
                  </ScrollRevealText>

                  <AnimatedElement
                    display="inline-flex"
                    animationType="fade-scale"
                    duration={0.7}
                    delay={1.2}
                    hoverAnimation={true}
                    hoverScale={1.15}
                    hoverSpeed={0.2}
                  >
                    <FadeIn
                      delay={1.5}
                      duration={1}
                      animateWidth={true}
                      animateHeight={true}
                      animateScale={true}
                      scaleFrom={0}
                      transformOrigin="center center"
                    >
                      <Button
                        ml="20px"
                        variant="unstyled"
                        p={0}
                        onClick={handlePlayClick}
                        display="inline-flex"
                        alignItems="center"
                        justifyContent="center"
                        flexShrink={0}
                      >
                        <Image
                          src={playIcon}
                          alt="Play"
                          width={{ base: "2rem", md: "3.5rem", lg: "5rem" }}
                          height={{ base: "2rem", md: "3.5rem", lg: "5rem" }}
                        />
                      </Button>
                    </FadeIn>
                  </AnimatedElement>
                </Flex>
              </Text>
            </Flex>

            <Text
              fontSize={{ base: "md", md: "lg", lg: "1.75em" }}
              fontFamily="regular"
              as={"text"}
              textStyle={"text"}
              width="100%"
            >
              <ScrollRevealContent slideUp={true} duration={1} delay={1.2}>
                Hjemmesider, der kombinerer funktion og følelse
              </ScrollRevealContent>
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
            zIndex={"1"}
          >
            <AnimatedElement
              animationType="fade"
              duration={1.5}
              delay={1.8}
              ease="power1.inOut"
              width="100%"
              height="100%"
            >
              <Box
                as="video"
                zIndex={"1"}
                ref={videoRef}
                width="100%"
                height="auto"
                objectFit="cover"
                controls={false}
                autoPlay
                muted
                loop
                playsInline
                src="/007.mp4"
                sx={{
                  mixBlendMode: "multiply", // or try "screen" for light backgrounds
                }}
              />
            </AnimatedElement>
          </Box>

          <HStack
            zIndex={"100"}
            flexDirection={"column"}
            alignItems={"flex-end"}
            height="100%" // Fill parent height
            width={{ base: "100%", lg: "auto" }} // Full width on mobile, auto on desktop
            justifyContent="space-between" // Create space between children
            alignSelf="stretch" // Stretch to fill container height
          >
            <Box display={{ base: "none", lg: "block" }} width="100%">
              <VStack align="flex-end" spacing={2} width="100%">
                <ScrollRevealContent delay={2} duration={1}>
                  <Text fontSize={"1.15em"} textAlign="right" width="100%">
                    konceptudvikling
                  </Text>
                </ScrollRevealContent>
                <ScrollRevealContent delay={2.3} duration={1}>
                  <Text fontSize={"1.15em"} textAlign="right" width="100%">
                    adaptive layout
                  </Text>
                </ScrollRevealContent>
                <ScrollRevealContent delay={2.5} duration={1}>
                  <Text fontSize={"1.15em"} textAlign="right" width="100%">
                    admin panel
                  </Text>
                </ScrollRevealContent>
                <ScrollRevealContent delay={2.8} duration={1}>
                  <Text fontSize={"1.15em"} textAlign="right" width="100%">
                    prototype
                  </Text>
                </ScrollRevealContent>
                <ScrollRevealContent delay={3.1} duration={1}>
                  <Text fontSize={"1.15em"} textAlign="right" width="100%">
                    design
                  </Text>
                </ScrollRevealContent>
              </VStack>
            </Box>

            <HStack
              marginTop="auto"
              flexDirection={"column"}
              alignItems={"flex-end"}
              textAlign="right" // Ensure text alignment is set to right
            >
              {/* Push this to the bottom */}
              <FadeIn delay={3.5} duration={1}>
                <Text
                  as={"h4"}
                  textStyle={"h4"}
                  fontFamily="ClashDisplay-Light"
                  fontWeight={"light"}
                >
                  20
                  <Text as="span" color="#005CFF" display="inline">
                    +
                  </Text>
                </Text>
                <Text
                  as={"text"}
                  textStyle={"text"}
                  fontFamily="ClashDisplay-Light"
                  alignSelf={"flex-end"}
                  textAlign="right" // Ensure text alignment is set to right
                >
                  Implementerede <br></br> Projekter
                </Text>
              </FadeIn>
            </HStack>
          </HStack>
        </Box>

        <HStack
          flexDirection={"column"}
          width={"100%"}
          alignItems={"flex-start"}
          marginTop={{ base: "50px", md: "150px", lg: "150px" }}
        >
          <HStack
            flexDirection={"column"}
            alignItems={"flex-start"}
            mb={"3.75rem"}
          >
            <Text
              as={"h5"}
              textStyle={"h5"}
              fontFamily="ClashDisplay-extraLight"
            >
              <ScrollRevealContent slideUp={true} duration={0.6} delay={0.2}>
                Mere end bare hjemmesider
              </ScrollRevealContent>
            </Text>
            <Text
              as={"h2"}
              textStyle={"h2"}
              fontFamily="ClashDisplay-extraLight"
            >
              <ScrollRevealText
                duration={1}
                stagger={0.02}
                waveAmplitude={0.7}
                delay={0.7}
                ease="power2.out"
              >
                moderne
              </ScrollRevealText>
              <br></br>
              <ScrollRevealText
                duration={1}
                stagger={0.02}
                waveAmplitude={0.7}
                delay={0.8}
                ease="power2.out"
              >
                applikationer
              </ScrollRevealText>
            </Text>
          </HStack>
          <Divider borderColor="1a1a1a" border={"1px solid"} />
          <SellingCards cardIndex={0} />
          <Divider borderColor="1a1a1a" border={"1px solid"} />
          <SellingCards cardIndex={1} />
          <Divider borderColor="1a1a1a" border={"1px solid"} />
          <SellingCards cardIndex={2} />
          <Divider borderColor="1a1a1a" border={"1px solid"} />
        </HStack>
      </HStack>
      <HStack
        ref={portfolioRef}
        flexDirection={"column"}
        padding={{ base: "150px 35px", md: "150px 75px" }}
        bg={"accent.sandMed"}
        borderRadius={"100px"}
        width={"100%"}
        alignItems={"flex-start"}
        marginTop={{ base: "50px", md: "150px", lg: "150px" }}
        id="projekter"
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

      <VStack
        ref={servicesRef}
        alignItems={"flex-start"}
        width={"100%"}
        padding={"150px 75px"}
        id="ydelser"
      >
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

      <VStack
        alignItems={"flex-start"}
        width={"100%"}
        padding={"150px 75px"}
        id="ydelser"
      >
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
            py={5}
            px={8}
            height="auto"
            position="relative"
            overflow="hidden"
          >
            <AnimatedText
              text="Se alle spørgsmål"
              isInverted={true}
              height="1.5em"
              fontSize="1rem"
              fontWeight="regular"
              color="white.cream"
            />
          </Button>
        </VStack>
      </VStack>

      <Box ref={contactRef} id="kontakt">
        {/* Footer content */}
      </Box>
    </>
  );
}

export default Homepage;
