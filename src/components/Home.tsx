import {
  Box,
  Button,
  Container,
  Heading,
  Select,
  Stack,
} from "@chakra-ui/react";
import React from "react";

const Home: React.FC = () => {
  return (
    <Container>
      <Box
        w="100%"
        p={4}
        color="white"
        display="flex"
        alignItems="center"
        flexDir="column"
      >
        <Heading>Scorekeeper</Heading>
        <Select placeholder="Choose game" margin="24px 0 0">
          <option value="mexican-train-game">Mexican Train Game</option>
        </Select>
        <Stack direction="row" spacing={4} align="center" margin="16px 0">
          <Button colorScheme="teal" variant="solid">
            New Game
          </Button>
          <Button colorScheme="teal" variant="solid">
            Continue
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;
