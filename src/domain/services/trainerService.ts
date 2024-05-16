import { TrainerRepository } from "../../infrastructure/repositories/TrainerRepository";

export class TrainerService {
  private trainerRepository: TrainerRepository;

  constructor() {
    this.trainerRepository = new TrainerRepository();
  }
}
