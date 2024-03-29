import { AddIcon, CloseIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generate } from "random-words";
import { useDispatch } from "react-redux";
import { setGameConfig } from "../redux/actions";
import { MexicanTrainGameConfig } from "../redux/types";

const NewGame: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [players, setPlayers] = useState<string[]>(["", ""]);

  const handleInputChange = (index: number, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = value;
    setPlayers(updatedPlayers);
  };

  const handleAddPlayer = () => {
    setPlayers([...players, ""]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // TODO update this once app complete
    const url = "http://localhost:8000/mexican-train";

    const queryString = `readableId=${encodeURIComponent(readableId)}&${players
      .map((player) => `players%5B%5D=${encodeURIComponent(player)}`)
      .join("&")}`;

    const response = await fetch(`${url}?${queryString}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Handle errors here
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    console.log(data);
    const id = data.id;

    // set data in redux store
    switch (gameId) {
      case "mexican-train-game":
        dispatch(setGameConfig(data as MexicanTrainGameConfig));
        break;
      default:
        break;
    }

    // Redirect to the game page with the gameId
    navigate(`/${gameId}/${id}`);
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
            {players.map((player, index) => (
              <InputGroup key={index}>
                <Input
                  type="text"
                  placeholder="Player name"
                  value={player}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  mb={3}
                />
                <InputRightElement>
                  <CloseIcon
                    onClick={() => {
                      const updatedPlayers = [...players];
                      updatedPlayers.splice(index, 1);
                      setPlayers(updatedPlayers);
                    }}
                  />
                </InputRightElement>
              </InputGroup>
            ))}
            <Box display="flex" justifyContent="flex-end">
              <IconButton
                isRound={true}
                variant="outline"
                colorScheme="white"
                aria-label="Add player"
                fontSize="16px"
                icon={<AddIcon />}
                onClick={handleAddPlayer}
              />
            </Box>

            <Button
              type="submit"
              colorScheme="teal"
              isDisabled={
                !readableId || !players.every(Boolean) || players.length < 2
              }
            >
              Start
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
