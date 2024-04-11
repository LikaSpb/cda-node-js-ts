import { Request, Response } from "express";
import * as trainerService from "../../../domain/services/trainerService";

export const registerTrainer = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .send({ message: "Username and password are required." });
    }
    const newTrainer = await trainerService.createTrainer(username, password);
    return res.status(201).send(newTrainer);
  } catch (error: any) {
    if (error instanceof Error && error.message === "Username already exists") {
      return res.status(409).send({ message: error.message });
    }
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

export const loginTrainer = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const tokens = await trainerService.authenticateTrainer(username, password);
    if (tokens) {
      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/refresh-token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).send({ accessToken: tokens.accessToken });
    } else {
      return res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error" });
  }
};
