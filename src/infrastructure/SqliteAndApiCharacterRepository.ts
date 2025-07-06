
import { CharacterRepository } from "../types/CharacterRepository";
import { fetchCharacterByFilter } from "../services/rickAndMortyApi";
import { Op } from "sequelize";
import { CharacterFilter } from "../types/CharacterFilter";
import { ICharacter } from "../types/Character";
import { Character } from "../db/models";

export class SqliteAndApiCharacterRepository implements CharacterRepository {
  public async save(character: ICharacter): Promise<void> {
    await Character.upsert({
      ...character,
      created: new Date(character.created),
    });
  }

  public async searchAll(filter: CharacterFilter): Promise<ICharacter[]> {

    const filterPrimitive = filter.toPrimitives();
    const { name, gender, species } = filterPrimitive
    const characters = await Character.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
        ...(species && { species: { [Op.like]: `%${species}%` } }),
        ...(gender && { gender: { [Op.like]: `%${gender}%` } }),
      },
    });
    if (characters.length !== 0) {
      const jsonCharacters = characters.map(
        (character) => character.toJSON()
      );
      return jsonCharacters;
    }
    const charactersApi = await fetchCharacterByFilter(filterPrimitive);
    if (charactersApi.length > 0) {
      for (const character of charactersApi) {
        await this.save(character);
      }
      return charactersApi;
    }
    return [];
  }
}
