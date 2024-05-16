CREATE TABLE IF NOT EXISTS "abilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"effect" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_abilities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pokemonId" uuid,
	"abilityId" uuid
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_abilities" ADD CONSTRAINT "pokemon_abilities_pokemonId_pokemons_id_fk" FOREIGN KEY ("pokemonId") REFERENCES "public"."pokemons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon_abilities" ADD CONSTRAINT "pokemon_abilities_abilityId_abilities_id_fk" FOREIGN KEY ("abilityId") REFERENCES "public"."abilities"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
