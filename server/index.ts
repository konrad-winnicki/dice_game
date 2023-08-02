// import express from "express";

// const app = express();
// const port = 5555;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}! 🍄 `);
// });

// class Player

class Game {
  gameWin: Boolean;
  dice1Value: number;
  dice2Value: number;

  constructor() {
    this.dice1Value = this.rollDice();
    this.dice2Value = this.rollDice();
    this.gameWin = this.isWin();
  }

  isWin() {
    return this.dice1Value + this.dice2Value === 7 ? true : false;
  }

  rollDice() {
    return Math.ceil(Math.random() * 6);
  }
}

const game = new Game();
game.rollDice();

///////////////

class Player {
  _id: string;
  name: string;
  password: string;
  registrationDate: Date;
  successRate: number; // percentage?
  games: Array<Game>;

  constructor(_id: string, name: string, password: string, games: Array<Game>) {
    this._id = _id;
    this.name = name;
    this.password = password;
    this.games = games;
  }

  newGame() {
    const game = new Game();
    this.games.push(game);
  }

  deleteGames() {
    this.games = [];
  }

  calcPercentage() {
    const wins = this.games.filter((game) => game.gameWin).length;
    console.log({ wins });
    const losses = this.games.length - wins;
    console.log({ losses });
    return (wins / losses) * 100;
  }
}

const game1 = new Game();
const game2 = new Game();
const game3 = new Game();

const player1 = new Player("1", "test", "test", [game1, game2, game3]);
player1.newGame();
player1.newGame();

console.log(player1.calcPercentage());

console.log(player1);
