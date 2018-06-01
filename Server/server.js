const express = require('express');
const server = express();
const db = require('./Database/db');
const shortid = require('shortid');

server.get('/', (req, res) => {
	res.send('Welcome to FocusBlock Server');
});

server.post('/new', async (req, res) => {
	// Generate unique url & sva to db //
	console.log('Creating new user...');
	let userObj = {
		_id: shortid.generate(),
		name: '',
		focusBlocks: []
	};
	// Write to db //
	let result = await db.addUser(userObj).catch(error => {
		throw error;
	});

	// Return status //
	res.send(result);
});

server.listen(8000, () => {
	console.log('FocusBlock Server started on port 8000');
});
