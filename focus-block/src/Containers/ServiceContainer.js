import { Component } from 'react';

/*
	This component houses all the service calls needed to connect with the server.
*/
var API_URL;
if (process.env.NODE_ENV === 'docker') {
    API_URL = "/api/";
} else {
    API_URL = process.env.REACT_APP_API_BASE;
}

class ServiceContainer extends Component {
    // POST create new user in DB //
	createUser = () => {
		return new Promise((resolve, reject) => {
			let json = fetch(`${API_URL}/new`, {
				credentials: 'omit',
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST',
				mode: 'cors'
			}).then(response => {
				return response.json();
			});

			json.then(data => {
				if (data) return resolve(data);
				return reject('User could not be created.');
			});
		});
	};

	// GET user based on ID //
	getUser = id => {
		return new Promise((resolve, reject) => {
			//-- MAD PROPS for brutusharvenius -- //
			let json = fetch(`${API_URL}/${id}`).then(
				response => {
					return response.json();
				}
			);

			json.then(data => {
				if (data) return resolve(data);
				return reject('User was not found');
			});
		});
	};

	// POST update on user by ID //
	updateUser = (id, focusBlocks) => {
		return new Promise((resolve, reject) => {
			let json = fetch(`${API_URL}/${id}`, {
				body: JSON.stringify({ focusBlocks: focusBlocks }),
				credentials: 'omit',
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST',
				mode: 'cors'
			}).then(response => {
				return response.json();
			});

			json.then(data => {
				if (data) return resolve(data);
				return reject('User could not be created.');
			});
		});
	};
}

export default ServiceContainer;
