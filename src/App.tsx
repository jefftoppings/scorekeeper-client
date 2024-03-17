import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NewGame from "./components/NewGame";
import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import MexicanTrainGame from "./components/mexican-train/MexicanTrainGame";
import { Provider } from "react-redux";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Box bg="brand.dark" color="white" minHeight="100vh">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new-game" element={<NewGame />} />
              <Route
                path="/mexican-train-game/:gameId"
                element={<MexicanTrainGame />}
              />
            </Routes>
          </Router>
        </Box>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
