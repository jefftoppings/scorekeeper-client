import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  InputGroup,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MexicanTrainGameConfig } from "../../redux/types";
import { setGameConfig } from "../../redux/actions";
import styles from "./MexicanTrainGame.module.css";

const MexicanTrainGame: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const dispatch = useDispatch();
  const gameConfig = useSelector((state: any) => state.game.gameConfig);
  const [newRoundScores, setNewRoundScores] = useState<number[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (!gameConfig) {
      fetchGameDataFromApi();
    }
  }, [gameConfig]);

  const fetchGameDataFromApi = async () => {
    try {
      // Make API call to fetch data
      const response = await fetch(
        // TODO update this once app complete
        `http://localhost:8000/mexican-train?id=${gameId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data from API");
      }
      const data: MexicanTrainGameConfig = await response.json();

      // Update Redux store with fetched data
      dispatch(setGameConfig(data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return [formattedDate, formattedTime].join(" ");
  };

  function renderScores(config: MexicanTrainGameConfig): React.ReactNode {
    if (!config.scores || Object.entries(config.scores).length === 0) {
      return <></>;
    }
    const data: Map<number, (number | undefined)[]> = new Map();
    Object.entries(config.scores).forEach(([player, scores]) => {
      data.set(
        config.players.indexOf(player),
        scores.map((s) => s.total || s.score || 0)
      );
    });
    const fillArray = (x: number) => {
      const result = [];
      for (let i = 1; i < x; i++) {
        result.push(i);
      }
      return result;
    };
    return (
      <>
        {fillArray(config.currentRound).map((i) => {
          const tableRow = (
            <Tr key={i}>
              {config.players.map((player) => {
                const scoreToDisplay = data.get(
                  config.players.indexOf(player)
                )?.[i - 1];
                return (
                  <Td key={player} isNumeric className={styles.centerText}>
                    {scoreToDisplay}
                  </Td>
                );
              })}
            </Tr>
          );
          return tableRow;
        })}
      </>
    );
  }

  const handleNewRoundScoreChange = (index: number, value: number) => {
    const updatedScores = newRoundScores
      ? [...newRoundScores]
      : new Array(gameConfig?.players.length);
    updatedScores[index] = value;
    setNewRoundScores(updatedScores);
    handleScoreValuesChange(index, value);
  };

  const updateScores = () => {
    if (!newRoundScores) {
      return;
    }
    const scoresCopy = { ...gameConfig.scores };
    const players: string[] = gameConfig.players;
    players.forEach((player, index) => {
      if (!scoresCopy[player]) scoresCopy[player] = [];
      scoresCopy[player].push({
        round: gameConfig.currentRound,
        score: newRoundScores[index],
        total:
          scoresCopy[player].reduce(
            (a: any, b: { score: any }) => a + (b.score || 0),
            0
          ) + (newRoundScores[index] || 0),
      });
    });
    return scoresCopy;
  };

  const handleEnterScoresClick = async () => {
    // TODO update url once app complete
    const url = "http://localhost:8000/mexican-train";
    const updatedScores = updateScores();
    const queryParams = new URLSearchParams({
      id: gameConfig.id,
      scores: JSON.stringify(updatedScores),
    });

    try {
      const response = await fetch(`${url}?${queryParams.toString()}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update scores");
      }

      // Handle successful response
      await response.json();
      gameConfig.scores = updatedScores;
      await fetchGameDataFromApi();
      clearInputValues();
    } catch (error) {
      console.error("Error updating scores:", error);
    }
  };

  const [scoreValues, setScoreValues] = useState(
    new Array(gameConfig?.players?.length).fill("")
  );
  const handleScoreValuesChange = (index: number, value: number) => {
    const updatedScores = [...scoreValues];
    updatedScores[index] = value;
    setScoreValues(updatedScores);
  };
  const clearInputValues = () => {
    setScoreValues(new Array(gameConfig.players.length).fill(""));
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
        {gameConfig ? (
          <>
            <Heading as="h3">{gameConfig.readableId}</Heading>
            <Text fontSize="sm">{formatDate(gameConfig.created)}</Text>
            <Text fontSize="md" margin="16px 0">
              Current Round: {gameConfig.currentRound}
            </Text>
            <TableContainer>
              <Table variant="simple" colorScheme="teal">
                <Thead>
                  <Tr>
                    {gameConfig.players.map((player: string) => (
                      <Th
                        key={player}
                        color="teal"
                        className={styles.centerText}
                      >
                        {player}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>{renderScores(gameConfig)}</Tbody>
              </Table>
            </TableContainer>

            {/* New round score input */}
            <Container marginTop="16px">
              <Center marginBottom="8px">
                <Text size="md">
                  Points counted in round {gameConfig.currentRound}
                </Text>
              </Center>
              {gameConfig.players.map(
                (player: string | undefined, index: number) => (
                  <InputGroup key={index}>
                    <Container
                      className={styles.fullWidthCenter}
                      margin="8px 0"
                    >
                      <Text size="xs" marginRight="8px">
                        {player}
                      </Text>
                      <Input
                        type="number"
                        value={scoreValues[index]}
                        onChange={(e) =>
                          handleNewRoundScoreChange(
                            index,
                            parseInt(e.target.value)
                          )
                        }
                        mb={3}
                      />
                    </Container>
                  </InputGroup>
                )
              )}
              <Center w="100%">
                <Button
                  colorScheme="teal"
                  onClick={() => handleEnterScoresClick()}
                >
                  Enter Scores
                </Button>
              </Center>
            </Container>
          </>
        ) : (
          <Spinner thickness="4px" speed="1.2s" color="teal" size="xl" />
        )}
      </Box>
    </Container>
  );
};

export default MexicanTrainGame;
