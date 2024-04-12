import request from "supertest";
import app from "../../src/app";

describe("POST /register", () => {
  it("should register a new trainer", async () => {
    const response = await request(app).post("/register").send({
      username: "testTrainer",
      password: "testPassword",
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("username", "testTrainer");
  });
});
