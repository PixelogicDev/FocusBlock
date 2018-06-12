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
		},
		service: new ServiceContainer()
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
		// Check for user //
		let userId = this.getUserId(window.location.pathname);
		if (userId) {
			console.log('Found user');
			this.state.service
				.getUser(userId)
				.then(result => {
					this.setState({ user: result });
					console.log('User received.');
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			console.log('Creating user...');
			this.state.service
				.createUser()
				.then(result => {
					this.setState({ user: result });
					console.log('User created.');
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	//-- Helpers --//
	createBlock = focusBlock => {
		// Get current array //
		let currentBlocks = this.state.user.focusBlocks;
		currentBlocks.push(focusBlock);
		this.setState({ focusBlocks: currentBlocks });

		// Get clone of blocks and push to db //
		let cloneBlocks = this.blockCloner(currentBlocks);

		this.state.service
			.updateUser(this.state.user._id, cloneBlocks)
			.then(result => {
				console.log(result);
			})
			.catch(error => {
				console.log(error);
			});
	};

	blockCloner = blocks => {
		let cloneArray = [];

		blocks.forEach(block => {
			let cloneBlock = {
				id: block.id,
				title: block.title,
				timer: block.timer,
				customTimer: block.customTimer,
				friendlyTimer: block.friendlyTimer,
				contact: '',
				contactShown: block.contactShown,
				blockStarted: block.blockStarted,
				timerRef: block.timerRef,
				currentProgress: block.currentProgress,
				isEdit: block.isEdit
			};

			cloneArray.push(cloneBlock);
		});

		return cloneArray;
	};

	render() {
		return (
			<Fragment>
				<h2>Don’t get stuck on a task! Create a FocusBlock now.</h2>
				{this.state.user.focusBlocks.length === 0 ? (
					<BlockForm trigger={this.createBlock} />
				) : (
					<div className="blocks">
						{this.state.user.focusBlocks.map((block, i) => (
							<TimeBlock block={block} key={i} />
						))}
					</div>
				)}
				<div className="custom-url">
					<h3>
						Use this URL to come back to your saved FocusBlocks:{' '}
						<a target="_blank" href={this.state.user.url}>
							{this.state.user.url}
						</a>
					</h3>
				</div>
			</Fragment>
		);
	}
}

export default Dashboard;
