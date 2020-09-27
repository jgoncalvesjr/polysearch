DROP TABLE IF EXISTS languages CASCADE;
CREATE TABLE "languages" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "language_code" varchar NOT NULL,
  "name" varchar NOT NULL
);