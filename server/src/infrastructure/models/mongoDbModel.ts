import mongoose from "mongoose";
import { Game } from "../../domain/Game";
import { GameType, PlayerType } from "../../domain/Player";

const playerSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    validate: function (value: string) {
      const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    },
  },
  password: {
    type: String,
    required: true,
  },
  registrationDate: {
    type: Date,
    required: true,
  },
  successRate: {
    type: Number,
    required: true,
  },
  games: {
    type: Array<GameType>,
    required: true,
  },
});

export const PlayerDocument = mongoose.model<PlayerType>(
  "Player",
  playerSchema
);
