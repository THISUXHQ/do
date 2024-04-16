// See https://kit.svelte.dev/docs/types#app

import type { D1Database, KVNamespace, R2Bucket } from '@cloudflare/workers-types';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			db: D1Database;
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env?: {
				DB: D1Database;
				KV: KVNamespace;
				BUCKET: R2Bucket
			};
		}
	}
}

export {};
