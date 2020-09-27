DROP TABLE IF EXISTS scores CASCADE;
CREATE TABLE "scores" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "game_id" int NOT NULL,
  "player_id" int NOT NULL,
  "word_count" int NOT NULL
);