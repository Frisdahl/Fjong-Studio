import React, { useRef } from "react";
import { gsap } from "gsap";

// Define context interface
interface PageAnimationContextType {
  runPageAnimation: (
    titleRef: React.RefObject<Element> | null,
    subtitleRef: React.RefObject<Element> | null
  ) => gsap.core.Timeline;
}

// Create context with default value
export const PageAnimationContext =
  React.createContext<PageAnimationContextType>({
    runPageAnimation: () => gsap.timeline(),
  });

// Create provider component
interface PageAnimationProviderProps {
  children: React.ReactNode;
}

export const PageAnimationProvider: React.FC<PageAnimationProviderProps> = ({
  children,
}) => {
  // Page animation timeline reference
  const masterTl = useRef(gsap.timeline());

  // Animation function
  const runPageAnimation = (
    titleRef: React.RefObject<Element> | null,
    subtitleRef: React.RefObject<Element> | null
  ) => {
    // Clear any existing animations
    if (masterTl.current) {
      masterTl.current.kill();
    }

    // Create new timeline
    masterTl.current = gsap.timeline();

    // Only run animations if refs exist and have current elements
    if (titleRef?.current) {
      // Set initial state
      gsap.set(titleRef.current, { opacity: 0, y: 30 });

      // Add to timeline
      masterTl.current.to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0
      );
    }

    if (subtitleRef?.current) {
      // Set initial state
      gsap.set(subtitleRef.current, { opacity: 0, y: 20 });

      // Add to timeline
      masterTl.current.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.5
      );
    }

    return masterTl.current;
  };

  // Provide context value
  const contextValue = {
    runPageAnimation,
  };

  return (
    <PageAnimationContext.Provider value={contextValue}>
      {children}
    </PageAnimationContext.Provider>
  );
};

// Custom hook for using the animation context
export const usePageAnimation = () => {
  const context = React.useContext(PageAnimationContext);
  if (context === undefined) {
    throw new Error(
      "usePageAnimation must be used within a PageAnimationProvider"
    );
  }
  return context;
};
