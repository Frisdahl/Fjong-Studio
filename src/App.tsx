import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import Homepage from "./pages/Homepage";
import ProjectPage from "./pages/ProjectPage";
import Header from "./components/layout/Header";
import SmoothScroll from "./components/SmoothScroll";
import Footer from "./components/layout/Footer";
import PageLayout from "./components/layout/PageLayout";
import { PageAnimationProvider } from "./context/PageAnimationContext";
import { ScrollProvider } from "./context/ScrollContext";
import theme from "./theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <SmoothScroll>
        <Box margin={0} padding={0} minHeight="100vh">
          <Router>
            <PageAnimationProvider>
              <ScrollProvider>
                <Header />
                <PageLayout>
                  <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/project/:id" element={<ProjectPage />} />
                  </Routes>
                </PageLayout>
                <Footer />
              </ScrollProvider>
            </PageAnimationProvider>
          </Router>
        </Box>
      </SmoothScroll>
    </ChakraProvider>
  );
}

export default App;
