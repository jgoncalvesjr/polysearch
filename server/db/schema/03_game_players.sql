DROP TABLE IF EXISTS game_players CASCADE;
CREATE TABLE "game_players" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "player_id" int NOT NULL,
  "game_id" int NOT NULL
);