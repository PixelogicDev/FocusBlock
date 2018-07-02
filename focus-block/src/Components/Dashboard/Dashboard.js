import React, { Component, Fragment } from 'react';
import FocusBlock from '../FocusBlock/FocusBlock';
import BlockForm from '../BlockForm/BlockForm';
import AddBlockButton from './AddBlockButton/AddBlockButton';
import ServiceContainer from '../../Containers/ServiceContainer';
import './styles.css';

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: {
				_id: '',
				name: '',
				url: '',
				focusBlocks: []
			},
			isAdding: false,
			service: new ServiceContainer()
		};

		// If new user, redirect to their unique url //
		if (!props.match.params.id) {
			let serviceContainer = new ServiceContainer();
			// Create user and redirect //
			serviceContainer
				.createUser()
				.then(result => {
					this.setState({
						user: result
					});
					this.props.history.push(`/dashboard/${result._id}`);
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	componentDidMount() {
		// If userID is part of path, get user from DB //
		let userId = this.props.match.params.id;
		if (userId) {
			this.state.service
				.getUser(userId)
				.then(result => {
					console.log(result);
					this.setState({ user: result });
					console.log('User dashboard set.');
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	//-- Helpers --//
	createBlock = focusBlock => {
		// Get current blocks in state //
		let currentBlocks = this.state.user.focusBlocks;
		currentBlocks.push(focusBlock);

		this.setState({
			user: this.updateUserBlocks(currentBlocks),
			isAdding: false
		});

		// Remove contact to not store in DB //
		let clonedBlocks = this.blockCloner(currentBlocks);

		// Update DB //
		this.state.service
			.updateUser(this.state.user._id, clonedBlocks)
			.then(result => {
				console.log(result);
			})
			.catch(error => {
				console.log(error);
			});
	};

	updateBlock = focusBlock => {
		// Search for FocusBlock by ID //
		let index = this.findBlockIndex(focusBlock.id);

		if (index !== -1) {
			// Replace Block with updated one //
			let blocksCopy = this.state.user.focusBlocks;
			blocksCopy[index] = focusBlock;

			// Set state //
			this.setState({
				user: this.updateUserBlocks(blocksCopy)
			});

			// Clone block to remove email //
			let clonedBlocks = this.blockCloner(blocksCopy);

			// Update db //
			this.state.service
				.updateUser(this.state.user._id, clonedBlocks)
				.then(result => {
					console.log(result);
				})
				.catch(error => {
					console.log(error);
				});
		} else {
			console.log('FocusBlock not found.');
		}
	};

	deleteBlock = id => {
		// Find index of block //
		let index = this.findBlockIndex(id);

		if (index !== -1) {
			// Pop alert to confirm delete //
			let willDelete = window.confirm(
				`This action will delete "${
					this.state.user.focusBlocks[index].title
				}". Continue?`
			);

			if (willDelete) {
				// Trigger update //
				let blocksCopy = this.state.user.focusBlocks;
				blocksCopy.splice(index, 1);

				// Set state //
				this.setState({
					user: this.updateUserBlocks(blocksCopy)
				});

				// Clone block to remove email //
				let clonedBlocks = this.blockCloner(blocksCopy);

				// Update db //
				this.state.service
					.updateUser(this.state.user._id, clonedBlocks)
					.then(result => {
						console.log(result);
					})
					.catch(error => {
						console.log(error);
					});
			}
		} else {
			console.log('FocusBlock not found.');
		}
	};

	getUserId = path => {
		// Split path and check for id //
		let idSplit = path.split('/');
		return idSplit[1] !== '' ? idSplit[1] : null;
	};

	findBlockIndex = id => {
		return this.state.user.focusBlocks
			.map(block => {
				return block.id;
			})
			.indexOf(id);
	};

	updateUserBlocks = newBlocks => {
		// Get current user state //
		let currentUser = { ...this.state.user };
		currentUser.focusBlocks = newBlocks;
		return currentUser;
	};

	blockCloner = blocks => {
		let cloneArray = [];

		blocks.forEach(block => {
			let cloneBlock = {
				...block
			};

			// Remove contact //
			cloneBlock.contact = '';
			cloneArray.push(cloneBlock);
		});

		return cloneArray;
	};

	addNewBlock = () => {
		this.setState({
			isAdding: true
		});
	};

	showBlockForm = () => {
		return this.state.user.focusBlocks.length === 0 || this.state.isAdding;
	};

	render() {
		let triggerObj = {
			create: this.createBlock,
			update: this.updateBlock,
			delete: this.deleteBlock
		};

		return (
			<Fragment>
				<div className="container">
					<div className="custom-url">
						Use this URL to come back to your saved FocusBlocks:{' '}
						<a target="_blank" href={this.state.user.url}>
							{this.state.user.url}
						</a>
					</div>
					{this.showBlockForm() ? (
						<BlockForm triggers={triggerObj} />
					) : (
						<div className="blocks">
							{this.state.user.focusBlocks.map((block, i) => (
								<FocusBlock events={triggerObj} block={block} key={i} />
							))}
						</div>
					)}
				</div>
				<AddBlockButton addBlockTrigger={this.addNewBlock} />
			</Fragment>
		);
	}
}

export default Dashboard;
