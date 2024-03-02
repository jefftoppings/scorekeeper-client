import { Box, Container, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Container>
      <Box bg="tomato" w="100%" p={4} color="white">
        This is the Box
        <Heading>Hello Chakra UI!</Heading>
        <div>
          <h1>Home Page</h1>
          <p>Welcome to the home page!</p>
          <Link to="/new-game">Go to New Game</Link>
        </div>
      </Box>
    </Container>
  );
};

export default Home;
