import React, { createContext, useContext, useCallback } from "react";

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
    const section = document.getElementById(sectionId);
    if (section) {
      // Account for header height offset
      const headerOffset = 100; // Matches your header height
      const sectionPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        sectionPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
