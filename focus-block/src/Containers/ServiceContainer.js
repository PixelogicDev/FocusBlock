import { Component } from 'react';

class ServiceContainer extends Component {
	createUser = () => {
		return new Promise((resolve, reject) => {
			let json = fetch(`${process.env.REACT_APP_API_BASE}/new`, {
				body: JSON.stringify({ name: 'Alec' }),
				credentials: 'omit',
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST',
				mode: 'cors'
			}).then(response => {
				// return response.json();
			});

			json.then(data => {
				if (data) return resolve(data);
				return reject('User could not be created.');
			});
		});
	};

	getUser = id => {
		return new Promise((resolve, reject) => {
			console.log(`Getting user with id: ${id}...`);

			//-- MAD PROPS for brutusharvenius -- //
			let json = fetch(`${process.env.REACT_APP_API_BASE}/${id}`).then(
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
}

export default ServiceContainer;
