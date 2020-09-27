DROP TABLE IF EXISTS games CASCADE;
CREATE TABLE "games" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "name" varchar NOT NULL,
  "host" int NOT NULL,
  "link" varchar,
  "board" json NOT NULL,
  "words" json NOT NULL,
  "mode" varchar NOT NULL,
  "multiplayer" boolean NOT NULL
);