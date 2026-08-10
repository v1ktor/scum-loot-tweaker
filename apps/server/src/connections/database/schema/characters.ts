import { pgTable, text } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers.ts';

export const characters = pgTable('characters', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    ...timestamps,
});

export type Character = typeof characters.$inferSelect;
export type NewCharacter = typeof characters.$inferInsert;
