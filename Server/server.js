require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const db = require('./Database/db');
const shortid = require('shortid');
const cors = require('cors');

server.use(cors());
server.use(bodyParser.json());
server.get('/', (req, res) => {
	res.send('Welcome to FocusBlock Server');
});

server.post('/new', async (req, res) => {
	// Generate unique url & sva to db //
	console.log('Creating new user...');

	let id = shortid.generate();
	let userObj = {
		_id: id,
		name: '',
		url: `${process.env.BASE_PATH}/dashboard/${id}`,
		focusBlocks: []
	};
	// Write to db //
	let result = await db.addUser(userObj).catch(error => {
		throw error;
	});

	// Return status //
	res.send(result);
});

server.get('/:id', async (req, res) => {
	let id = req.params.id;

	// DB lookup to bring back data //
	let user = await db.findUser(id).catch(error => {
		throw error;
	});

	res.send(user);
});

server.post('/:id', async (req, res) => {
	// Get json body //
	let data = {
		id: req.params.id,
		focusBlocks: req.body.focusBlocks
	};

	let result = await db.updateUser(data).catch(error => {
		throw error;
	});
	res.send({ result: result });
});

server.listen(8000, () => {
	console.log('FocusBlock Server started on port 8000');
});
