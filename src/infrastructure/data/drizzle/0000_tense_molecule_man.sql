CREATE TABLE IF NOT EXISTS "pokemons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"typeId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trainers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"refresh_token" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemons" ADD CONSTRAINT "pokemons_typeId_types_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."types"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
