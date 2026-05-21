import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers.ts';

export const itemCategories = pgTable('item_categories', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    ...timestamps,
});

export type ItemCategory = typeof itemCategories.$inferSelect;
export type NewItemCategory = typeof itemCategories.$inferInsert;
