import React, { Component, Fragment } from 'react';
import FocusBlock from '../FocusBlock/FocusBlock';
import BlockForm from '../BlockForm/BlockForm';
import AddBlockButton from './AddBlockButton/AddBlockButton';
import ServiceContainer from '../../Containers/ServiceContainer';
import ReactGA from 'react-ga';
import './styles.css';

/* 
	The Dashboard component is used to house all the FocusBlocks you have created.
	NOTE: I did not want to keep any emails in the DB, so all emails are stripped before network call.
*/

class Dashboard extends Component {
	constructor(props) {
		super(props);

		// Init state //
		this.state = {
			user: {
				_id: '',
				url: '',
				focusBlocks: []
			},
			isAdding: false,
			service: new ServiceContainer()
		};

		// If new user, redirect to their unique url //
		if (!props.match.params.id) {
			const serviceContainer = new ServiceContainer();
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
		const userId = this.props.match.params.id;
		if (userId) {
			this.state.service
				.getUser(userId)
				.then(result => {
					this.setState({ user: result });
					console.log('User dashboard set.');
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	//-- Helpers --//

	// Event used to create a new FocusBlock & send to DB //
	createBlock = focusBlock => {
		// Get current blocks in state //
		const currentBlocks = this.state.user.focusBlocks;
		currentBlocks.push(focusBlock);

		this.setState({
			user: this.updateUserBlocks(currentBlocks),
			isAdding: false
		});

		// Remove contact to not store in DB //
		const clonedBlocks = this.blockCloner(currentBlocks);

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

	// Event used to update a FocusBlock & send to DB //
	updateBlock = focusBlock => {
		// Search for FocusBlock by ID //
		const index = this.findBlockIndex(focusBlock.id);

		if (index !== -1) {
			// Replace Block with updated one //
			const blocksCopy = this.state.user.focusBlocks;
			blocksCopy[index] = focusBlock;

			// Set state //
			this.setState({
				user: this.updateUserBlocks(blocksCopy)
			});

			// Clone block to remove email //
			const clonedBlocks = this.blockCloner(blocksCopy);

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

	// Event used to delete a FocusBlock & send to DB //
	deleteBlock = id => {
		// Find index of block //
		const index = this.findBlockIndex(id);

		if (index !== -1) {
			// Pop alert to confirm delete //
			const willDelete = window.confirm(
				`This action will delete "${
				this.state.user.focusBlocks[index].title
				}". Press 'Okay' to confirm.`
			);

			if (willDelete) {
				// Trigger update //
				const blocksCopy = this.state.user.focusBlocks;
				blocksCopy.splice(index, 1);

				// Set state //
				this.setState({
					user: this.updateUserBlocks(blocksCopy)
				});

				// Clone block to remove email //
				const clonedBlocks = this.blockCloner(blocksCopy);

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

	// Get ID from path and parse //
	getUserId = path => {
		// Split path and check for id //
		const idSplit = path.split('/');
		return idSplit[1] !== '' ? idSplit[1] : null;
	};

	// Find a FocusBlock in the state given an ID //
	findBlockIndex = id => {
		return this.state.user.focusBlocks
			.map(block => {
				return block.id;
			})
			.indexOf(id);
	};

	// Logic to get current FocusBlocks and update array //
	updateUserBlocks = newBlocks => {
		// Get current user state //
		const currentUser = { ...this.state.user };
		currentUser.focusBlocks = newBlocks;
		return currentUser;
	};

	// Used to strip emails from each FocusBlock in array //
	blockCloner = blocks => {
		return blocks.map(block => {
			const cloneBlock = {
				...block
			};

			// Remove contact //
			cloneBlock.contact = '';
			return cloneBlock
		})

	};

	// Used to show the BlockForm to create a new FocusBlock //
	addNewBlockTrigger = () => {
		this.setState({
			isAdding: true
		});
	};

	// If there are no FocusBlocks in state, just show the BlockForm //
	showBlockForm = () => {
		return this.state.user.focusBlocks.length === 0;
	};

	render() {
		// Google Analytics //
		ReactGA.initialize('UA-90746218-3');
		ReactGA.pageview(window.location.pathname);

		// This obj is used to trigger the events on this component from other components //
		const triggerObj = {
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
								{this.state.isAdding ? <BlockForm triggers={triggerObj} /> : ''}
							</div>
						)}
				</div>
				<AddBlockButton
					blockCount={this.state.user.focusBlocks.length}
					addBlockTrigger={this.addNewBlockTrigger}
				/>
			</Fragment>
		);
	}
}

export default Dashboard;
