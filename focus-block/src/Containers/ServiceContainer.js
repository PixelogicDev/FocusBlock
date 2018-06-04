import { Component } from 'react';

class ServiceContainer extends Component {
	createUser = () => {
		fetch(
			'http://localhost:8000/new',
			{
				body: JSON.stringify({ name: 'Alec' }),
				credentials: 'omit',
				headers: {
					'content-type': 'application/json'
				},
				method: 'POST',
				mode: 'cors'
			},
			response => {
				console.log(response);
			}
		);
	};

	getUser = id => {
		return new Promise((resolve, reject) => {
			console.log(`Getting user with id: ${id}...`);

			fetch(`http://localhost:8000/${id}`, response => {
				if (response) {
					return resolve(response);
				}

				return reject('User not found.');
			});
		});
	};
}

export default ServiceContainer;
