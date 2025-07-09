import axios, { AxiosResponse } from 'axios';
import {  RickAndMortyAPIResponse, RickAndMortyCharacter } from '../types/APIRickAndMorty';
import { ICharacter } from "../types/Character";
import { filterPrimitive } from '../types/CharacterFilter';

const BASE_URL = process.env.RICK_AND_MORTY_API_URL
/**
 * Fetches characters from Rick and Morty API by name
 * @param {string} name - The name to search for
 * @returns {Promise<RickAndMortyCharacter[]>} - Array of characters that match the name
 */
async function fetchCharacterByFilter(filter: filterPrimitive): Promise<ICharacter[]> {
  try {
    const queryParams = new URLSearchParams({
      name: filter.name,
      ...(filter.species && { species: filter.species }),
      ...(filter.gender &&  {gender: filter.gender })
    });
    const response= await axios.get<any,AxiosResponse< RickAndMortyAPIResponse>>(`${BASE_URL}/character/?${queryParams.toString()}`);
    if (!response.data || !response.data.results) {
      return [];
    }
    return serializeCharacters(response.data.results);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return [];
    }
    throw error;
  }
}
const serializeCharacters = (characters: RickAndMortyCharacter[]): ICharacter[] => {
  return characters.map(character => ({
   id: character.id,
  name: character.name,
  status: character.status,
  species: character.species,
  type: character.type,
  gender: character.gender,
  origin: character.origin.name,
  location: character.location.name,
  image: character.image,
  created: character.created ? new Date(character.created) : new Date()
  }))

}
export { fetchCharacterByFilter };
