const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017/focusblock', (error, client) => {
	if (error) throw error;

	console.log('Connected to FocusBlock DB');
	// TODO: Create .env file //
	db = client.db('focusblock');
});

module.exports = {
	addUser: user => {
		return new Promise((resolve, reject) => {
			console.log('[db.addUser] Starting to add user.');

			let collection = db.collection('users');

			collection.insertOne(user, (insertError, data) => {
				return reject(insertError);
			});

			console.log('[db.addUser] New user added.');
			return resolve(200);
		});
	}
};
