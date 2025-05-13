import React from "react";
import { Box } from "@chakra-ui/react";

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box minH="100vh">
      {/* Remove the Header component from here if it exists */}
      {children}
      {/* Keep the Footer if you have it here */}
    </Box>
  );
};

export default PageLayout;
