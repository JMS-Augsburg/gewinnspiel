const { Database } = require('sqlite3');

const db = new Database(
	'database.db',
	function (err) {
		if (err) {
			console.error(err.message);
			return;
		}

		console.log('Verbunden mit der SQLite-Datenbank.');
	},
);

db.run(
	`CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY,
		name TEXT,
		email TEXT,
		timestamp DATE_TIME DEFAULT CURRENT_TIMESTAMP
	)`,
	function (err) {
		if (err) {
			console.error(err.message);
			return;
		}

		console.log('Tabelle users erstellt.');
	},
);

module.exports = db;
