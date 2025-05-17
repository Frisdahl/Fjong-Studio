import { useState } from "react";
import {
  VStack,
  HStack,
  Button,
  Text,
  Box,
  Grid,
  GridItem,
} from "@chakra-ui/react";

// Define a type for valid tab names
type TabName = "startpakke" | "virksomhed" | "propakke";

export default function ProductMenu() {
  // Specify the state type
  const [activeTab, setActiveTab] = useState<TabName>("startpakke");

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

  // Helper function to get the correct description based on active tab
  const getFeatureDescription = (feature: string): string => {
    // If the feature has a description in the appropriate tab's map, use it
    if (activeTab === "propakke" && featureProDescriptionMap[feature]) {
      return featureProDescriptionMap[feature];
    }

    if (
      (activeTab === "propakke" || activeTab === "virksomhed") &&
      featureVirksomhedDescriptionMap[feature]
    ) {
      return featureVirksomhedDescriptionMap[feature];
    }

    // Default to the startpakke description for any tab
    if (featureStartDescriptionMap[feature]) {
      return featureStartDescriptionMap[feature];
    }

    // Fallback if no description exists
    return "";
  };

  return (
    <VStack spacing={8} align="stretch" width="100%">
      {/* Horizontal Menu */}
      <HStack
        justify="space-between"
        border={"1px solid"}
        borderColor={"font.dark"}
        borderRadius={{ base: "50px", md: "50px", lg: "50px" }}
        maxW={{ base: "100%", md: "80%", lg: "80%", xl: "50%" }}
        overflow={"hidden"}
      >
        <Button
          fontSize={{ base: "1.25rem", md: "1.25rem", lg: "1.25rem" }}
          py={{ base: "2rem", md: "2rem", lg: "1.5rem" }} // padding top & bottom
          px={{ base: "2rem", md: "2rem", lg: "2rem" }} // padding left & right
          width={"100%"}
          onClick={() => setActiveTab("startpakke")}
          bg={activeTab === "startpakke" ? "accent.blue" : "transparent"}
          color={activeTab === "startpakke" ? "white" : "gray.800"}
          _hover={
            activeTab === "startpakke"
              ? { bg: "font.dark", opacity: 0.9 }
              : { bg: "transparent" }
          }
          borderRadius={{ base: "50px", md: "50px", lg: "50px" }}
          fontWeight={activeTab === "startpakke" ? "medium" : "regular"}
        >
          Start Pakke
        </Button>
        <Button
          fontSize={{ base: "1.25rem", md: "1.25rem", lg: "1.25rem" }}
          py={{ base: "2rem", md: "2rem", lg: "1.5rem" }} // padding top & bottom
          px={{ base: "2rem", md: "2rem", lg: "2rem" }} // padding left & right
          width={"100%"}
          onClick={() => setActiveTab("virksomhed")}
          bg={activeTab === "virksomhed" ? "accent.blue" : "transparent"}
          color={activeTab === "virksomhed" ? "white" : "gray.800"}
          borderRadius={{ base: "50px", md: "50px", lg: "50px" }}
          borderLeftColor="font.dark"
          _hover={
            activeTab === "virksomhed"
              ? { bg: "font.dark", opacity: 0.9 }
              : { bg: "transparent" }
          }
          fontWeight={activeTab === "virksomhed" ? "medium" : "regular"}
          boxShadow={
            activeTab === "startpakke"
              ? "2px 0 3px 0 rgba(26, 26, 26, 0.15)"
              : activeTab === "propakke"
              ? "-2px 0 3px 0 rgba(26, 26, 26, 0.15)" // stronger shadow for propakke
              : "-1px 0 2px 0 rgba(26, 26, 26, 0.1)" // default shadow for virksomhed
          }
        >
          Virksomhed
        </Button>
        <Button
          fontSize={{ base: "1.25rem", md: "1.25rem", lg: "1.25rem" }}
          py={{ base: "2rem", md: "2rem", lg: "1.5rem" }} // padding top & bottom
          px={{ base: "2rem", md: "2rem", lg: "2rem" }} // padding left & right
          width={"100%"}
          _hover={
            activeTab === "propakke"
              ? { bg: "font.dark", opacity: 0.9 }
              : { bg: "transparent" }
          }
          onClick={() => setActiveTab("propakke")}
          bg={activeTab === "propakke" ? "accent.blue" : "transparent"}
          color={activeTab === "propakke" ? "white" : "gray.800"}
          borderRadius={{ base: "50px", md: "50px", lg: "50px" }}
          fontWeight={activeTab === "propakke" ? "medium" : "regular"}
        >
          Pro Pakke
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
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {menuContent[activeTab].title} - {menuContent[activeTab].price}
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
            {activeTab === "startpakke" &&
              menuContent["startpakke"].features.map(
                (feature: string, index: number) => (
                  <GridItem key={index}>
                    <VStack align="flex-start" spacing={1}>
                      <Text fontWeight="medium">{feature}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {getFeatureDescription(feature)}
                      </Text>
                    </VStack>
                  </GridItem>
                )
              )}
            {activeTab === "virksomhed" &&
              menuContent["virksomhed"].features.map(
                (feature: string, index: number) => (
                  <GridItem key={index}>
                    <VStack align="flex-start" spacing={1}>
                      <Text fontWeight="medium">{feature}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {getFeatureDescription(feature)}
                      </Text>
                    </VStack>
                  </GridItem>
                )
              )}
            {activeTab === "propakke" &&
              menuContent["propakke"].features.map(
                (feature: string, index: number) => (
                  <GridItem key={index}>
                    <VStack align="flex-start" spacing={1}>
                      <Text fontWeight="medium">{feature}</Text>
                      <Text fontSize="sm" color="gray.600">
                        {getFeatureDescription(feature)}
                      </Text>
                    </VStack>
                  </GridItem>
                )
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
