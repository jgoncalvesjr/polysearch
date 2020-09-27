DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "username" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "avatar" varchar(255),
  "multiplayer_wins" int NOT NULL
);
