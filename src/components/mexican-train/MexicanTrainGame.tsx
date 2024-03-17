import { Box, Container, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MexicanTrainGameConfig } from "../../redux/types";
import { setGameConfig } from "../../redux/actions";

const MexicanTrainGame: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  console.log({ gameId });
  const dispatch = useDispatch();
  const gameConfig = useSelector((state: any) => state.game.gameConfig);

  useEffect(() => {
    console.log({ gameConfig });
    if (!gameConfig) {
      fetchDataFromAPI();
    }
  }, [gameConfig]);

  const fetchDataFromAPI = async () => {
    console.log("fetchDataFromAPI");
    try {
      // Make API call to fetch data
      const response = await fetch(
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
        <Heading>Game</Heading>

        {/* Game content goes here */}
      </Box>
    </Container>
  );
};

export default MexicanTrainGame;
