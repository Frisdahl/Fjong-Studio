import React, { useState } from "react";
import {
  VStack,
  Text,
  Box,
  useDisclosure,
  Grid,
  GridItem,
  Button,
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
    {
      question:
        "Hvordan sikrer I, at designet matcher min virksomheds visuelle identitet?",
      answer:
        "Vi tager udgangspunkt i din eksisterende branding – fx logo, farver og typografi – og integrerer det i designet. Har du ikke en visuel identitet endnu, hjælper vi gerne med at udvikle en sammen med dig.",
    },
    {
      question: "Er hjemmesidens design mobilvenligt og responsivt?",
      answer:
        "Ja, vi designer altid med mobil først i tankerne. Alle vores løsninger tilpasses automatisk til mobil, tablet og desktop, så brugeren får en god oplevelse uanset enhed.",
    },
    {
      question:
        "Får jeg mulighed for at godkende designet, inden I bygger siden?",
      answer:
        "Absolut. Vi laver først en visuel prototype eller mockup, som du kan gennemgå og komme med feedback til. Først når du er tilfreds, går vi videre til selve udviklingen.",
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
        borderRadius={"2px"}
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
          borderRadius: "2px",
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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      borderBottom="1px solid"
      borderColor="gray.200"
      width="100%"
      display={"flex"}
      justifyContent={"center"}
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      overflow="hidden" // Important to contain the animated element
    >
      {/* Animated background */}
      <motion.div
        initial={false}
        animate={{
          scaleY: isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "var(--chakra-colors-gray-50)",
          transformOrigin: "center",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Use CSS Grid for alignment */}
      <Grid
        templateColumns="auto 1fr auto"
        columnGap="2rem"
        width="90%"
        position="relative"
        zIndex={1}
      >
        {/* Index Column */}
        <GridItem alignSelf="start" py="25px">
          <Text textStyle="h5" color="gray.500" as="span">
            {index < 9 ? `0${index + 1}` : index + 1}.
          </Text>
        </GridItem>

        {/* Content Column - contains both question and answer */}
        <GridItem>
          <Box
            as="button"
            onClick={onToggle}
            width="100%"
            textAlign="left"
            py="25px"
            transition="all 0.4s"
            borderRadius="md"
          >
            <Text textStyle="h5" color="gray.700">
              {item.question}
            </Text>
          </Box>

          {/* Answer */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Box pb="25px">
                  <Text color="gray.600">{item.answer}</Text>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        </GridItem>

        {/* Icon Column */}
        <GridItem py="25px" pr="10px" alignSelf="start">
          <AnimatedIcon isOpen={isOpen} />
        </GridItem>
      </Grid>
    </Box>
  );
};

function FAQ() {
  const [showAllQuestions, setShowAllQuestions] = useState(false);

  // Show first 5 questions or all questions based on state
  const questionsToShow = showAllQuestions
    ? questions.index
    : questions.index.slice(0, 5);

  const toggleQuestions = () => {
    setShowAllQuestions(!showAllQuestions);
  };

  return (
    <VStack spacing={0} align="stretch" width="100%" mx="auto" my={10}>
      <Box borderTop="1px solid" borderColor="gray.200">
        {/* First 5 questions - always visible */}
        {questions.index.slice(0, 5).map((item, index) => (
          <FAQItem key={index} item={item} index={index} />
        ))}
        
        {/* Additional questions with animation */}
        <AnimatePresence>
          {showAllQuestions && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: "auto"
              }}
              exit={{ 
                opacity: 0, 
                height: 0
              }}
              transition={{ 
                duration: 0.6,
                ease: "easeInOut",
                opacity: { duration: 0.4 }
              }}
              style={{ overflow: "hidden" }}
            >
              {questions.index.slice(5).map((item, index) => (
                <motion.div
                  key={index + 5}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0
                  }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                >
                  <FAQItem item={item} index={index + 5} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Toggle Button */}
      <Box display="flex" justifyContent="center" mt={8}>
        <Button
          onClick={toggleQuestions}
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
          <Text textStyle="body">
            {showAllQuestions ? "Skjul spørgsmål" : `se alle spørgsmål`}
          </Text>
        </Button>
      </Box>
    </VStack>
  );
}

export default FAQ;
