DROP TABLE IF EXISTS Customers;
CREATE TABLE IF NOT EXISTS customers (id TEXT PRIMARY KEY, company_name TEXT, contact_name TEXT);

INSERT INTO customers (id, company_name, contact_name) VALUES ('ALFKI', 'Alfreds Futterkiste', 'Maria Anders');