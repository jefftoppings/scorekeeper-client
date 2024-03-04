import {
  Box,
  Button,
  Container,
  Heading,
  Select,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleNewGameClick = () => {
    navigate(`/new-game?gameId=${selectedValue}`);
  };

  const handleContinueClick = () => {
    navigate(`/continue?gameId=${selectedValue}`);
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
          <Button
            colorScheme="teal"
            variant="solid"
            isDisabled={!selectedValue}
            onClick={handleNewGameClick}
          >
            New Game
          </Button>
          <Button
            colorScheme="teal"
            variant="solid"
            isDisabled={!selectedValue}
            onClick={handleContinueClick}
          >
            Continue
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Home;
