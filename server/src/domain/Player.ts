import { Game } from "./Game";
import { User } from "./User";

export type GameType = {
  gameWin: boolean;
  dice1Value: number;
  dice2Value: number;
};

export type PlayerType = {
  id:string,
  successRate:number,
  games: Array<GameType>,
  email: string,
  name:string,
  password:string
}

export class Player extends User {
  readonly id: string;
  private _successRate: number;
  private _games: Array<GameType>;
  constructor(
    email: string,
    password: string,
    games: Array<GameType>,
    name: string,
    id: string
  ) {
    super(email, password, name);
    this._games = games;
    this.id = id;
    this._successRate = this.calcSuccesRate();
  }

  public addNewGame(game: Game) {
    console.log(game)
    this._games.push(game);
    this._successRate = this.calcSuccesRate();
   
  }
  public get successRate(): number {
    return this._successRate;
  }
  public deleteGames() {
    this._games = [];
    this._successRate = this.calcSuccesRate();
  }
  private calcSuccesRate() {
    const wins = this._games.filter((game) => game.gameWin).length;
    return this._games.length > 0
      ? Number(((wins / this._games.length) * 100).toFixed(2))
      : 0;
  }

  //public setId(id: string) {
  // this.id = id;
  //}

  public get games() {
    return this._games;
  }
}
