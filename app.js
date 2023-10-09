const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const { checkSchema, matchedData, validationResult } = require('express-validator');
const db = require('./database');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(__dirname + '/dist'));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/bootstrap/icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));

app.engine('hbs', handlebars.engine({
	defaultLayout: 'layout.hbs',
	layoutsDir: path.join(__dirname, 'html'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'html'));

app.get('/', (req, res) => {
	res.render('index', {page_title: 'JMS Gewinnspiel'});
});

const validator = checkSchema(
	{
		name: {
			isString: true,
			trim: true,
			notEmpty: {
				errorMessage: 'Name ist ein Pflichtfeld!',
			},
		},
		email: {
			isString: true,
			trim: true,
			isEmail: {
				errorMessage: 'Ungültige E-Mail-Adresse',
			},
		},
	},
	['body'],
);

app.post('/submit', validator, (req, res) => {
	const validationErrors = validationResult(req);
	const {name, email} = matchedData(req);

	if (!validationErrors.isEmpty()) {
		console.log('Hier fehlt etwas', {name, email});
		res.render('error', {page_title: 'Fehler', name, email});
		return;
	}

	db.run(
		'INSERT INTO users (name, email) VALUES (?, ?)',
		[name, email],
		function (err) {
			if (err) {
				console.error(err.message);
				res.render('error', {page_title: 'Fehler', name, email});
				return;
			}

			console.log('Daten in die Tabelle users eingefügt.', {name, email});

			res.render('success', {page_title: 'JMS Gewinnspiel', name, email});
		},
	);
});

app.listen(3000, function () {
	console.log('Webserver läuft auf dem Port 3000.');
});
