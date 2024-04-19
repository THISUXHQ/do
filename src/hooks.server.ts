import type { D1Database, KVNamespace } from '@cloudflare/workers-types';
import { getPlatformProxy } from 'wrangler';

export async function handle({ event, resolve }) {
	const proxy = await getPlatformProxy({
		configPath: 'wrangler.toml'
	});

	if (event?.platform?.env) {
		event.platform.env.DB = proxy.env.DB as D1Database;
		event.platform.env.KV = proxy.env.KV as KVNamespace;
	}

	const response = await resolve(event);
	return response;
}
