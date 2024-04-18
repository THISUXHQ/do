import { drizzle } from 'drizzle-orm/d1';
import * as schema from '$lib/server/schema';

export const client = (database: D1Database) =>
	drizzle(database, {
		schema: schema,
		logger: true
	});
