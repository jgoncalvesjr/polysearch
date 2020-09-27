ALTER TABLE "game_players" ADD FOREIGN KEY ("player_id") REFERENCES "users" ("id");

ALTER TABLE "game_players" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id");

ALTER TABLE "scores" ADD FOREIGN KEY ("player_id") REFERENCES "users" ("id");

ALTER TABLE "scores" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id");

ALTER TABLE "game_languages" ADD FOREIGN KEY ("language_id") REFERENCES "languages" ("id");

ALTER TABLE "game_languages" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id");