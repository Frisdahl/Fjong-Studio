import React, { useRef, useEffect } from "react";
import { useSpring } from "framer-motion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollSpring = useSpring(0, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const onScroll = () => {
      if (window) {
        scrollSpring.set(window.scrollY);
      }
    };

    window.addEventListener("scroll", onScroll);

    // Apply smooth scrolling via JavaScript
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      window.removeEventListener("scroll", onScroll);
      // Clean up when component unmounts
      document.documentElement.style.scrollBehavior = "";
    };
  }, [scrollSpring]);

  return (
    <div
      ref={scrollRef}
      style={{
        position: "relative",
        width: "100%",
        overflow: "visible",
      }}
    >
      {children}
    </div>
  );
}
