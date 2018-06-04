require('dotenv').config();
const express = require('express');
const server = express();
const db = require('./Database/db');
const shortid = require('shortid');
const cors = require('cors');

server.use(cors());
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
		url: `${process.env.BASE_PATH}/${id}`,
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

server.listen(8000, () => {
	console.log('FocusBlock Server started on port 8000');
});
