ALTER TABLE "game_players" ADD FOREIGN KEY ("player_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "game_players" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE CASCADE;

ALTER TABLE "games" ADD FOREIGN KEY ("host_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "scores" ADD FOREIGN KEY ("player_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "scores" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE CASCADE;

ALTER TABLE "game_languages" ADD FOREIGN KEY ("language_id") REFERENCES "languages" ("id") ON DELETE CASCADE;

ALTER TABLE "game_languages" ADD FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE CASCADE;