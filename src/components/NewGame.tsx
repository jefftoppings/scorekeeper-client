import React from "react";
import { Link } from "react-router-dom";

const NewGame: React.FC = () => {
  return (
    <div>
      <h1>New Game Page</h1>
      <p>Welcome to the new game page!</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default NewGame;
