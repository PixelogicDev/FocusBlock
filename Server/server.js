//-- Modules --//
require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const db = require('./Database/db');
const shortid = require('shortid');
const cors = require('cors');

// Middleware setup //
server.use(cors());
server.use(bodyParser.json());
server.get('/', (req, res) => {
	res.send('Welcome to FocusBlock Server!');
});

// POST new user //
server.post('/new', async (req, res) => {
	// Generate unique url & save to db //
	console.log('Creating new user...');
	let id = shortid.generate();
	let userObj = {
		_id: id,
		url: `${process.env.BASE_PATH}:${process.env.PORT}/dashboard/${id}`,
		focusBlocks: []
	};

	// Write to db //
	let result = await db.addUser(userObj).catch(error => {
		throw error;
	});

	res.send(result);
});

// GET user by ID //
server.get('/:id', async (req, res) => {
	let id = req.params.id;

	// DB lookup to bring back data //
	let user = await db.findUser(id).catch(error => {
		throw error;
	});

	res.send(user);
});

// POST new data for user by ID //
server.post('/:id', async (req, res) => {
	// Get json body //
	let data = {
		id: req.params.id,
		focusBlocks: req.body.focusBlocks
	};

	// Write to DB //
	let result = await db.updateUser(data).catch(error => {
		throw error;
	});
	res.send({ result: result });
});

server.listen(process.env.PORT || 8000, () => {
	console.log('Connected to FocusBlock Server!');
});
