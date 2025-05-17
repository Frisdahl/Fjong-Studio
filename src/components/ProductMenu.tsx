import { useState } from "react";
import {
  Image,
  VStack,
  HStack,
  Button,
  Text,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import AnimatedElement from "./animations/AnimatedElement";
import fireIcon from "../assets/svg/fire-icon.svg"; // Import the fire icon

// Define a type for valid tab names
type TabName = "startpakke" | "virksomhed" | "propakke";

export default function ProductMenu() {
  // Specify the state type
  const [activeTab, setActiveTab] = useState<TabName>("startpakke");
  const [previousTab, setPreviousTab] = useState<TabName>("startpakke"); // Add this state

  const featureStartDescriptionMap: Record<string, string> = {
    Landingsprototype: "En klikbar model af din side til hurtig afprøvning.",
    Landingsudvikling:
      "Vi udvikler din landingsside klar til lancering og optimeret til alle enheder.",
    "Unikt design": "Tilpasset dit brand – intet er standard.",
    "Opsætning af Google Analytics":
      "Få indsigt i dine besøgendes adfærd med opsat sporing og statistik.",
    "Tilkobling af ansøgningsformularer":
      "Et skræddersyet design, der matcher dit brand og skiller dig ud fra konkurrenterne.",
    "Logodesign som gave":
      "Vi designer et unikt logo til dig, så du kan få en stærk visuel identitet med i pakken.",
  };

  const featureVirksomhedDescriptionMap: Record<string, string> = {
    "Notifikationer i Telegram":
      "Bliv straks opdateret med kundehenvendelser og bestillinger direkte i Telegram.",
    "Adminpanel til styring af hjemmesiden":
      "Få adgang til et brugervenligt kontrolpanel, hvor du nemt kan opdatere indhold og administrere siden.",
    "Ring-op widgets og online chat":
      "Giv dine kunder mulighed for at kontakte dig direkte via telefon eller chat.",
    Multilandingsider:
      "Opret flere landingssider til forskellige kampagner eller produkter.",
    Geotargeting:
      "Vis specifikt indhold til besøgende baseret på deres geografiske placering.",
    "Animation af hjemmesideelementer":
      "Tilføj liv til din hjemmeside med animationer og interaktive elementer.",
  };

  const featureProDescriptionMap: Record<string, string> = {
    "CRM-integration":
      "Få alle dine kundehenvendelser samlet ét sted med integration til dit CRM-system.",
    Betalingsløsning:
      "Modtag betalinger direkte på din hjemmeside med sikre og brugervenlige betalingssystemer.",
    "IP-telefoni og opkaldssporing":
      "Spor og analyser dine opkald med IP-telefoni og call tracking, så du kan måle dine kampagners effektivitet.",
    "Indsamling af e-maildatabase":
      "Opbyg en værdifuld e-mailliste til nyhedsbreve og kampagner gennem smarte tilmeldingsformularer.",
    "Opsætning af kontekstuel annoncering":
      "Få hjælp til at opsætte målrettede Google Ads eller andre annoncer, der rammer de rigtige kunder på det rette tidspunkt.",
  };

  // Define content with proper typing
  const menuContent: Record<
    TabName,
    {
      title: string;
      price: string;
      description: string;
      features: string[];
      featureDescription?: string[];
    }
  > = {
    startpakke: {
      title: "Start Pakke",
      price: "3.999 kr",
      description:
        "Perfekt til opstart af små virksomheder og personlige hjemmesider.",
      features: [
        "Landingsprototype",
        "Landingsudvikling",
        "Unikt design",
        "Opsætning af Google Analytics",
        "Tilkobling af ansøgningsformularer",
        "Logodesign som gave",
      ],
    },
    virksomhed: {
      title: "Virksomhed",
      price: "9.999 kr",
      description:
        "Ideel til etablerede virksomheder med behov for flere funktioner.",
      features: [
        "Landingsprototype",
        "Landingsudvikling",
        "Unikt design",
        "Opsætning af Google Analytics",
        "Tilkobling af ansøgningsformularer",
        "Logodesign som gave",
        "Notifikationer i Telegram",
        "Adminpanel til styring af hjemmesiden",
        "Ring-op widgets og online chat",
        "Multilandingsider",
        "Geotargeting",
        "Animation af hjemmesideelementer",
      ],
    },
    propakke: {
      title: "Pro Pakke",
      price: "19.999 kr",
      description:
        "Komplet løsning til virksomheder med omfattende online behov.",
      features: [
        "Landingsprototype",
        "Landingsudvikling",
        "Unikt design",
        "Opsætning af Google Analytics",
        "Tilkobling af ansøgningsformularer",
        "Logodesign som gave",
        "Notifikationer i Telegram",
        "Adminpanel til styring af hjemmesiden",
        "Ring-op widgets og online chat",
        "Multilandingsider",
        "Geotargeting",
        "Animation af hjemmesideelementer",
        "CRM-integration",
        "Betalingsløsning",
        "IP-telefoni og opkaldssporing",
        "Indsamling af e-maildatabase",
        "Opsætning af kontekstuel annoncering",
      ],
    },
  };

  function getFeatureDescription(feature: string) {
    // This function returns the correct description for a feature
    // based on the active tab and the feature name.
    // It uses the feature description maps defined above.

    if (featureStartDescriptionMap[feature]) {
      return featureStartDescriptionMap[feature];
    } else if (featureVirksomhedDescriptionMap[feature]) {
      return featureVirksomhedDescriptionMap[feature];
    } else if (featureProDescriptionMap[feature]) {
      return featureProDescriptionMap[feature];
    }

    return "";
  }

  // Example button click handler
  const handleTabChange = (newTab: TabName) => {
    setPreviousTab(activeTab);
    setActiveTab(newTab);
  };

  return (
    <VStack
      p={{ base: "1rem", md: "1.5rem", lg: "2rem" }}
      align="stretch"
      width="100%"
      bg={"white.cream"}
      borderRadius={{ base: "50px", md: "50px", lg: "50px" }}
    >
      {/* Horizontal Menu */}
      <HStack
        flexDirection={{ base: "column", md: "row" }}
        justify="space-between"
        borderColor="font.dark"
        borderRadius={{ base: "50px", md: "50px", lg: "50px" }}
        maxW={{ base: "100%", md: "80%", lg: "80%", xl: "50%" }}
        overflow="hidden"
        boxShadow="0px 4px 16px rgba(26, 26, 26, 0.10)" // softer, larger shadow
        p="0.25rem"
      >
        <Button
          fontSize={{ base: "1.25rem", md: "1.25rem", lg: "1.25rem" }}
          py={{ base: "2rem", md: "2rem", lg: "1.5rem" }}
          px={{ base: "2rem", md: "2rem", lg: "2rem" }}
          width="100%"
          onClick={() => handleTabChange("startpakke")}
          bg={activeTab === "startpakke" ? "accent.blue" : "transparent"}
          color={activeTab === "startpakke" ? "white" : "gray.800"}
          _hover={
            activeTab === "startpakke"
              ? { bg: "font.dark", opacity: 0.95 }
              : { bg: "gray.100" }
          }
          borderRadius="40px"
          fontWeight={activeTab === "startpakke" ? "medium" : "regular"}
          transition="background 0.2s, color 0.2s"
          boxShadow={
            activeTab === "startpakke"
              ? "0 2px 8px 0 rgba(26, 26, 26, 0.10)"
              : "none"
          }
        >
          Start Pakke
        </Button>
        <Button
          fontSize={{ base: "1.25rem", md: "1.25rem", lg: "1.25rem" }}
          py={{ base: "2rem", md: "2rem", lg: "1.5rem" }}
          px={{ base: "2rem", md: "2rem", lg: "2rem" }}
          width="100%"
          onClick={() => handleTabChange("virksomhed")}
          bg={activeTab === "virksomhed" ? "accent.blue" : "transparent"}
          color={activeTab === "virksomhed" ? "white" : "gray.800"}
          borderRadius="40px"
          _hover={
            activeTab === "virksomhed"
              ? { bg: "font.dark", opacity: 0.95 }
              : { bg: "gray.100" }
          }
          fontWeight={activeTab === "virksomhed" ? "medium" : "regular"}
          transition="background 0.2s, color 0.2s"
          boxShadow={
            activeTab === "virksomhed"
              ? "0 2px 8px 0 rgba(26, 26, 26, 0.10)"
              : "none"
          }
        >
          Virksomhed
        </Button>
        <Button
          fontSize={{ base: "1.25rem", md: "1.25rem", lg: "1.25rem" }}
          py={{ base: "2rem", md: "2rem", lg: "1.5rem" }}
          px={{ base: "2rem", md: "2rem", lg: "2rem" }}
          width="100%"
          gap="10px"
          onClick={() => handleTabChange("propakke")}
          bg={activeTab === "propakke" ? "accent.blue" : "transparent"}
          color={activeTab === "propakke" ? "white" : "gray.800"}
          borderRadius="40px"
          fontWeight={activeTab === "propakke" ? "medium" : "regular"}
          _hover={
            activeTab === "propakke"
              ? { bg: "font.dark", opacity: 0.95 }
              : { bg: "gray.100" }
          }
          transition="background 0.2s, color 0.2s"
          boxShadow={
            activeTab === "propakke"
              ? "0 2px 8px 0 rgba(26, 26, 26, 0.10)"
              : "none"
          }
        >
          Pro Pakke
          <Image
            src={fireIcon}
            boxSize={{ base: "1.5rem", md: "1.5rem", xl: "1.5rem" }}
          />
        </Button>
      </HStack>

      {/* Content Area */}
      <Box
        p={{ base: "1rem", md: "1.5rem", lg: "2rem" }}
        borderRadius="lg"
        bg="transparent"
      >
        <VStack
          mb={{ base: "1rem", md: "1.5rem", lg: "2rem" }}
          align="flex-start"
        >
          <Text textStyle={"h5"} fontWeight="medium" mb={2}>
            {menuContent[activeTab].title}{" "}
          </Text>
          <Text mb={4}>{menuContent[activeTab].description}</Text>
        </VStack>

        <Box>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={{ base: "1rem", md: "2rem" }}
          >
            {menuContent[activeTab].features.map(
              (feature: string, index: number) => {
                // Check if this feature is new in the current tab (not in previous tabs)
                const isInStartPakke =
                  menuContent["startpakke"].features.includes(feature);
                const isInVirksomhed =
                  menuContent["virksomhed"].features.includes(feature);

                // Determine if feature should be animated based on current tab
                const shouldAnimate =
                  (activeTab === "virksomhed" && !isInStartPakke) ||
                  (activeTab === "propakke" &&
                    previousTab === "startpakke" &&
                    !isInStartPakke) ||
                  (activeTab === "propakke" &&
                    previousTab === "virksomhed" &&
                    !isInVirksomhed);

                // Get the right description for this feature
                const description = getFeatureDescription(feature);

                return (
                  <GridItem key={`${activeTab}-${feature}-${index}`}>
                    <VStack align="flex-start" spacing={1}>
                      {shouldAnimate ? (
                        // Animate both feature name and description for new features
                        <AnimatedElement
                          animationType="fade-up"
                          duration={0.4}
                          delay={index * 0.05}
                        >
                          <VStack align="flex-start" spacing={1} width="100%">
                            <Text fontWeight="medium">{feature}</Text>
                            <Text fontSize="sm" color="gray.600">
                              {description}
                            </Text>
                          </VStack>
                        </AnimatedElement>
                      ) : (
                        // No animation for existing features
                        <>
                          <Text fontWeight="medium">{feature}</Text>
                          <Text fontSize="sm" color="gray.600">
                            {description}
                          </Text>
                        </>
                      )}
                    </VStack>
                  </GridItem>
                );
              }
            )}
          </Grid>
        </Box>
      </Box>
      <Button
        alignSelf={"end"}
        py={{ base: "1rem", md: "1.5rem", lg: "1.5rem" }}
        px={{ base: "1rem", md: "1.5rem", lg: "2rem" }}
        bg={"accent.yellow"}
        color={"font.dark"}
        fontWeight={"regular"}
        _hover={{
          px: { base: "2rem", md: "2.5rem", lg: "3rem" }, // Increased padding
          bg: "accent.yellow",
        }}
        borderRadius={{ base: "50px", md: "50px", lg: "50px" }}
        mb={{ base: "1rem", md: "1.5rem", lg: "2rem" }}
        mr={{ base: "1rem", md: "1.5rem", lg: "2rem" }}
      >
        Få et gratis tilbud
      </Button>
    </VStack>
  );
}
