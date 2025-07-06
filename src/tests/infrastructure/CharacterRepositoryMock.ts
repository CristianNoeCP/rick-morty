import { ICharacter } from "../../types/Character";
import { CharacterFilter } from "../../types/CharacterFilter";
import { CharacterRepository } from "../../types/CharacterRepository";

export class CharacterRepositoryMock implements CharacterRepository {

  public readonly saveMock = jest.fn();
  public readonly searchMock = jest.fn();
  public characters: ICharacter[] = [];
  save(character: ICharacter): Promise<void> {
    this.saveMock(character);
    return Promise.resolve();
  }
    returnOnSearch(characters: ICharacter[]): void {
    this.characters = characters;
  }

  searchAll(filter: CharacterFilter): Promise<Array<ICharacter>> {
    this.searchMock(filter);
    return Promise.resolve(this.characters);
  }
  // async search(id: PostId): Promise<RetentionPost | null> {
  // 	expect(this.mockSearch).toHaveBeenCalledWith(id);

  // 	return this.mockSearch() as Promise<RetentionPost | null>;
  // }

  // shouldSave(post: RetentionPost): void {
  // 	this.mockSave(post.toPrimitives());
  // }

  // shouldSearch(post: RetentionPost): void {
  // 	this.mockSearch(post.id);
  // 	this.mockSearch.mockReturnValueOnce(post);
  // }

  // shouldSearchAndReturnNull(id: PostId): void {
  // 	this.mockSearch(id);
  // 	this.mockSearch.mockReturnValueOnce(null);
  // }
}
