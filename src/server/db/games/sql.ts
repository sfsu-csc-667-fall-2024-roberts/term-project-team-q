export const CREATE_GAME = `INSERT INTO games (game_name, host_id, game_status) VALUES ($1, $2, $3) RETURNING *`;

export const SEARCH_GAME = `SELECT * FROM games WHERE game_id = $1`;