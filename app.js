const express = require('express');
const db = require('./database');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;

	if (!name || !email) {
		console.log('Hier fehlt etwas', {name, email});
		res.sendFile(__dirname + '/error.html');
		return;
	}

	db.run(
		'INSERT INTO users (name, email) VALUES (?, ?)',
		[name, email],
		function (err) {
			if (err) {
				console.error(err.message);
				res.sendFile(__dirname + '/error.html');
				return;
			}

			console.log('Daten in die Tabelle users eingefügt.', {name, email});

			res.send(`
				<html>
					<head>
						<title>JMS Gewinnspiel</title>
					</head>
					<body>
						<h1>Danke für deine Einsendung</h1>
						<p>Name: ${name}</p>
						<p>E-Mail: ${email}</p>
					</body>
				</html>
			`);
		},
	);
});

app.listen(3000, function () {
	console.log('Webserver läuft auf dem Port 3000.');
});
