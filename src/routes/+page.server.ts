import { client } from '$lib/server/drizzle';
import { customers } from '$lib/server/schema';

export const load = async ({ platform }) => {
	const db = platform?.env?.DB as D1Database;

	// generate random customer data
	const randomId = Math.floor(Math.random() * 1000);
	const randomName = `Random Name ${randomId}`;
	const randomCompany = `Random Company ${randomId}`;

	// await platform?.env?.DB?.prepare(
	// 	'INSERT INTO customers (id, company_name, customer_name) VALUES (?, ?, ?)'
	// )
	// 	.bind(randomId, randomCompany, randomName)
	// 	.run();

	// const all_customers = await db?.prepare('SELECT * FROM customers').all();

	await client(db).insert(customers).values({
		company_name: randomCompany,
		contact_name: randomName
	});

	const all_customers = await client(db).select().from(customers).all();

	let count = await platform?.env?.KV.get('count');

	if (!count) {
		count = '0';
		await platform?.env?.KV.put('count', count); // Initialize count
	} else {
		count = String(Number(count) + 1);
		await platform?.env?.KV.put('count', count); // Increment count
	}

	return {
		all_customers,
		count
	};
};
