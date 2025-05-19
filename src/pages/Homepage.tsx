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
import AboutUsCards from "../components/AboutUsCards";
import FAQ from "../components/FAQ";
import {
  ScrollRevealText,
  ScrollRevealContent,
} from "../components/animations/ScrollAnimation";
import AnimatedElement from "../components/animations/AnimatedElement";
import FadeIn from "../components/animations/FadeIn";
import ProductMenu from "../components/ProductMenu";
import Test from "../assets/images/test.webp";

function Homepage() {
  const heroTitlePadding = {
    base: "150px",
    md: "150px",
    lg: "100px",
    xl: "150px",
  };
  const sectionSpacing = {
    base: "5rem",
    md: "5rem",
    lg: "7.5rem",
    xl: "10rem",
  };

  const sectionRadius = {
    base: "25px",
    md: "50px",
    lg: "75px",
  };

  const headingSpacing = {
    base: "1.5rem",
    md: "2rem",
    lg: "2.5rem",
    xl: "5rem",
  };

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
      <HStack flexDirection={"column"} alignItems={"center"}>
        <Box
          className="hero-section"
          height={{ base: "calc(100vh - 100px)", xl: "calc(100vh - 100px)" }}
          display={"flex"}
          flexDirection={{ base: "column", md: "row" }}
          position={"relative"}
          pt={heroTitlePadding}
          width="90%"
        >
          <VStack
            alignItems={"flex-start"}
            width={{ base: "100%", lg: "50%", xl: "100%" }}
            maxWidth={{ base: "100%", md: "90%", lg: "100%" }}
            spacing={4}
            position={"relative"}
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
                color="font.dark"
                pt={heroTitlePadding}
                whiteSpace="normal"
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
                  zIndex={"500"}
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
                          width={{
                            base: "2rem",
                            md: "3rem",
                            lg: "3.5rem",
                            xl: "5rem",
                          }}
                          height={{
                            base: "2rem",
                            md: "3rem",
                            lg: "3.5rem",
                            xl: "5rem",
                          }}
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

          <AnimatedElement
            position={"absolute"}
            animationType="fade"
            duration={1.5}
            delay={1.8}
            ease="power1.inOut"
            width="100%"
            height="100%"
            zIndex={"1"}
          >
            <Box
              top={{ base: "35%", md: "25%", lg: "0%" }}
              // Align right on desktop, left on tablet
              right={{ base: "0%", md: "0%", lg: "75px" }}
              position={"absolute"}
              as="video"
              ref={videoRef}
              width={{ base: "1500px", md: "100%", lg: "60%" }}
              height="auto"
              objectFit="cover"
              controls={false}
              autoPlay
              muted
              loop
              playsInline
              src="/007.mp4"
            />
          </AnimatedElement>

          <HStack
            zIndex={"100"}
            flexDirection={"column"}
            alignItems={"flex-end"}
            height="100%" // Fill parent height
            width={{ base: "100%", lg: "50%", xl: "100%" }} // Full width on mobile, auto on desktop
            justifyContent="space-between" // Create space between children
            alignSelf="stretch" // Stretch to fill container height
          >
            <Box display={{ base: "none", lg: "block" }} pt={heroTitlePadding}>
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
                  fontFamily="Clash Display"
                  fontWeight={400}
                >
                  20
                  <Text as="span" color="#005CFF" display="inline">
                    +
                  </Text>
                </Text>
                <Text
                  as={"text"}
                  textStyle={"text"}
                  fontFamily="Clash Display"
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
          width={"90%"}
          alignItems={"flex-start"}
          gap={"0px"}
          mt={sectionSpacing}
        >
          <VStack
            flexDirection={"column"}
            alignItems={"flex-start"}
            mb={headingSpacing}
          >
            <Text as={"text"} textStyle={"h5"}>
              <ScrollRevealContent slideUp={true} duration={0.6} delay={0.2}>
                Mere end bare hjemmesider
              </ScrollRevealContent>
            </Text>
            <Text as={"h2"} textStyle={"h2"}>
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
          </VStack>

          <SellingCards cardIndex={0} />
          <SellingCards cardIndex={1} />
          <SellingCards cardIndex={2} />
          <Divider borderColor="1a1a1a" border={"1px solid"} />
        </HStack>
      </HStack>
      <HStack
        ref={portfolioRef}
        flexDirection={"column"}
        bg={"white.cream"}
        borderRadius={sectionRadius}
        mt={sectionSpacing}
        id="projekter"
        width={"100%"}
        justifyContent={"center"}
      >
        <HStack width={"90%"} flexDirection={"column"} pt={"150px"}>
          <HStack
            width={"100%"}
            justifyContent={"space-between"}
            mb={headingSpacing}
          >
            <VStack flexDirection={"column"} alignItems={"flex-start"}>
              <Text as={"text"} textStyle={"h5"}>
                Check ud
              </Text>
              <Text as={"h2"} textStyle={"h2"}>
                vores <br></br> portfolio
              </Text>
            </VStack>

            <Text
              as={"text"}
              fontSize={{ base: "1rem", md: "1rem", lg: "1.25rem" }}
              maxW={"400px"}
              lineHeight={"125%"}
              fontWeight={"regular"}
              textAlign={"right"}
              display={{ base: "none", md: "block" }}
            >
              Vi har hjulpet mange kunder med deres digitale identitet – her er
              et udvalg af vores arbejde.
            </Text>
          </HStack>
          <Grid
            templateColumns={{
              base: "1fr",
              lg: "repeat(2, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={{ base: "1.875rem", md: "1.875rem", lg: "1.875rem" }}
            width="100%"
          >
            <GridItem width={"100%"}>
              <ProjectCards cardIndex={0} bgColor={"accent.blue"} />
            </GridItem>
            <GridItem width={"100%"}>
              <ProjectCards cardIndex={1} bgColor="accent.sand" />
            </GridItem>
            <GridItem width={"100%"}>
              <ProjectCards cardIndex={2} bgColor="gray.mid" />
            </GridItem>
            <GridItem width={"100%"}>
              <ProjectCards cardIndex={3} bgColor="gray.light" />
            </GridItem>

            <GridItem width={"100%"}>
              <ProjectCards cardIndex={3} bgColor="#3B3C3D" />
            </GridItem>
            <GridItem width={"100%"}>
              <ProjectCards cardIndex={3} bgColor="#509ABE" />
            </GridItem>
            <GridItem width={"100%"}>
              <ProjectCards cardIndex={3} bgColor="gray.light" />
            </GridItem>
            <GridItem width={"100%"}>
              <ProjectCards cardIndex={3} bgColor="#FE3828" />
            </GridItem>
          </Grid>
        </HStack>
      </HStack>

      <VStack
        width={"100%"}
        flexDirection={"column"}
        mt={sectionSpacing}
        alignItems={"center"}
        id="ydelser"
      >
        <VStack
          flexDirection={"column"}
          alignItems={"flex-start"}
          mb={headingSpacing}
          width={"90%"}
        >
          <Text as={"text"} textStyle={"h5"}>
            Se vores pakker til
          </Text>
          <Text as={"h2"} textStyle={"h2"}>
            hjemmeside
          </Text>

          <ProductMenu />
        </VStack>

        <VStack
          borderRadius={sectionRadius}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={headingSpacing}
          mt={sectionSpacing}
          bg={"gray.metallic"}
          color={"white.cream"}
          width={"100%"}
          pt={sectionSpacing}
        >
          <VStack width={"90%"}>
            <HStack
              mb={headingSpacing}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <HStack flexDirection={"column"} alignItems={"flex-start"}>
                <Text as={"text"} textStyle={"h5"}>
                  Se hvad vi ellers
                </Text>
                <Text as={"h2"} textStyle={"h2"}>
                  tilbyder
                </Text>
              </HStack>

              <HStack flexDirection={"column"} alignItems={"flex-end"}>
                <Text
                  as={"text"}
                  textStyle={"text"}
                  lineHeight={"125%"}
                  maxW={"400px"}
                  textAlign={"right"}
                  display={{ base: "none", md: "block" }}
                  width={{ base: "100%", md: "75%", lg: "100%" }}
                >
                  Udover hjemmesideudvikling tilbyder vi et komplet udvalg af
                  services til visuel branding af produkter og services.
                </Text>
              </HStack>
            </HStack>
            <SellingCards
              selectedCard={{
                title: "Præsentations design",
                description:
                  "Vi hjælper med at skabe visuelt stærke præsentationer, der gør komplekse budskaber lette at forstå og tiltrækker brugerens opmærksomhed fra første øjekast.",
                imageSrc: Test,
              }}
              services={true}
            />
            <SellingCards
              selectedCard={{
                title: "Branding og Identitet",
                description:
                  "Vi styrker din virksomheds visuelle identitet gennem gennemtænkt design, der skaber genkendelighed og troværdighed på tværs af platforme og medier.",
                imageSrc: Test,
              }}
              services={true}
            />
            <SellingCards
              selectedCard={{
                title: "Tryksager og grafisk design",
                description:
                  "Vi skaber professionelle materialer som flyers, brochurer, visitkort og plakater, der visuelt understøtter din kommunikation – både digitalt og på tryk.",
                imageSrc: Test,
              }}
              services={true}
            />
          </VStack>
        </VStack>
      </VStack>

      <VStack
        ref={servicesRef}
        alignItems={"center"}
        mt={sectionSpacing}
        width={"100%"}
        gap={"0px"}
      >
        <VStack
          width={"90%"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          mb={headingSpacing}
        >
          <VStack alignItems={"flex-start"} mb={headingSpacing}>
            <Text as={"text"} textStyle={"h5"}>
              Hvem er
            </Text>
            <Text as={"h2"} textStyle={"h2"}>
              Fjong Studio
            </Text>
          </VStack>
          <Grid
            templateColumns={{ base: "1fr", md: "1fr", lg: "1fr 1fr" }}
            gap={"50px"}
            width="100%"
          >
            <GridItem>
              <AboutUsCards />
            </GridItem>
          </Grid>
        </VStack>
      </VStack>

      <VStack alignItems={"center"} width={"100%"} mt={sectionSpacing}>
        <VStack alignItems={"flex-start"} gap={".5rem"} width={"90%"}>
          <VStack alignItems={"flex-start"}>
            <Text as={"text"} textStyle={"h5"}>
              se vores
            </Text>
            <Text as={"h2"} textStyle={"h2"}>
              Ofte stillede spørgsmål
            </Text>
          </VStack>
        </VStack>
        <VStack width={"100%"}>
          <FAQ />
          <Button
            bg={"font.dark"}
            color={"white.cream"}
            fontWeight={"regular"}
            _hover={{ bg: "font.dark" }}
            borderRadius={"50px"}
            p={"15px 35px"}
            height="auto"
            position="relative"
            overflow="hidden"
          >
            se alle spørgsmål
          </Button>
        </VStack>
      </VStack>

      <Box ref={contactRef} id="kontakt" mt={sectionSpacing}>
        {/* Footer content */}
      </Box>
    </>
  );
}

export default Homepage;
