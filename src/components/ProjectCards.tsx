import { HStack, Text, Image, VStack } from "@chakra-ui/react";
import BangOlufsen from "../assets/images/Bang&olufsen.webp";
import Test from "../assets/images/test.webp";

interface ProjectCardsProps {
  cardIndex: number; // Index to select which card content to display
}

function ProjectCards({ cardIndex = 0 }: ProjectCardsProps) {
  const cardContent = [
    {
      title: "Abtion",
      description:
        "redesign af hjemmesiden for at forbedre brugeroplevelsen og optimere konverteringsraten.",
      imageSrc: BangOlufsen,
    },
    {
      title: "CryoByBreum",
      description:
        "responsivt design og optimering af hjemmesiden for at sikre en ensartet oplevelse på alle enheder.",
      imageSrc: Test,
    },
    {
      title: "Visuel Atelier ",
      description:
        "optimering af hastigheden og ydeevnen på hjemmesiden for at forbedre brugeroplevelsen.",
      imageSrc: "/images/speed.jpg",
    },
    {
      title: "Bang&Olufsen",
      description:
        "Redesign af hjemmesiden der fokuserer på at optimere brugeroplevelsen og konverteringsraten.",
      imageSrc: "/images/speed.jpg",
    },
  ];

  return (
    <HStack
      flexDirection={"column"}
      alignItems={"flex-start"}
      className="project-card"
      gap={"0px"}
      height={"100%"}
    >
      <Image
        height={{ base: "200px", md: "75%" }}
        borderRadius={"50px"}
        width={"100%"}
        src={
          typeof cardContent[cardIndex].imageSrc === "string"
            ? cardContent[cardIndex].imageSrc
            : ""
        }
        fallbackSrc="https://via.placeholder.com/300x250"
        objectFit="cover"
      />
      <VStack
        justifyContent={"flex-start"}
        alignItems={"flex-start"}
        padding={"50px 50px"}
      >
        <Text as="h4" textStyle="h4" color={"white.100"}>
          {cardContent[cardIndex].title}
        </Text>
        <Text
          as="text"
          textStyle="text"
          color={"white.100"}
          fontFamily="extralight"
        >
          {cardContent[cardIndex].description}
        </Text>
      </VStack>
    </HStack>
  );
}

export default ProjectCards;
