import * as express from "express";
import * as pokemonService from "../../../domain/services/pokemonService";

export const getAllPokemons = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const pokemons = await pokemonService.getAllPokemons();
    res.json(pokemons);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
};

export const getPokemonById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const pokemon = await pokemonService.getPokemonById(Number(req.params.id));
    if (pokemon) {
      res.json(pokemon);
    } else {
      res.status(404).send("Pokémon not found");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message);
    } else {
      res.status(400).send("An unknown error occurred");
    }
  }
};

export const createPokemon = async (
  req: express.Request,
  res: express.Response
) => {
  const newPokemon = await pokemonService.createPokemon(req.body);
  res.status(201).json(newPokemon);
};

export const updatePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).send("Invalid ID format");
    }

    const updatedPokemon = await pokemonService.updatePokemon(id, req.body);

    if (updatedPokemon) {
      res.json(updatedPokemon);
    } else {
      res.status(404).send("Pokémon not found");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const deletePokemon = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).send("Invalid ID format");
    }

    const success = await pokemonService.deletePokemon(id);

    if (success) {
      res.status(204).send();
    } else {
      res.status(404).send("Pokémon not found");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
