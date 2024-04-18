import { customAlphabet } from 'nanoid';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

// tables
export const nanoid = (length = 14) => {
	const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	return customAlphabet(alphabet, length)();
};

export const customers = sqliteTable('customers', {
	id: text('id')
		.$defaultFn(() => nanoid(6))
		.primaryKey()
		.notNull(),
	company_name: text('company_name').notNull(),
	contact_name: text('contact_name').notNull()
});

// types
export type Customer = typeof customers.$inferSelect;
