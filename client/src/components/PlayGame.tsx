import React, { useCallback, useEffect, useState } from "react";
import { fetchPlayGame } from "../services";
import { Game } from "./Game";

type PlayGame = {
  newGame: boolean;
  playGameChanger: (state: boolean) => void;
};

const PlayGame: React.FC<PlayGame> = (props) => {
  const [gameState, setGameState] = useState("notPlayed");
  const [gameResult, setGameResult] = useState<Game | null>(null);

  const playGame = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const response = await fetchPlayGame(token, id);
      
      if (response.ok) {
        const responseData = await response.json();
        setGameState("played");
        setGameResult(() => ({
          id: responseData.id,
          gameWin: responseData.gameWin,
          dice1Value: responseData.dice1Value,
          dice2Value: responseData.dice2Value,
        }));
      } else {
        console.error("fetching games");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
    props.playGameChanger(false);
  }, [props]);

  useEffect(() => {
    if (props.newGame) {
      setGameState("playing");
      playGame();
    }
  }, [playGame, props]);

  return (
    <div className=" w-full p-6 bg-white rounded-lg shadow-lg">
      {gameState === "played" ? (
        <div>
          <h1>Last game result</h1>
          <p>dice 1: {gameResult?.dice1Value}</p>
          <p>dice 2: {gameResult?.dice2Value}</p>
          <p>Game: {gameResult?.gameWin ? "Won" : "Lost"} </p>
        </div>
      ) : (
        `Current game state: ${gameState}`
      )}
    </div>
  );
};

export default PlayGame;
