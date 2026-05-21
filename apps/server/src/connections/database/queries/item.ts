import { db } from '../index.ts';
import { items } from '../schema/index.ts';

export function listAllItems() {
    return db.select().from(items);
}
