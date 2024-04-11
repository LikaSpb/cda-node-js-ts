import * as typeRepository from "../../infrastructure/repositories/typeRepository";

export const getAllTypes = async () => {
  return await typeRepository.findAll();
};

export const getTypeById = async (id: number) => {
  return await typeRepository.findById(id);
};
