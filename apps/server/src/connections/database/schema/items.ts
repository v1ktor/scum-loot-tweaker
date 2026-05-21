import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers.ts';
import { itemCategories } from './item-categories.ts';

export const items = pgTable('items', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    categoryId: integer('category_id').references(() => itemCategories.id),
    description: text('description'),
    ...timestamps,
});

export type Item = typeof items.$inferSelect;
export type NewItem = typeof items.$inferInsert;
