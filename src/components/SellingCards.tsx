import { Box, Text, Image } from "@chakra-ui/react";

interface SellingCardsProps {
  cardIndex: number; // Index to select which card content to display
}

function SellingCards({ cardIndex = 0 }: SellingCardsProps) {
  // Card content array
  const cardContent = [
    {
      title: "unikt design",
      description:
        "Med 6 års erfaring inden for design ved vi, hvordan man effektivt præsenterer information på en hjemmeside, så den fanger og fastholder brugerens opmærksomhed.",
      imageSrc: "/images/design.jpg",
    },
    {
      title: "responsivt layout",
      description:
        "Vi bygger hjemmesider der tilpasser sig perfekt til alle skærmstørrelser, fra mobil til desktop, og sikrer en flydende brugeroplevelse uanset enhed.",
      imageSrc: "/images/responsive.jpg",
    },
    {
      title: "optimeret hastighed",
      description:
        "Hurtige hjemmesider giver bedre brugeroplevelse og højere konverteringsrate. Vi optimerer hver linje kode for at sikre lynhurtig indlæsningstid.",
      imageSrc: "/images/speed.jpg",
    },
  ];

  // Select the appropriate card content based on the index
  const card = cardContent[cardIndex] || cardContent[0]; // Default to first card if index is invalid

  return (
    <Box
      width="100%"
      padding="50px 0px"
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: "25px", md: "50px" }}
    >
      <Image
        height={{ base: "200px", md: "250px" }}
        width={{ base: "100%", md: "30%" }}
        src={card.imageSrc}
        fallbackSrc="https://via.placeholder.com/300x250"
        objectFit="cover"
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width={{ base: "100%", md: "70%" }}
      >
        <Text as="h3" textStyle="h3">
          {card.title}
        </Text>
        <Text textStyle="text" maxWidth={{ base: "100%", md: "750px" }}>
          {card.description}
        </Text>
      </Box>
    </Box>
  );
}

export default SellingCards;
