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
    metallic: "#60666C", // 100%
    soft: "#444444",
    mid: "#333333", // 100%
    light: "#3E4440", // 100%
  },
  white: {
    100: "#FFFFFF", // 100%
    default: "#FAFAFA", // 100%
    light: "#F6F7F7", // 100%
    off: "#EAEAEA", // 100%
    cream: "#F6F6F6", // 100%
  },
  blue: {
    dark: "#005CFF", // 100%
  },
  accent: {
    blue: "#1C1B20", // 100%
    sand: "#AD9F8F", // 100%
    darksand: "#6E695D",
    sandLight: "#EAE6DF", // 100%
    yellow: "#FFDC1F", // 100%
  },
};

const headingSpacing = {
  base: "1.5rem",
  md: "2rem",
  lg: "2.5rem",
  xl: "5rem",
};

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
  // Add your custom weight
  extralight: 200, // Match the font-weight from your @font-face declaration
};

// Keep your existing fonts
const fonts = {
  heading: "'Clash Display', sans-serif !important",
  regular: "'Clash Display', sans-serif !important",
  light: "ClashDisplay-Light, sans-serif !important",
  extralight: "ClashDisplay-Extralight, sans-serif !important",
};

// Add a breakpoints object to customize screen sizes
const breakpoints = {
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "62em", // 992px
  xl: "81.25em", // 1300px (changed from default 1280px)
  "2xl": "96em", // 1536px
};

// Define text styles for typography
const textStyles = {
  h1: {
    fontSize: ["2.25rem", "3.25rem", "3rem", "4.875rem", "6.875rem"], // sm, md, lg, xl, 2xl
    fontWeight: "regular",
    letterSpacing: "-0.02em",
    lineHeight: "0.7", // Added this line - value between 0.9-1.0 for tight headings
  },
  h2: {
    fontSize: ["2.5rem", "3rem", "3.625rem", "4.875rem", "5.875rem"], // sm, md, lg, xl, 2xl
    fontWeight: "regular",
    lineHeight: "0.8",
  },
  h3: {
    fontSize: ["1.75rem", "1.75rem", "2.75rem", "4.75rem", "4.875rem"], // sm, md, lg, xl, 2xl
    fontWeight: "regular",
    lineHeight: "110%",
  },
  h4: {
    fontSize: ["1.5rem", "1.5rem", "1.75rem", "1.875rem", "1.875rem"], // sm, md, lg, xl, 2xl
    fontWeight: "regular",
    lineHeight: "110%",
  },
  h5: {
    fontSize: ["1.25rem", "1.5rem", "1.5rem", "1.5rem", "1.5rem"], // sm, md, lg, xl, 2xl
    fontWeight: "regular",
    lineHeight: "110%",
  },
  links: {
    fontSize: ["1.125rem", "1.125rem", "1.25rem"], // sm, md, lg, xl, 2xl
    fontWeight: "medium",
  },
  text: {
    fontSize: ["1rem", "1.125rem", "1.25rem"], // sm, md, lg, xl, 2xl
    lineHeight: "100%",
    fontWeight: "light",
  },
  // Add more as needed
};

const space = {
  // Heading spacing
  "heading-sm": "2rem",
  "heading-md": "3rem",
  "heading-lg": "8rem",
  "heading-xl": "10rem",
  "heading-2xl": "15rem",

  // Section spacing
  "section-sm": "2rem",
  "section-md": "3rem",
  "section-lg": "8rem",
  "section-xl": "10rem",
};

// Create your Chakra theme
const theme = extendTheme({
  colors,
  fonts,
  textStyles,
  fontWeights,
  breakpoints,
  space,
  headingSpacing,
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
