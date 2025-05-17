import React, { useRef, useLayoutEffect, useState } from "react";
import {
  HStack,
  VStack,
  Text,
  Box,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";

const questions = {
  index: [
    {
      question: "Hvilke teknologier bruger i til at bygge hjemmesider?",
      answer:
        "Vi bruger en kombination af React, Next.js og Tailwind CSS til at bygge moderne og responsive hjemmesider. Disse teknologier giver os mulighed for at skabe hurtige og brugervenlige oplevelser.",
    },
    {
      question: "Hvad koster det at få lavet en hjemmeside?",
      answer:
        "Prisen afhænger af projektets omfang og kompleksitet. Vi tilbyder skræddersyede løsninger baseret på dine behov og mål.",
    },
    {
      question: "Hvor lang tid tager det at bygge en hjemmeside?",
      answer:
        "Tidsrammen varierer efter projektets størrelse. En simpel hjemmeside kan tage 2-4 uger, mens mere komplekse løsninger kan tage 2-3 måneder eller længere.",
    },
    {
      question: "Hvordan foregår processen fra idé til færdig hjemmeside?",
      answer:
        "Vi starter med en grundig konsultation for at forstå dine behov. Derefter skaber vi et designkoncept, som vi præsenterer for dig. Når designet er godkendt, går vi i gang med udviklingen og holder dig opdateret undervejs.",
    },
    {
      question: "Kan i hjælpe med vedligeholdelse efter siden er lanceret?",
      answer:
        "Ja, vi tilbyder vedligeholdelsespakker, der inkluderer opdateringer, sikkerhedskopier og support. Vi ønsker at sikre, at din hjemmeside altid fungerer optimalt.",
    },
  ],
};

// Fixed: Added proper type for isOpen prop
interface AnimatedIconProps {
  isOpen: boolean;
}

// Custom animated plus/minus icon with larger size
const AnimatedIcon: React.FC<AnimatedIconProps> = ({ isOpen }) => {
  // Make icon size match h5 text
  const iconSize = "1.5rem"; // Increase from 16px to match h5 text size

  return (
    <Box
      position="relative"
      width={iconSize}
      height={iconSize}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Horizontal line (always present) */}
      <Box
        as="span"
        position="absolute"
        width="100%"
        height="2px" // Slightly thicker line
        bg="gray.600"
      />

      {/* Vertical line (animates in/out) */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isOpen ? 0 : 1 }}
        transition={{
          duration: 0.4,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "2px", // Slightly thicker line
          height: iconSize, // Match the box height
          backgroundColor: "var(--chakra-colors-gray-600)",
          transformOrigin: "center",
        }}
      />
    </Box>
  );
};

// FAQ Item component for each individual question
const FAQItem: React.FC<{
  item: { question: string; answer: string };
  index: number;
  indexWidth: number;
}> = ({ item, index, indexWidth }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box borderBottom="1px solid" borderColor="gray.200" position="relative">
      <Box
        pr={"75px"}
        as="button"
        onClick={onToggle}
        width="100%"
        textAlign="left"
        borderRadius="md"
        position="relative"
        zIndex="1"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          bottom: "50%",
          bg: "gray.50",
          zIndex: "-1",
          transition:
            "top 0.4s cubic-bezier(0.4,0,0.2,1), bottom 0.4s cubic-bezier(0.4,0,0.2,1)",
          borderRadius: "md",
        }}
        _hover={{
          _before: {
            top: 0,
            bottom: 0,
          },
        }}
        transition="background 0.4s cubic-bezier(0.4,0,0.2,1)"
      >
        <Flex justify="space-between" align="center">
          <HStack p={"25px 0px 25px 75px"} gap={0}>
            <motion.span
              style={{
                display: "inline-block",
                width: "3rem",
                textAlign: "right",
              }}
              initial={false}
              animate={{ color: "#718096" }}
              transition={{ duration: 0.3 }}
            >
              <Text textStyle="h5" color="inherit" as="span">
                {index < 9 ? `0${index + 1}` : index + 1}.
              </Text>
            </motion.span>
            <motion.span
              style={{
                display: "inline-block",
                paddingLeft: `${indexWidth}px`,
              }}
              initial={false}
              animate={{ color: "#2D3748" }}
              transition={{ duration: 0.3 }}
            >
              <Text textStyle="h5" color="inherit" pl={"2rem"}>
                {item.question}
              </Text>
            </motion.span>
          </HStack>
          <AnimatedIcon isOpen={isOpen} />
        </Flex>
      </Box>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* The answer needs to align with the question text, not the index */}
            {/* So we need: HStack padding + index width + question padding */}
            <Box
              pl={`calc(75px + ${indexWidth}px + 3rem + 2rem)`}
              pr={10}
              pb={2}
              maxW={"80%"}
            >
              <Text color="gray.600">{item.answer}</Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

function FAQ() {
  // Add state for index width
  const [indexWidth, setIndexWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);

  // Measure the width of "02." once on mount
  useLayoutEffect(() => {
    if (measureRef.current) {
      setIndexWidth(measureRef.current.offsetWidth);
    }
  }, []);

  return (
    <VStack spacing={0} align="stretch" width="100%" mx="auto" my={10}>
      {/* Hidden element to measure the index width */}

      <Box borderTop="1px solid" borderColor="gray.200">
        {questions.index.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            index={index}
            indexWidth={indexWidth}
          />
        ))}
      </Box>
    </VStack>
  );
}

export default FAQ;
