import * as express from "express";
import * as typeService from "../../../domain/services/typeService"; // Assurez-vous de créer ce service

export const getAllTypes = async (req: express.Request, res: express.Response) => {
  try {
    const types = await typeService.getAllTypes();
    res.json(types);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};

export const getTypeById = async (req: express.Request, res: express.Response) => {
  try {
    const type = await typeService.getTypeById(Number(req.params.id));
    if (type) {
      res.json(type);
    } else {
      res.status(404).send("Type not found");
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
};
