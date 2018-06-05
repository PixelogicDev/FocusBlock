import React, { Component, Fragment } from 'react';
import TimeBlock from '../TimeBlock/index';
import BlockForm from '../Forms/BlockForm/index';
import ServiceContainer from '../../Containers/ServiceContainer';

class Dashboard extends Component {
	state = {
		user: {
			_id: '',
			name: '',
			url: '',
			focusBlocks: []
		}
	};

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
			console.log('Found user');
			service.getUser(userId).then((result, error) => {
				if (error) {
					console.log(error);
					return;
				}

				this.setState({ user: result });
			});
		} else {
			console.log('Creating user...');
			service.createUser().then((result, error) => {
				if (error) {
					console.log(error);
					return;
				}

				this.setState({ user: result });
			});
		}
	}

	//-- Helpers --//
	createBlock = focusBlock => {
		// Get current array //
		let currentBlocks = this.state.focusBlocks;
		currentBlocks.push(focusBlock);
		this.setState({ focusBlocks: currentBlocks });
	};

	render() {
		return (
			<Fragment>
				{this.state.user.focusBlocks.length === 0 ? (
					<Fragment>
						<h2>Don’t get stuck on a task! Create a FocusBlock now.</h2>
						<BlockForm trigger={this.createBlock} />
					</Fragment>
				) : (
					<div className="blocks">
						{this.state.user.focusBlocks.map((block, i) => (
							<TimeBlock block={block} key={i} />
						))}
					</div>
				)}
			</Fragment>
		);
	}
}

export default Dashboard;
