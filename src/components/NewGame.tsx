import { QuestionIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { generate } from "random-words";

const NewGame: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const gameId = queryParams.get("gameId");

  const getDisplayId = (gameId: string | null) => {
    switch (gameId) {
      case "mexican-train-game":
        return "Mexican Train Game";
      default:
        return "";
    }
  };
  const displayId = getDisplayId(gameId);

  const generateRandomGameId = (): string => {
    return generate({ exactly: 2, join: "-" });
  };

  const [readableId, setReadableId] = useState(generateRandomGameId());
  const [players, setPlayers] = useState([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Submitted:", { readableId, players });
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
        <Heading as="h1">New Game</Heading>
        <Heading as="h4" size="md" marginTop="16px">
          {displayId ? displayId : null}
        </Heading>
        <Container marginTop="24px">
          <form onSubmit={handleSubmit}>
            <Heading as="h4" size="sm">
              <Box
                display="flex"
                alignItems="center"
                margin="0 0 16px"
                gap="8px"
              >
                Game ID
                {GameIdTooltip()}
              </Box>
            </Heading>
            <Input
              type="text"
              placeholder="Game ID"
              value={readableId}
              onChange={(e) => setReadableId(e.target.value)}
              mb={3}
            />
            <a onClick={() => setReadableId(generateRandomGameId())}>
              Generate new Game ID
            </a>

            <Heading as="h4" size="sm" margin="16px 0">
              Players
            </Heading>
            <Input
              type="text"
              placeholder="Player names"
              value={players.join(",")}
              onChange={(e: any) => setPlayers(e.target.value.split(","))}
              mb={3}
            />

            <Button type="submit" colorScheme="teal">
              Submit
            </Button>
          </form>
        </Container>
      </Box>
    </Container>
  );
};

function GameIdTooltip() {
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <QuestionIcon />
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Game ID
        </PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          Remember your Game ID if you want to continue your game at a later
          time. A unique ID has been provided, but you may change it if you
          wish.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default NewGame;
