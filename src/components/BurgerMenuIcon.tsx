import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const BurgerMenuIcon = ({ isOpen }: { isOpen: boolean }) => {
  // Line widths in the closed and open states
  const lineWidths = {
    closed: ["50px", "50px", "50px"],
    open: ["50px", "32px", "16px"],
  };

  return (
    <Box position="relative" padding="2px">
      {/* Container for all lines */}
      <Box
        width="100%"
        height="100%"
        display={"flex"}
        flexDirection={"column"}
        alignItems="flex-end"
      >
        {/* Top line */}
        <MotionBox
          height="2px"
          width={isOpen ? lineWidths.open[0] : lineWidths.closed[0]}
          mb="5px"
          style={{
            // Use style prop for dynamic background color
            backgroundColor: isOpen ? "white" : "#1a1a1a",
            // Add explicit transition for CSS properties
            transition: "background-color 1.5s ease, width 0.2s ease",
          }}
          animate={{
            width: isOpen ? lineWidths.open[0] : lineWidths.closed[0],
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Middle line */}
        <MotionBox
          height="2px"
          width={isOpen ? lineWidths.open[1] : lineWidths.closed[1]}
          mb="5px"
          style={{
            backgroundColor: isOpen ? "white" : "#1a1a1a",
            transition: "background-color 1.5s ease, width 0.2s ease",
          }}
          animate={{
            width: isOpen ? lineWidths.open[1] : lineWidths.closed[1],
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Bottom line */}
        <MotionBox
          height="2px"
          width={isOpen ? lineWidths.open[2] : lineWidths.closed[2]}
          style={{
            backgroundColor: isOpen ? "white" : "#1a1a1a",
            transition: "background-color 1.5s ease, width 0.2s ease",
          }}
          animate={{
            width: isOpen ? lineWidths.open[2] : lineWidths.closed[2],
          }}
          transition={{ duration: 0.2 }}
        />
      </Box>
    </Box>
  );
};

export default BurgerMenuIcon;
