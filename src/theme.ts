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
    sand: "#AD9F8F", // 100%
    sandLight: "#EAE6DF", // 100%
    sandMed: "#EAE6DF70", // 70%
    red: "#EE1D52", // 100%
    yellow: "#FFDC1F", // 100%
  },
};

const fontWeights = {
  hairline: 100,
  thin: 200,
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

const breakpoints = {
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "62em", // 992px
  xl: "80em", // 1280px
  "2xl": "94em", // 1504px (custom breakpoint for screens over 1500px)
};

// Keep your existing fonts
const fonts = {
  heading: "'Clash Display', sans-serif !important",
  body: "'Clash Display', sans-serif !important",
  mono: "Menlo, monospace",
  extralight: "ClashDisplay-Extralight, sans-serif !important",
  light: "ClashDisplay-Light, sans-serif !important",
};

// Define text styles for typography
const textStyles = {
  h1: {
    fontSize: ["2.75rem", "3rem", "4rem", "7.875rem"], // sm, md, lg, xl, 2xl
    fontWeight: "extra-light",
    lineHeight: "110%",
    letterSpacing: "-0.02em",
  },
  h2: {
    fontSize: ["2rem", "3rem", "5.625rem"], // sm, md, lg
    fontWeight: "semibold",
    lineHeight: "110%",
  },
  h3: {
    fontSize: ["1.75rem", "1.75rem", "3.75rem"], // sm, md, lg
    fontWeight: "regular",
    lineHeight: "110%",
  },
  h4: {
    fontSize: ["1.75rem", "1.75rem", "2.75rem"], // sm, md, lg
    fontWeight: "regular",
    lineHeight: "110%",
  },
  h5: {
    fontSize: ["1.5rem", "1.5rem", "1.5rem"], // sm, md, lg
    fontWeight: "regular",
    lineHeight: "110%",
  },
  links: {
    fontSize: ["1.125rem", "1.125rem", "1.25rem"], // sm, md, lg
    fontWeight: "medium",
  },
  text: {
    fontSize: ["1rem", "1.125rem", "1.25rem"], // sm, md, lg
    fontWeight: "extralight",
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
  textStyles,
  fontWeights,
  breakpoints,
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
