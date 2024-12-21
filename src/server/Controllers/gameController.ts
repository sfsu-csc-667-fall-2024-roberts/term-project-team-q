// import { Request, Response } from 'express';
// import db from '../db/connection';
// import { createGame } from '../db/games';


// export const createGame = async (req: Request, res: Response) => {
//     // const { gameName } = req.body;
//     // const userId = req?.session?.user?.id;

//     // try {
//     //     // Insert a new game into the database
//     //     const result = await db.query(
//     //         'INSERT INTO games (game_name, host_id, game_status) VALUES ($1, $2, $3) RETURNING *',
//     //         [gameName, userId, 'waiting']
//     //     );

//     //     const newGame = result.rows[0];
//     //     res.status(201).json({ message: 'Game created successfully', game: newGame });
//     // } catch (error) {
//     //     console.error(error);
//     //     res.status(500).json({ error: 'Unable to create game' });
//     // }



// };


// export default { createGame, joinGame };