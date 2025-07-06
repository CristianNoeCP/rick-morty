import * as faker from "faker";
import { ICharacter } from "../types/Character";
import { Gender } from "../types/APIRickAndMorty";

export class ICharacterMother {
  static random({name}:{name:string | undefined}): ICharacter {
    return {
      id: faker.datatype.number(),
      image: faker.image.avatar(),
      name: name || faker.name.findName(),
      status: faker.random.arrayElement(["Alive", "Dead", "unknown"]),
      species: faker.animal.type(),
      type: faker.lorem.word(),
      gender: faker.random.arrayElement(Object.values(Gender)),
      origin: faker.lorem.word(),
      location: faker.lorem.word(),
      created: faker.date.past(),
    };
  }
  static randomName(): string {
    return faker.name.findName();
  }
}
