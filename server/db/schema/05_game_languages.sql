DROP TABLE IF EXISTS game_languages CASCADE;
CREATE TABLE "game_languages" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "game_id" int NOT NULL,
  "language_id" int NOT NULL
);