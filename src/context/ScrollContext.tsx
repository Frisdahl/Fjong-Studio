import React, { createContext, useContext, useCallback } from "react";
import { scroller } from "react-scroll";

interface ScrollContextType {
  scrollToSection: (sectionId: string) => void;
}

const ScrollContext = createContext<ScrollContextType>({
  scrollToSection: () => {},
});

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Enhanced scroll method using react-scroll
  const scrollToSection = useCallback((sectionId: string) => {
    scroller.scrollTo(sectionId, {
      duration: 800,
      delay: 0,
      smooth: true,
      offset: -100, // Adjusts for header height
    });
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
