import { ICharacter } from "./Character";
import { CharacterFilter } from './CharacterFilter';

export interface CharacterRepository {
  save(character: ICharacter): Promise<void>;
  searchAll(filter:CharacterFilter): Promise<Array<ICharacter>>;
}