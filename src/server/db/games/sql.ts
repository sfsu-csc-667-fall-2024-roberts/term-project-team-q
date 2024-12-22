export const CREATE_GAME = `INSERT INTO games (game_name, creator_id, game_state, game_status) VALUES ($1, $2, $3) RETURNING *`;

export const SEARCH_GAME = `SELECT * FROM games WHERE game_id = $1`;

export const GET_GAME_STATE = `SELECT * FROM games WHERE game_id = $1`;