import { ICharacter } from "../types/Character";
const FIVE_MINUTES = 5 * 60 * 1000; // Default TTL of 5 minutes
interface CacheEntry {
  timestamp: number;
  data: ICharacter[];
}

interface Cache {
  [key: string]: CacheEntry;
}

export class CacheCharacterInMemory {
  private static cache: Cache = {};
  private readonly ttl: number;
  constructor(ttl: number = FIVE_MINUTES) {
    this.ttl = ttl;
  }
  isOnCache(key: string): ICharacter[] | null {
    const entry = CacheCharacterInMemory.cache[key];
    if (!entry) {
      return null;
    }
    const now = Date.now();
    if (now - entry.timestamp > this.ttl) {
      delete CacheCharacterInMemory.cache[key];
      return null;
    }
    console.log(`Cache hit for key: ${key}`);
    return entry.data;
  }
  save(key: string, data: ICharacter[]): void {
    CacheCharacterInMemory.cache[key] = {
      timestamp: Date.now(),
      data
    };
  }
  clear(): void {
    CacheCharacterInMemory.cache = {};
  }
}
