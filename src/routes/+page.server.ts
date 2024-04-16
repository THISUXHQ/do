import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ platform }) => {
	const db = platform?.env?.DB;

	// generate random customer data
	const randomId = Math.floor(Math.random() * 1000);
	const randomName = `Random Name ${randomId}`;
	const randomCompany = `Random Company ${randomId}`;

	await db?.prepare('INSERT INTO Customers (CustomerID, CompanyName, ContactName) VALUES (?, ?, ?)').bind(randomId, randomCompany, randomName).run();

	const customers = await db?.prepare('SELECT * FROM Customers').all();

	let count = await platform?.env?.KV.get('count');

	if (!count) {
		count = '0';
		await platform?.env?.KV.put('count', count); // Initialize count
	} else {
		count = String(Number(count) + 1);
		await platform?.env?.KV.put('count', count); // Increment count
	}



	return {
		customers,
		count
	};
};
