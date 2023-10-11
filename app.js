const path = require('path');
const express = require('express');
const cors = require('cors');
const handlebars = require('express-handlebars');
const { checkSchema, matchedData, validationResult } = require('express-validator');
const crypto = require('node:crypto');
const dotenv = require('dotenv');
const metadata = require('./package.json');
const db = require('./database');

dotenv.config();

const app = express();
app.use(cors());
app.use((req, res, next) => {
	res.header({
		'Cross-Origin-Resource-Policy': 'cross-origin',
		'Cross-Origin-Embedder-Policy': 'require-corp',
	});
	next();
});
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/bootstrap/icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));

app.engine('hbs', handlebars.engine({
	defaultLayout: 'layout.hbs',
	layoutsDir: path.join(__dirname, 'html'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'html'));
app.locals.submit_url = process.env.APP_SUBMIT_URL;

function generateRandomInt() {
	const min = 10;
	const max = 100;

	return Math.floor(Math.random() * (max - min) + min);
}

app.get('/', (req, res) => {
	res.render('index', {
		page_title: 'JMS IT-Gewinnspiel',
		randomVal: crypto.randomUUID(),
		summand1: generateRandomInt(),
		summand2: generateRandomInt(),
	});
});

app.get('/code', (req, res) => {
	console.log('redirecting to source code');
	res.redirect(metadata.homepage);
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
		tos_consent: {
			isBoolean: true,
			equals: {
				options: 'true',
				errorMessage: 'Den Teilnahmebedingungen muss zugestimmt werden',
			},
		},
		randomVal: {
			isString: true,
			matches: {
				// we use UUIDs as our random values in the format
				// 0a98d180-28dc-46d7-a71f-e6c13412bde9
				// i.e. groups of 8, 4, 4, 4 and 12 characters
				// separated by '-'
				options: /.{8}-.{4}-.{4}-.{4}-.{12}/,
				errorMessage: 'Ungültiger Zufallswert',
			},
		},
		summand1: {
			notEmpty: true,
			isNumeric: true,
		},
		summand2: {
			notEmpty: true,
			isNumeric: true,
		},
		captcha: {
			notEmpty: true,
			isNumeric: true,
		},
	},
	['body'],
);

function verifyCaptcha(data) {
	const summand1 = data.summand1;
	const summand2 = data.summand2;
	const submitted = data.captcha;

	const sum = summand1 * summand2;

	if (submitted != sum) {
		console.error('invalid captcha', {
			summand1,
			summand2,
			submitted,
			expected: sum,
		});

		return false;
	}

	return true;
}

app.get('/submit', (req, res) => {
	res.redirect('/');
});

app.post('/submit', validator, (req, res) => {
	const validationErrors = validationResult(req);
	const data = matchedData(req);
	const {name, email, randomVal} = data;

	if (!validationErrors.isEmpty()) {
		console.log('Hier fehlt etwas', {name, email, randomVal});
		res.render('index', {
			page_title: 'JMS IT-Gewinnspiel',
			name,
			email,
			randomVal: crypto.randomUUID(),
			summand1: generateRandomInt(),
			summand2: generateRandomInt(),
			errors: JSON.stringify(validationErrors.mapped()),
		});
		return;
	}

	if (!verifyCaptcha(data)) {
		res.render('index', {
			page_title: 'JMS IT-Gewinnspiel',
			name,
			email,
			randomVal: crypto.randomUUID(),
			summand1: generateRandomInt(),
			summand2: generateRandomInt(),
			errors: JSON.stringify('eingegebenes Captcha stimmt nicht mit dem erwarteten Wert überein!'),
		});
		return;
	}

	db.run(
		'INSERT INTO users (name, email, randomVal) VALUES (?, ?, ?)',
		[name, email, randomVal],
		function (err) {
			if (err) {
				console.error(err.message);
				res.render('index', {
					page_title: 'JMS IT-Gewinnspiel',
					name,
					email,
					randomVal: crypto.randomUUID(),
					summand1: generateRandomInt(),
					summand2: generateRandomInt(),
					errors: JSON.stringify(err.message),
				});
				return;
			}

			console.log('Daten in die Tabelle users eingefügt.', {name, email, randomVal});

			res.render('index', {page_title: 'JMS IT-Gewinnspiel', name, email, success: true});
		},
	);
});

app.get('/winner', (req, res) => {
	res.render('winner_password');
});

const passwordValidator = checkSchema({
	password: {
		equals: {
			options: process.env.APP_PASSWORD,
		},
	},
});

const placeValidator = checkSchema({
	place: {
		isInt: true,
	},
});

app.post('/winner', passwordValidator, placeValidator, (req, res) => {
	const validationErrors = validationResult(req);
	const data = matchedData(req);
	const password = data.password;
	const place = parseInt(data.place);

	if (!validationErrors.isEmpty()) {
		res.redirect('/winner');
		return;
	}

	db.get(
		'SELECT * FROM users ORDER BY randomVal LIMIT ?, 1',
		[place],
		(err, result) => {
			if (err || !result) {
				console.error({err, result});
				res.render('winner', {place});
				return;
			}

			res.render('winner', {
				name: result.name,
				place,
				password,
				previousPlace: place - 1,
				nextPlace: place + 1,
			});
		},
	);
});

app.get('/all', (req, res) => {
	res.render('users_password');
});

app.post('/all', passwordValidator, (req, res) => {
	const validationErrors = validationResult(req);

	if (!validationErrors.isEmpty()) {
		res.redirect('/all');
		return;
	}

	db.all(
		'SELECT * FROM users ORDER BY id',
		(err, users) => {
			if (err || !users) {
				console.error({err, result});
				res.render('users', {users: []});
				return;
			}

			res.render('users', {users});
		},
	);
});

app.listen(3000, function () {
	console.log('Webserver läuft auf dem Port 3000.');
});
