import { Request, Response } from "express";
import { SqliteAndApiCharacterRepository } from "../infrastructure/SqliteAndApiRepository";
import { CharactersFinder } from "../useCases/CharactersFinder";
import { LoggerDecorator } from "../services/LoggerDecorator";
import { DomainError, TypeErrors } from "../types/DomainError";
import { CacheCharacterInMemory } from "../services/CacheCharacterInMemory";

const getCharacters = async (_req: Request, res: Response): Promise<void> => {
  try {
    const { query: queryParams, originalUrl: pathUrl } = _req;
    const cache = new CacheCharacterInMemory();
    const data = cache.isOnCache(pathUrl);
    if (data !== null) {
      res.status(200).json({ result: data });
      return;
    }
    const { name, species, gender } = queryParams;
    const filter = {
      name: name as string,
      species: species  as string | undefined,
      gender:  gender as string | undefined,
    }
    const characterRepository = new SqliteAndApiCharacterRepository();
    const useCase = LoggerDecorator.decorate(
      new CharactersFinder(characterRepository)
    );
    const result = await useCase.run(filter);
    cache.save(pathUrl, result);
    res.status(200).json({ result });
  } catch (error) {
    if (error instanceof DomainError) {
      switch (error.type) {
        case TypeErrors.InvalidInput:
          res.status(409).json({ message: error.message });
          return;
        case TypeErrors.NotFound:
          res.status(404).json({ message: error.message });
          return;
        case TypeErrors.InternalServerError:
          res.status(500).json({ message: error.message });
        default:
          res.status(500).json({ message: "Internal server error" });
          return;
      }
    }
    console.error("unexpected error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export { getCharacters };
