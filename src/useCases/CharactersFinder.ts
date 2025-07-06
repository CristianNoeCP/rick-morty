
import { CharacterRepository } from '../types/CharacterRepository';
import { CharacterFilter, FilterDTO } from '../types/CharacterFilter';

export class CharactersFinder {
  constructor(private characterRepository: CharacterRepository) {}
  async run(filter:FilterDTO) {
    const characterFilter = CharacterFilter.fromPrimitives(filter);
    const characters = await this.characterRepository.searchAll(characterFilter);
    return characters;
  }
}