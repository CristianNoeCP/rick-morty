import { DomainError, TypeErrors } from "./DomainError";
export interface FilterDTO {
  name: string;
  species?: string;
  gender?: string;
}
enum Gender {
  Female = "female",
  Gender = "gender",
  Unknown = "unknown",
  Genderless = "genderless",
}
export interface filterPrimitive {
  name: string;
  species?: string;
  gender?: string;
}
export class CharacterFilter {
  private name: string;
  private species?: string;
  private gender?: Gender;
  constructor(name: string, species?: string, gender?: string) {
    this.guard(name, species, gender);
    this.name = name;
    this.species = species;
    this.gender = gender as Gender;
  }
  private guard(name: string, species?: string, gender?: string) {
    this.ensureNameIsValid(name);
    this.ensureSpeciesIsValid(species);
    this.ensureGenderIsValid(gender);
  }
  private ensureGenderIsValid(gender: string | undefined) {
    if (
      gender !== undefined &&
      !Object.values(Gender).includes(gender as Gender)
    ) {
      throw new DomainError(
        `Gender is invalid: "${gender}". it should be: ${Object.values(
          Gender
        ).join(", ")}`,
        TypeErrors.InvalidInput
      );
    }
  }

  private ensureSpeciesIsValid(species: string | undefined) {
    if (
      species !== undefined &&
      (typeof species !== "string" || species.trim() === "")
    ) {
      throw new DomainError(
        "Species cannot be an empty string",
        TypeErrors.InvalidInput
      );
    }
  }

  private ensureNameIsValid(name: string) {
    if (name === undefined || typeof name !== "string"|| name.trim() === "") {
      throw new DomainError(
        "Name is required and cannot be empty",
        TypeErrors.InvalidInput
      );
    }
  }

  public static fromPrimitives(data: filterPrimitive): CharacterFilter {
    return new CharacterFilter(data.name, data.species, data.gender);
  }
  public toPrimitives(): filterPrimitive {
    return {
      name: this.name.toString(),
      species: this.species?.toString(),
      gender: this.gender?.toString(),
    };
  }
}
