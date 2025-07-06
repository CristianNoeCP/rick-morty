import { ICharacterMother } from "./characterMother";
import { CharacterRepositoryMock } from "./infrastructure/CharacterRepositoryMock";
import { CharactersFinder } from "../useCases/CharactersFinder"; // Update the path as needed
import { DomainError, TypeErrors } from "../types/DomainError";
describe("CharactersFinder UseCase", () => {
  let repository: CharacterRepositoryMock;

  beforeEach(() => {
    repository = new CharacterRepositoryMock();
  });

  it("should find an existing characters", async () => {
    const nameFilter = ICharacterMother.randomName();
    const characters = [
      ICharacterMother.random({ name: nameFilter }),
      ICharacterMother.random({ name: nameFilter }),
    ];
    repository.returnOnSearch(characters);
    const useCase = new CharactersFinder(repository);
    const result = await useCase.run({ name: nameFilter });
    expect(repository.searchMock).toHaveBeenCalled();
    expect(result).toEqual(characters);
    expect(result[0].name).toEqual(nameFilter);
  });
  it("should find 0 characters", async () => {
    const nameFilter = ICharacterMother.randomName();
    const useCase = new CharactersFinder(repository);
    const result = await useCase.run({ name: nameFilter });
    expect(repository.searchMock).toHaveBeenCalled();
    expect(repository.searchMock).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  });

  it("should throw error if filter character name is empty", async () => {
    const useCase = new CharactersFinder(repository);
    try {
      await useCase.run({ name: "" });
      fail("Expected DomainError to be thrown");
    } catch (error: any) {
      expect(error).toBeInstanceOf(DomainError);
      expect(error.message).toBe("Name is required and cannot be empty");
      expect(error.type).toBe(TypeErrors.InvalidInput);
    }
  });

  it("should throw error if filter character gender is invalid", async () => {
    const useCase = new CharactersFinder(repository);
    const genderFilter = "invalid";
    const nameFilter = ICharacterMother.randomName();
    try {
      await useCase.run({ name: nameFilter, gender: genderFilter });
      fail("Expected DomainError to be thrown");
    } catch (error: any) {
      expect(error).toBeInstanceOf(DomainError);
      expect(error.message).toBe(`Gender is invalid: "${genderFilter}". it should be: female, gender, unknown, genderless`)
      expect(error.type).toBe(TypeErrors.InvalidInput);
    }
  });

    it("should throw error if filter character species is invalid", async () => {
    const useCase = new CharactersFinder(repository);
    const speciesFilter = "";
    const nameFilter = ICharacterMother.randomName();
    try {
      await useCase.run({ name: nameFilter, species: speciesFilter});
      fail("Expected DomainError to be thrown");
    } catch (error: any) {
      expect(error).toBeInstanceOf(DomainError);
      expect(error.message).toBe(`Species cannot be an empty string`)
      expect(error.type).toBe(TypeErrors.InvalidInput);
    }
  });
});
