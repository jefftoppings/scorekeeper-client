import { Box, Container, Heading } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const MexicanTrainGame: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  console.log({ gameId });

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
