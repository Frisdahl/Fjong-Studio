import { HStack, Text, Image } from "@chakra-ui/react";

interface SellingCardsProps {
  title: string;
  description: string;
  imageSrc?: string; // Optional image source
}

function SellingCards() {
  // Card content array
  const cardContent = [
    {
      title: "unikt design",
      description:
        "Med 6 års erfaring inden for design ved vi, hvordan man effektivt præsenterer information på en hjemmeside, så den fanger og fastholder brugerens opmærksomhed.",
      imageSrc: "/images/design.jpg", // Replace with your actual image path
    },
    {
      title: "responsivt layout",
      description:
        "Vi bygger hjemmesider der tilpasser sig perfekt til alle skærmstørrelser, fra mobil til desktop, og sikrer en flydende brugeroplevelse uanset enhed.",
      imageSrc: "/images/responsive.jpg", // Replace with your actual image path
    },
    {
      title: "optimeret hastighed",
      description:
        "Hurtige hjemmesider giver bedre brugeroplevelse og højere konverteringsrate. Vi optimerer hver linje kode for at sikre lynhurtig indlæsningstid.",
      imageSrc: "/images/speed.jpg", // Replace with your actual image path
    },
  ];

  return (
    <HStack width={"100%"} padding={"50px 0px"} gap={"50px"}>
      <Image
        height={"250px"}
        width={"30%"}
        src={imageSrc}
        fallbackSrc="https://via.placeholder.com/300x250"
        objectFit="cover"
      />
      <HStack flexDirection={"column"} alignItems={"flex-start"} width={"70%"}>
        <Text as={"h2"} textStyle={"h3"}>
          {title}
        </Text>
        <Text>{description}</Text>
      </HStack>
    </HStack>
  );
}

export default SellingCards;
