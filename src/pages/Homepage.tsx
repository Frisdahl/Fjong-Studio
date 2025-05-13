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
import React, { useRef, useEffect } from "react";
import playIcon from "../assets/svg/play-icon.svg";
import SellingCards from "../components/SellingCards";
import ProjectCards from "../components/ProjectCards";
import { Divider } from "@chakra-ui/react";
import logo from "../assets/svg/logo.svg";
import AboutUsCards from "../components/AboutUsCards";
import FAQ from "../components/FAQ";
import AnimatedText from "../components/AnimatedText";
import AnimatedButton from "../components/AnimatedButtons";
import { ScrollRevealText } from "../components/ScrollAnimation";
import { gsap } from "gsap";
import { usePageAnimation } from "../context/PageAnimationContext";

function Homepage() {
  // Create refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Use our custom hook instead of useContext
  const { runPageAnimation } = usePageAnimation();

  // Run the animation when component mounts
  useEffect(() => {
    // Set initial state for the header
    if (headerRef.current) {
      gsap.set(headerRef.current, { opacity: 0 });

      // Fade in the header container
      gsap.to(headerRef.current, {
        opacity: 1,
        duration: 0.8,
        delay: 0.25,
        ease: "power2.out",
      });
    }

    // Run the title and subtitle animations
    // Cast refs if needed to match the type expected by PageAnimationContext
    runPageAnimation(
      titleRef as unknown as React.RefObject<Element>,
      subtitleRef as unknown as React.RefObject<Element>
    );
  }, [runPageAnimation]);

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
        ref={headerRef} // Master container
        flexDirection={"column"}
        alignItems={"flex-start"}
        padding={{ base: "0px 35px", md: "0px 75px" }}
        opacity={0}
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
          >
            {/* Title with play button */}
            <Flex
              alignItems="baseline"
              flexWrap="nowrap"
              width="100%"
              gap={"0px"}
            >
              <Box
                ref={titleRef} // Title container
                as="h1"
                textStyle={"h1"}
                lineHeight="0.9"
              >
                <ScrollRevealText
                  direction="up"
                  stagger={0.015}
                  duration={0.4}
                  waveAmplitude={0.6}
                  threshold={0.2}
                  ease="power2.out"
                >
                  Vi skaber digitale
                </ScrollRevealText>

                <Box
                  display="flex"
                  alignItems="baseline"
                  as="h1"
                  textStyle={"h1"}
                  lineHeight="0.9"
                >
                  <ScrollRevealText
                    direction="up"
                    stagger={0.008}
                    duration={0.35}
                    waveAmplitude={0.4}
                    delay={0.2}
                    ease="circOut"
                  >
                    oplevelser
                  </ScrollRevealText>

                  {/* Button wrapper with its own reveal animation */}
                  <AnimatedButton
                    variant="unstyled"
                    p={0}
                    onClick={handlePlayClick}
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    flexShrink={0}
                    zIndex={998}
                    ml={"20px"}
                    delay={1.0} // Delay this until after text animation
                    duration={0.1}
                    animationType="fade-scale"
                    hoverScale={1.15}
                    hoverSpeed={0.1}
                  >
                    <Image
                      src={playIcon}
                      alt="Play"
                      width={{ base: "2rem", md: "3.5rem", lg: "5rem" }}
                      height={{ base: "2rem", md: "3.5rem", lg: "5rem" }}
                    />
                  </AnimatedButton>
                </Box>
              </Box>
            </Flex>

            {/* The subtitle with its own animation */}
            <Box
              ref={subtitleRef} // Subtitle container
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              mt={2}
              display="flex"
              alignItems="baseline"
            >
              <ScrollRevealText
                direction="up"
                stagger={0.008}
                duration={0.35}
                waveAmplitude={0.4}
                delay={0.2}
                ease="circOut"
              >
                Hjemmesider, der kombinerer funktion og følelse
              </ScrollRevealText>
            </Box>
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
          ref={portfolioRef} // Add this ref
          flexDirection={"column"}
          padding={{ base: "150px 35px", md: "150px 75px" }}
          bg={"accent.sandMed"}
          borderRadius={"100px"}
          width={"100%"}
          alignItems={"flex-start"}
          marginTop={{ base: "50px", md: "150px", lg: "150px" }}
          id="projekter" // Add an ID for direct linking
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
      <Box id="projekter">
        <Text as={"h2"} textStyle={"h2"} fontFamily="ClashDisplay-extraLight">
          vores <br></br> portfolio
        </Text>
        {/* Rest of portfolio section */}
      </Box>

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

      <Box id="ydelser">{/* FAQ section */}</Box>

      <VStack
        ref={servicesRef} // Add this ref
        alignItems={"flex-start"}
        width={"100%"}
        padding={"150px 75px"}
        id="ydelser" // Add an ID for direct linking
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

      <Box id="kontakt">{/* Contact/footer section */}</Box>

      <Box
        ref={contactRef} // Add this ref
        id="kontakt" // Add an ID for direct linking
      >
        {/* Footer content */}
      </Box>
    </>
  );
}

export default Homepage;
