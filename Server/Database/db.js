const MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect(
	'mongodb://localhost:27017/focusblock',
	(error, client) => {
		if (error) throw error;

		console.log('Connected to FocusBlock DB');
		// TODO: Create .env file //
		db = client.db(process.env.DB_NAME);
	}
);

module.exports = {
	addUser: user => {
		return new Promise((resolve, reject) => {
			console.log('[db.addUser] Starting to add user...');

			let collection = db.collection('users');

			collection.insertOne(user, (insertError, data) => {
				//-- MAD PROPS panthalassadigital --//
				if (insertError) return reject(insertError);
			});

			console.log('[db.addUser] New user added.');
			return resolve(user);
		});
	},

	findUser: id => {
		return new Promise((resolve, reject) => {
			console.log('[db.findUser] Looking for user...');

			let collection = db.collection('users');

			collection.findOne({ _id: id }, null, (error, result) => {
				if (error) return reject(error);
				console.log('Returning user.');
				return resolve(result);
			});
		});
	},

	updateUser: data => {
		return new Promise((resolve, reject) => {
			console.log('[db.updateUser] Updating user...');

			let collection = db.collection('users');

			collection.update(
				{ _id: data.id },
				{ $set: { focusBlocks: data.focusBlocks } },
				(error, result) => {
					if (error) return reject(error);
					console.log('User updated.');
					return resolve(result);
				}
			);
		});
	}
};
