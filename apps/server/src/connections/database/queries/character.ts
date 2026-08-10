import { isNull } from 'drizzle-orm';
import { db } from '../index.ts';
import { characters } from '../schema/index.ts';

export function listAllCharacters() {
    return db.select().from(characters).where(isNull(characters.deletedAt));
}
