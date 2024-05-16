// import request from "supertest";
// import app from "../../src/app";

// describe("POST /register", () => {
//   it("should register a new trainer", async () => {
//     const response = await request(app).post("/register").send({
//       username: "testTrainer",
//       password: "testPassword",
//     });

//     expect(response.statusCode).toBe(201);
//     expect(response.body).toHaveProperty("username", "testTrainer");
//   });
// });

import request from "supertest";
import app from "../../src/app";
import { faker } from "@faker-js/faker";
import { TrainerRepository } from "../infrastructure/repositories/TrainerRepository";

describe("POST /register - Password Security", () => {
  let trainerRepository = new TrainerRepository();

  it("should store the hashed password, not the plain password", async () => {
    const username = faker.internet.userName();
    const password = faker.internet.password();

    // Envoi de la requête d'enregistrement
    const response = await request(app).post("/register").send({
      username,
      password,
    });

    // Assurer que l'enregistrement est réussi
    expect(response.statusCode).toBe(201);
    expect(response.body.username).toEqual(username);

    // Récupération du dresseur enregistré
    const storedTrainer = await trainerRepository.findByUsername(username);

    // Vérification que le dresseur est bien récupéré
    expect(storedTrainer).not.toBeNull();
    expect(storedTrainer).not.toBeUndefined();

    // Si storedTrainer est bien récupéré, alors vérifiez le mot de passe
    if (storedTrainer) {
      // Vérification que le mot de passe n'est pas en clair
      expect(storedTrainer.password).not.toBe(password);
      // Vérification que le mot de passe est hashé
      expect(storedTrainer.password).not.toEqual(
        expect.stringContaining(password)
      ); // Vérification que le mot de passe ne contient pas la version en clair
    }
  });
});
