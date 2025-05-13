import React from "react";
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
        height="1px" // Slightly thicker line
        bg="gray.600"
      />

      {/* Vertical line (animates in/out) */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: isOpen ? 0 : 1 }}
        transition={{
          duration: 0.7,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: "1px", // Slightly thicker line
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
}> = ({ item, index }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box borderBottom="1px solid" borderColor="gray.200" position="relative">
      <Box
        as="button"
        onClick={onToggle}
        width="100%"
        textAlign="left"
        borderRadius="md"
        p={2}
        position="relative"
        zIndex="1"
        _before={{
          content: '""',
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          bottom: "50%",
          bg: "gray.50",
          zIndex: "-1",
          transition: "top 0.5s ease, bottom 0.5s ease",
          borderRadius: "md",
        }}
        _hover={{
          _before: {
            top: 0,
            bottom: 0,
          },
        }}
      >
        <Flex justify="space-between" align="center">
          <HStack p={"25px 0px 25px 0px"}>
            <Text
              textStyle="h5"
              color="gray.500"
              // Remove fontSize and fontWeight to allow textStyle to work
            >
              {index < 9 ? `0${index + 1}` : index + 1}.
            </Text>
            <Text
              textStyle="h5"
              pl={"35px"}
              // Only override fontWeight but keep other h5 styles
            >
              {item.question}
            </Text>
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
            <Box pt={4} pl={70} pr={10} pb={2} maxW={"80%"}>
              <Text color="gray.600">{item.answer}</Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

function FAQ() {
  return (
    <VStack spacing={0} align="stretch" width="100%" mx="auto" my={10}>
      <Box borderTop="1px solid" borderColor="gray.200">
        {questions.index.map((item, index) => (
          <FAQItem key={index} item={item} index={index} />
        ))}
      </Box>
    </VStack>
  );
}

export default FAQ;
