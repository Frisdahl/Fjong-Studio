import { Box, Text, Image } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface SellingCardsProps {
  cardIndex: number;
}

function SellingCards({ cardIndex = 0 }: SellingCardsProps) {
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

  // Select the appropriate card content
  const card = cardContent[cardIndex] || cardContent[0];

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
    <Box
      width="100%"
      padding="50px 0px"
      display="flex"
      alignItems={"center"}
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
        gap={"15px"}
      >
        <Text as="h3" textStyle="h3">
          {card.title}
        </Text>

        <Box
          ref={containerRef}
          maxWidth={{ base: "100%", md: "750px" }}
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
  );
}

export default SellingCards;
