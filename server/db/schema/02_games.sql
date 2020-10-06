DROP TABLE IF EXISTS games CASCADE;
CREATE TABLE "games" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "host_id" int NOT NULL,
  "link" varchar,
  "duration" varchar,
  "rows" varchar NOT NULL,
  "words" varchar NOT NULL,
  "mode" varchar NOT NULL,
  "multiplayer" boolean NOT NULL
);