import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Homepage from "./pages/Homepage";
import ProjectPage from "./pages/ProjectPage";
import Header from "./components/layout/Header";

function App() {
  return (
    <Box margin={0} padding={0} minHeight="100vh">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/project/:id" element={<ProjectPage />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
