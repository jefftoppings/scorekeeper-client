import {
  Box,
  Button,
  Container,
  Heading,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Home: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

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
        <Select
          placeholder="Choose game"
          margin="24px 0 0"
          value={selectedValue}
          onChange={handleSelectChange}
        >
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
