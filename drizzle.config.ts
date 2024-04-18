import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
	driver: 'd1',
	dbCredentials: {
		wranglerConfigPath: 'wrangler.toml',
		dbName: 'do'
	},
	verbose: true,
	strict: true
} satisfies Config;
