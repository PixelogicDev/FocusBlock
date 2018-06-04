import React, { Component, Fragment } from 'react';
import Dashboard from './Components/Dashboard/index';
import ServiceContainer from './Containers/ServiceContainer';

// Styles //
import './App.css';

class App extends Component {
	getUserId = path => {
		// Split path and check for id //
		let idSplit = path.split('/');
		if (idSplit[1] !== '') {
			return idSplit[1];
		} else {
			return null;
		}
	};

	componentDidMount() {
		let service = new ServiceContainer();

		// Check for user //
		let userId = this.getUserId(window.location.pathname);
		if (userId) {
			// let user = await service.getUser(userId);
			// console.log(user);
		} else {
			// service.createUser();
		}
	}

	render() {
		return (
			<Fragment>
				<div className="nav">
					<h1>FocusBlock</h1>
				</div>
				<div className="content">
					<Dashboard />
				</div>
			</Fragment>
		);
	}
}

export default App;
