import React, { Component } from 'react';
import './styles.css';

class BlockForm extends Component {
	constructor(props) {
		super(props);

		let currentState;
		if (this.props.isEditing) {
			currentState = {
				title: props.focusBlock.state.title,
				timer: props.focusBlock.state.timer,
				contact: props.focusBlock.state.contact,
				formErrors: { title: 'valid', timer: 'valid', contact: 'valid' },
				formValid: true
			};
			// this.setTimeSelect(this.state.focusBlock.timer);
		} else {
			// Creates a new focusBlock //
			currentState = {
				title: '',
				timer: '',
				contact: '',
				formErrors: { title: '', timer: 'valid', contact: '' },
				formValid: false
			};
		}

		this.state = currentState;
	}

	//-- Helpers --//
	// MAD PROPS: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523 //
	uuid() {
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
			(
				c ^
				(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
			).toString(16)
		);
	}

	handleChange = event => {
		this.validateField(event);
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	getFriendlyTime = () => {
		let friendlyTimer = '';
		let timerVal;

		if (this.state.timer === 'custom') {
			timerVal = this.state.customTimer;
		} else {
			timerVal = this.state.timer;
		}

		if (timerVal < 60) {
			friendlyTimer = `${timerVal}m`;
		} else {
			friendlyTimer = `${timerVal / 60}h`;
		}

		return friendlyTimer;
	};

	initFocusBlock = () => {
		// Create initial FocusBlock data object //
		return {
			id: this.uuid(),
			title: this.state.title,
			timer: this.state.timer,
			customTimer: 15,
			friendlyTimer: this.getFriendlyTime(),
			contact: this.state.contact,
			contactVisible: false,
			blockStarted: false,
			timerRef: null,
			currentProgress: 'start',
			isEditing: false,
			inputErrors: { contact: 'valid' },
			dashboardEvents: this.props.triggers
		};
	};

	blockEvent = event => {
		if (this.props.isEditing) {
			console.log('Updating block...');
			let focusBlock = this.props.focusBlock;
			let updatedState = {
				title: this.state.title,
				timer: this.state.timer,
				contact: this.state.contact,
				isEditing: false
			};

			//-- MAD PROPS Empty_place --//
			focusBlock.setState({ ...updatedState }, () => {
				focusBlock.state.dashboardEvents.update(focusBlock.state);
			});
		} else {
			console.log('Creating block...');
			// Access dashboard component & send block //
			this.props.triggers.create(this.initFocusBlock());
		}

		event.preventDefault();
	};
	//-- Helpers --//
	validateField = event => {
		let titleValid = this.state.formErrors.title;
		let timerValid = this.state.formErrors.timer;
		let contactValid = this.state.formErrors.contact;

		switch (event.target.name) {
			case 'title':
				let titleLen = event.target.value.length;
				titleValid = titleLen > 0 ? 'valid' : 'Title cannot be empty';
				break;
			case 'timer':
				if (event.target.value === 'custom') {
					timerValid = 'valid';
				} else {
					let timerLen = event.target.value.length;
					timerValid = timerLen > 0 ? 'valid' : 'Please select a time';
				}

				break;
			case 'contact':
				let validContact = event.target.value.match(
					/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
				);

				contactValid =
					validContact || event.target.value === ''
						? 'valid'
						: 'This is not an email, please try again.';
				break;
			default:
				break;
		}

		this.formValid(titleValid, timerValid, contactValid);
	};

	formValid = (title, timer, contact) => {
		let isFormValid = false;
		if (title === 'valid' && timer === 'valid' && contact === 'valid') {
			isFormValid = true;
		}

		this.setState({
			formErrors: {
				title: title,
				timer: timer,
				contact: contact
			},
			formValid: isFormValid
		});
	};

	// TODO: Fix this up with refs, the proper way //
	/* setTimeSelect = currentTimeVal => {
		// Create array of options to loop through //
		let selectOptions = document.getElementById('timer').options;

		console.log(selectOptions);

		// Check for the value in the array //
		for (let i in selectOptions) {
			if (currentTimeVal === parseInt(selectOptions[i].value, 10)) {
				console.log(selectOptions[i].value);
			}
		}

		// If not in the array, set to custom //
	}; */

	render() {
		return (
			<form id="blockForm" onSubmit={this.blockEvent}>
				<label>What are you focusing on?</label>
				<input
					name="title"
					placeholder="Title"
					type="text"
					value={this.state.title}
					onChange={this.handleChange}
				/>
				{this.state.formErrors.title !== 'valid' ? (
					<div className="error-label">{this.state.formErrors.title}</div>
				) : (
					''
				)}
				<label>How long do you need to focus?</label>
				<select
					id="timer"
					name="timer"
					// ref={ref => (this.timerNode = ref)}
					onChange={this.handleChange}
				>
					<option value="15">15m</option>
					<option value="30">30m</option>
					<option value="45">45m</option>
					<option value="60">1h</option>
					<option value="custom">Custom</option>
				</select>
				{this.state.timer === 'custom' ? (
					<input
						name="customTimer"
						placeholder="Time in mins"
						type="number"
						value={this.state.customTimer}
						onChange={this.handleChange}
					/>
				) : (
					''
				)}
				{this.state.formErrors.timer !== 'valid' ? (
					<div className="error-label">{this.state.formErrors.timer}</div>
				) : (
					''
				)}
				<label>Who should be contacted when time is up?</label>
				<input
					name="contact"
					placeholder="Email"
					type="text"
					value={this.state.contact}
					onChange={this.handleChange}
				/>
				{this.state.formErrors.contact !== 'valid' ? (
					<div className="error-label">{this.state.formErrors.contact}</div>
				) : (
					''
				)}

				{this.props.isEditing ? (
					<div className="action-buttons">
						<button
							className="action-delete"
							onClick={() => this.props.focusBlock.delete()}
						>
							<img
								src={require('../../Assets/delete-trash@2x.png')}
								alt="Delete focus block trash can button"
							/>
						</button>
						<button
							className="action-cancel"
							onClick={() =>
								this.props.focusBlock.setState({
									isEditing: false
								})
							}
						>
							Cancel
						</button>
						<button disabled={!this.state.formValid} type="submit">
							Update
						</button>
					</div>
				) : (
					<button disabled={!this.state.formValid} type="submit">
						Create
					</button>
				)}
			</form>
		);
	}
}

export default BlockForm;
