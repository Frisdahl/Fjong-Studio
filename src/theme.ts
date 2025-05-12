import { extendTheme } from "@chakra-ui/react";

// Define your color palette based on the shared image
const colors = {
  // Core colors
  black: {
    100: "#000000", // 100%
    70: "#000000B3", // 70%
    80: "#000000CC", // 80%
  },
  font: {
    dark: "#1A1A1A", // 100% - Make sure this is defined correctly
  },
  gray: {
    darkMid: "#1A1A1A70", // 70%
    darkLight: "#1A1A1A30", // 30%
    mid: "#333333", // 100%
    light: "#3E4440", // 100%
  },
  white: {
    100: "#FFFFFF", // 100%
    default: "#FAFAFA", // 100%
    off: "#EAEAEA", // 100%
    cream: "#F6F6F6", // 100%
  },
  blue: {
    light: "#69C9D0", // 100%
    dark: "#005CFF", // 100%
  },
  accent: {
    blue: "#1C1B20", // 100%
    teal: "#A9BF8F", // 100%
    sand: "#D9D9D9", // 100%
    sandLight: "#EAE6DF", // 100%
    sandMed: "#EAE6DF70", // 70%
    red: "#EE1D52", // 100%
    yellow: "#FFDC1F", // 100%
  },
};

// Keep your existing spacing scale
const space = {
  xs: "0.5rem",
  sm: "0.75rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "1.875rem", // Your specific value
  "2xl": "2.5rem",
  "3xl": "3.125rem",
};

// Keep your existing fonts
const fonts = {
  heading: "'Clash Display', sans-serif !important",
  body: "'Clash Display', sans-serif !important",
  mono: "Menlo, monospace",
};

// Define text styles for typography
const textStyles = {
  h1: {
    // Remove the nested responsive objects (md, lg, xl)
    fontSize: ["2rem", "3rem", "4rem", "5rem", "7.875rem"],
    fontWeight: "extra-light",
    lineHeight: "110%",
    letterSpacing: "-0.02em",
  },
  h2: {
    fontSize: ["1.75rem", "3.75rem", "5.625rem"],
    fontWeight: "semibold",
    lineHeight: "110%",
  },
  h3: {
    fontSize: ["1.75rem", "1.75rem", "3.75rem"],
    fontWeight: "semibold",
    lineHeight: "110%",
  },
  h4: {
    fontSize: ["1.75rem", "1.75rem", "2rem"],
    fontWeight: "semibold",
    lineHeight: "110%",
  },
  h5: {
    fontSize: ["1.75rem", "1.75rem", "1.5rem"],
    fontWeight: "semibold",
    lineHeight: "110%",
  },
  links: {
    fontSize: ["1.125rem", "1.125rem", "1.25rem"],
    fontWeight: "medium",
  },
  text: {
    fontSize: ["1rem", "1.125rem", "1.25rem"],
  },
  // Add more as needed
};

// Define common border radius values
const radii = {
  none: "0",
  sm: "0.125rem",
  base: "0.25rem",
  md: "0.375rem",
  lg: "0.5rem",
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",
};

// Create your Chakra theme
const theme = extendTheme({
  colors,
  fonts,
  space,
  textStyles,
  radii,
  // You can also customize component-specific styles
  components: {
    Button: {
      baseStyle: {
        borderRadius: "md",
      },
      variants: {
        primary: {
          bg: "accent.blue",
          color: "white.default",
        },
        secondary: {
          bg: "accent.teal",
          color: "black.100",
        },
      },
    },
    // Add more component styles
  },
  // Define global styles
  styles: {
    global: {
      "html, body": {
        fontFamily: "'Clash Display', sans-serif !important",
        margin: 0,
        padding: 0,
        fontSize: "1rem",
        color: "font.dark",
        bg: "white.100",
      },
    },
  },
});

export default theme;
