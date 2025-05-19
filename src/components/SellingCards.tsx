import { Box, Text, Image, Divider, Icon } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Test from "../assets/images/test.webp"; // Example image import

// Import as React component instead of direct image

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface StaticImageData {
  src: string;
  height?: number;
  width?: number;
  blurDataURL?: string;
}

// Define the card content type
export interface CardContent {
  title: string;
  description: string;
  imageSrc: string | StaticImageData | { src: string; alt?: string };
}

// Updated interface with optional content prop
interface SellingCardsProps {
  cardIndex?: number;
  cards?: CardContent[];
  selectedCard?: CardContent; // Allow passing a single card directly
  services?: boolean;
}

// Default card content
const defaultCardContent: CardContent[] = [
  {
    title: "unikt design",
    description:
      "Med 6 års erfaring inden for design ved vi, hvordan man effektivt præsenterer information på en hjemmeside, så den fanger og fastholder brugerens opmærksomhed.",
    imageSrc: Test,
  },
  {
    title: "responsivt layout",
    description:
      "Vi bygger hjemmesider der tilpasser sig perfekt til alle skærmstørrelser, fra mobil til desktop, og sikrer en flydende brugeroplevelse uanset enhed.",
    imageSrc: Test,
  },
  {
    title: "optimeret hastighed",
    description:
      "Hurtige hjemmesider giver bedre brugeroplevelse og højere konverteringsrate. Vi optimerer hver linje kode for at sikre lynhurtig indlæsningstid.",
    imageSrc: Test,
  },
];

