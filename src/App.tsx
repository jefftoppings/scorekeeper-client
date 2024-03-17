import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NewGame from "./components/NewGame";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import MexicanTrainGame from "./components/mexican-train/MexicanTrainGame";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box bg="brand.dark" color="white" minHeight="100vh">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-game" element={<NewGame />} />
            <Route path="/mexican-train-game/:gameId" element={<MexicanTrainGame />} />
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
};

export default App;
