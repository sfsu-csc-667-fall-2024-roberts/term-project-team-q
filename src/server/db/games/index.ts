import { Request, Response } from "express";
import db from "../connection";
import { CREATE_GAME, SEARCH_GAME } from "./sql";

// Create a new game
export const createGame = async (req: Request, res: Response) => {
  // const { gameName } = req.body;

  const userId = req?.session?.user?.id;

  try {
    // Insert a new game into the database
    const result = await db.query(CREATE_GAME, [userId, "waiting"]);

    const newGame = result.rows[0];
    res
      .status(201)
      .json({ message: "Game created successfully", game: newGame });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create game" });
  }
};

// Join an existing game
export const joinGame = async (req: Request, res: Response) => {
  const { gameId } = req.body;
  const userId = req.session.user.id;

  try {
    // Check if game exists and is in a valid state
    const gameResult = await db.query(SEARCH_GAME, [gameId]);
    const game = gameResult.rows[0];

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    if (game.game_status !== "waiting") {
      return res
        .status(400)
        .json({ error: "Game is not in a valid state to join" });
    }

    // Check if the user is already in the game
    const playerResult = await db.query(
      "SELECT * FROM players WHERE game_id = $1 AND user_id = $2",
      [gameId, userId]
    );
    if (playerResult.rows.length > 0) {
      return res.status(400).json({ error: "User is already in the game" });
    }

    // Add the user to the game
    await db.query("INSERT INTO players (game_id, user_id) VALUES ($1, $2)", [
      gameId,
      userId,
    ]);

    // Generate a bingo card for the user (this could be a function that generates a random card)
    const card = generateBingoCard(userId, gameId);
    await db.query(
      "INSERT INTO bingo_cards (user_id, game_id, card) VALUES ($1, $2, $3)",
      [userId, gameId, card]
    );

    res.status(200).json({ message: "Joined game successfully", game });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to join game" });
  }
};

// Leave a game
export const leaveGame = async (req: Request, res: Response) => {
  const { gameId } = req.body;
  const userId = req.session.user.id;

  try {
    // Check if the user is in the game
    const playerResult = await db.query(
      "SELECT * FROM players WHERE game_id = $1 AND user_id = $2",
      [gameId, userId]
    );
    if (playerResult.rows.length === 0) {
      return res.status(404).json({ error: "User is not in the game" });
    }

    // Remove the user from the game
    await db.query("DELETE FROM players WHERE game_id = $1 AND user_id = $2", [
      gameId,
      userId,
    ]);

    res.status(200).json({ message: "Left the game successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to leave game" });
  }
};

// Generate a random bingo card
function generateBingoCard(userId: number, gameId: number) {
  const card = [
    [
      randomInt(1, 15),
      randomInt(16, 30),
      randomInt(31, 45),
      randomInt(46, 60),
      randomInt(61, 75),
    ],
    [
      randomInt(1, 15),
      randomInt(16, 30),
      randomInt(31, 45),
      randomInt(46, 60),
      randomInt(61, 75),
    ],
    [
      randomInt(1, 15),
      randomInt(16, 30),
      randomInt(31, 45),
      randomInt(46, 60),
      randomInt(61, 75),
    ],
    [
      randomInt(1, 15),
      randomInt(16, 30),
      randomInt(31, 45),
      randomInt(46, 60),
      randomInt(61, 75),
    ],
    [
      randomInt(1, 15),
      randomInt(16, 30),
      randomInt(31, 45),
      randomInt(46, 60),
      randomInt(61, 75),
    ],
  ];
  return JSON.stringify(card);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const joingame = async (req: Request, res: Response) => {

// }

export default { createGame, joinGame };