function SellingCards({
  cardIndex = 0,
  cards = defaultCardContent,
  selectedCard,
  services = false,
}: SellingCardsProps) {
  // If a specific card is provided, use it, otherwise select from the array
  const card = selectedCard || cards[cardIndex] || cards[0];
  const [isHovered, setIsHovered] = useState(false);

  // Create managed lines for the description
  const [processedLines, setProcessedLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<Array<HTMLDivElement | null>>([]);

  // Split the text into exactly 2 lines
  useEffect(() => {
    // Calculate optimal line split when container is available
    if (containerRef.current && card.description) {
      // Clear previous lines
      setProcessedLines([]);

      const splitIntoTwoLines = () => {
        const text = card.description;
        const containerWidth = containerRef.current?.clientWidth || 0;

        // No calculation needed if container width is 0
        if (containerWidth === 0) {
          return [text, ""];
        }

        // Create a temporary element to measure text
        const tempSpan = document.createElement("span");
        tempSpan.style.position = "absolute";
        tempSpan.style.visibility = "hidden";
        tempSpan.style.whiteSpace = "nowrap";
        tempSpan.style.fontSize = "1rem"; // Match your font size
        tempSpan.style.fontFamily = getComputedStyle(
          containerRef.current as Element
        ).fontFamily;
        document.body.appendChild(tempSpan);

        // Split by words to find the best break point
        const words = text.split(" ");
        let firstLine = "";
        let secondLine = "";

        // First pass: find max words that fit on first line
        let maxFirstLineWords = 0;
        for (let i = 0; i < words.length; i++) {
          const testLine = words.slice(0, i + 1).join(" ");
          tempSpan.textContent = testLine;
          const lineWidth = tempSpan.getBoundingClientRect().width;

          if (lineWidth <= containerWidth) {
            maxFirstLineWords = i + 1;
          } else {
            break;
          }
        }

        // Second pass: try to balance the lines for better aesthetics
        // Aim for around 65-70% of container width as ideal threshold
        const idealWidth = containerWidth * 0.7;
        let bestBreakIndex = maxFirstLineWords;
        let bestDifference = Infinity;

        // Try different break points around the max to find most balanced option
        const rangeStart = Math.floor(maxFirstLineWords * 0.7); // Start from 70% of max
        const rangeEnd = Math.min(words.length - 1, maxFirstLineWords);

        for (let i = rangeStart; i <= rangeEnd; i++) {
          const testLine = words.slice(0, i).join(" ");
          tempSpan.textContent = testLine;
          const lineWidth = tempSpan.getBoundingClientRect().width;

          const difference = Math.abs(lineWidth - idealWidth);
          if (difference < bestDifference) {
            bestDifference = difference;
            bestBreakIndex = i;
          }
        }

        // Create final lines using the best break point
        firstLine = words.slice(0, bestBreakIndex).join(" ");
        secondLine = words.slice(bestBreakIndex).join(" ");

        // Clean up
        document.body.removeChild(tempSpan);

        return [firstLine, secondLine];
      };

      const lines = splitIntoTwoLines();
      setProcessedLines(lines);
    }
  }, [card.description, containerRef.current]);

  // Animate the lines when they're ready
  useEffect(() => {
    if (processedLines.length === 0 || !linesRef.current.length) return;

    const lines = linesRef.current.filter(Boolean);
    if (lines.length === 0) return;

    // Set initial state - hide lines and position them below
    gsap.set(lines, {
      y: 30,
      opacity: 0,
    });

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current as Element,
        start: "top bottom-=100px",
        toggleActions: "play none none none",
      },
    });

    // Animate each line with staggered timing
    tl.to(lines, {
      duration: 0.8,
      y: 0,
      opacity: 1,
      stagger: 0.15,
      ease: "power3.out",
      clearProps: "opacity",
    });

    // Clean up
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [processedLines]);

  // Reset refs when lines change
  useEffect(() => {
    linesRef.current = linesRef.current.slice(0, processedLines.length);
  }, [processedLines]);

  return (
    <>
      <Divider borderColor="1a1a1a" border={"1px solid"} />
      <Box
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        width="100%"
        padding={{ base: "5rem 0rem", md: "5rem 0rem" }}
        display="flex"
        alignItems={"center"}
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: "3rem", md: "4rem" }}
        cursor={services ? "pointer" : "default"}
      >
        <Box
          height={{ base: "200px", md: "100%" }}
          width={{ base: "100%", md: "25%" }}
          overflow="hidden"
          borderRadius={{ base: "1rem", md: "2rem", lg: "2rem" }}
        >
          <Image
            width={"100%"}
            src={
              typeof card.imageSrc === "string"
                ? card.imageSrc
                : typeof card.imageSrc === "object" && "src" in card.imageSrc
                ? card.imageSrc.src
                : card.imageSrc
            }
            alt={
              typeof card.imageSrc === "object" && "alt" in card.imageSrc
                ? card.imageSrc.alt
                : `Image for ${card.title}`
            }
            fallbackSrc="https://via.placeholder.com/300x250"
            objectFit="cover"
            {...(services && {
              transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              transform: isHovered ? "scale(1.08)" : "scale(1)",
            })}
          />
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          width={{ base: "100%", md: "75%" }}
        >
          <Box>
            <Text
              as="span"
              textStyle="h3"
              display="inline-flex"
              alignItems="center"
            >
              {card.title}
              {services && (
                <Box
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  position="relative"
                  width="2.25rem"
                  height="2.25rem"
                  ml={{ base: ".25rem", md: ".25rem", lg: ".5rem" }}
                  // Hide overflow for all children
                >
                  <Box
                    position="relative"
                    width="100%"
                    height="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    overflow="hidden"
                  >
                    {/* First Arrow Icon (moves out top right on hover) */}
                    <Icon
                      viewBox="0 0 15 13"
                      fill="accent.yellow"
                      width="100%"
                      height="100%"
                      transition="transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.4s"
                      position="absolute"
                      top="0"
                      left="0"
                      style={{
                        transform: isHovered
                          ? "translate(100%, -100%) scale(0.8)"
                          : "translate(0, 0) scale(1)",
                        opacity: 1,
                        pointerEvents: "none",
                      }}
                    >
                      <path
                        d="M12.525 9.9551C12.5411 9.95514 12.8489 9.77069 13.209 9.54521C13.5691 9.3197 13.8566 9.12174 13.848 9.10534C13.8393 9.08894 13.6664 8.85542 13.4637 8.58642C13.0565 8.04622 12.6646 7.33206 12.4909 6.81402C11.9497 5.19946 12.1988 3.52288 13.1811 2.16956L13.4312 1.82494L12.955 1.34876L12.4788 0.872556L12.1641 1.09687C10.1019 2.56648 7.63033 2.39738 5.43904 0.63683C5.29596 0.521857 5.17363 0.433129 5.16716 0.439598C5.1076 0.499155 4.3586 1.7238 4.35878 1.76131C4.3589 1.78842 4.4899 1.89934 4.64987 2.00771C6.4211 3.20783 8.44766 3.59913 10.0142 3.04358L10.3899 2.91032L5.16567 8.15359L1.86219 11.4691L2.82589 12.4328L6.14994 9.12084L11.3809 3.90894L11.2224 4.39306C10.8111 5.64896 10.9796 7.13735 11.7029 8.63795C11.9089 9.06549 12.464 9.95481 12.525 9.9551Z"
                        fill="accent.yellow"
                      />
                    </Icon>
                    {/* Second Arrow Icon (moves in from bottom left to first arrow's start position on hover) */}
                    <Icon
                      viewBox="0 0 15 13"
                      fill="accent.yellow"
                      width="100%"
                      height="100%"
                      transition="transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.4s"
                      position="absolute"
                      top="0"
                      left="0"
                      style={{
                        transform: isHovered
                          ? "translate(0, 0) scale(1)"
                          : "translate(-120%, 120%) scale(0.8)",
                        opacity: isHovered ? 1 : 0,
                        pointerEvents: "none",
                      }}
                    >
                      <path
                        d="M12.525 9.9551C12.5411 9.95514 12.8489 9.77069 13.209 9.54521C13.5691 9.3197 13.8566 9.12174 13.848 9.10534C13.8393 9.08894 13.6664 8.85542 13.4637 8.58642C13.0565 8.04622 12.6646 7.33206 12.4909 6.81402C11.9497 5.19946 12.1988 3.52288 13.1811 2.16956L13.4312 1.82494L12.955 1.34876L12.4788 0.872556L12.1641 1.09687C10.1019 2.56648 7.63033 2.39738 5.43904 0.63683C5.29596 0.521857 5.17363 0.433129 5.16716 0.439598C5.1076 0.499155 4.3586 1.7238 4.35878 1.76131C4.3589 1.78842 4.4899 1.89934 4.64987 2.00771C6.4211 3.20783 8.44766 3.59913 10.0142 3.04358L10.3899 2.91032L5.16567 8.15359L1.86219 11.4691L2.82589 12.4328L6.14994 9.12084L11.3809 3.90894L11.2224 4.39306C10.8111 5.64896 10.9796 7.13735 11.7029 8.63795C11.9089 9.06549 12.464 9.95481 12.525 9.9551Z"
                        fill="accent.yellow"
                      />
                    </Icon>
                  </Box>
                </Box>
              )}
            </Text>
            {services && (
              <Divider
                bgColor={isHovered ? "white.cream" : "transparent"}
                marginBottom="1em"
                borderRadius={"1px"}
                width={isHovered ? "100%" : "0%"}
                height="1px"
                transition={"width 0.5s ease"}
              />
            )}
          </Box>

          <Box
            ref={containerRef}
            maxWidth={{ base: "100%", md: "750px", xl: "1000px" }}
            width="100%"
          >
            {/* Manually render each line with animation */}
            {processedLines.map((line, index) => (
              <Box
                key={`line-${index}`}
                ref={(el) => {
                  linesRef.current[index] = el;
                }}
                className="split-line"
                display="block"
                overflow="hidden"
                textStyle={"text"}
                marginBottom={index < processedLines.length - 1 ? "0.3em" : 0}
                width="100%"
              >
                {line}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SellingCards;
