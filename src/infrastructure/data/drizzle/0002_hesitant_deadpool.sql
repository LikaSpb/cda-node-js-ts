CREATE TABLE IF NOT EXISTS "battles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pokemonId" uuid NOT NULL,
	"opponentPokemonId" uuid NOT NULL,
	"winnerPokemonId" uuid,
	"battleDate" timestamp NOT NULL,
	"location" varchar(255)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "battles" ADD CONSTRAINT "battles_pokemonId_pokemons_id_fk" FOREIGN KEY ("pokemonId") REFERENCES "public"."pokemons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "battles" ADD CONSTRAINT "battles_opponentPokemonId_pokemons_id_fk" FOREIGN KEY ("opponentPokemonId") REFERENCES "public"."pokemons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "battles" ADD CONSTRAINT "battles_winnerPokemonId_pokemons_id_fk" FOREIGN KEY ("winnerPokemonId") REFERENCES "public"."pokemons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
