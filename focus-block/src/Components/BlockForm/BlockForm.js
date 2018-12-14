import React, { Component, Fragment } from 'react';
import './styles.css';

/*
	The BlockForm component is a form that is here to help you create a FocusBlock.
*/

class BlockForm extends Component {
	constructor(props) {
		super(props);

		// This component can be rendered on creation and on edit. Set state depending on scenario //
		this.state = this.constructInitialState(props);

	}

	// Construct the initial state depending on whether editing or not. //
	constructInitialState(props) {
		if (this.props.isEditing) {
			return {
				title: props.focusBlock.state.title,
				timer: props.focusBlock.state.timer,
				customTimer: props.focusBlock.state.customTimer,
				contact: props.focusBlock.state.contact,
				formErrors: { title: 'valid', timer: 'valid', contact: 'valid' },
				formValid: true
			};
		}

		return {
			title: '',
			timer: 15,
			customTimer: 15,
			contact: '',
			formErrors: { title: '', timer: 'valid', contact: 'valid' },
			formValid: false
		};
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

	// When a field is changed in the form, save to state //
	handleChange = event => {
		this.validateField(event);
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	// Return custom timer if set to custom, otherwise return normal timer //
	getTimerVal = () => {
		if (this.state.timer === 'custom') {
			return this.state.customTimer;
		}

		return this.state.timer;
	}

	// Convert the number value of the timer to a more valuable unit of time //
	getFriendlyTime = () => {
		const timerVal = this.getTimerVal()

		if (timerVal < 60) {
			return `${timerVal}m`;
		}

		return `${timerVal / 60}h`;

	};

	// Use this to create the model of a FocusBlock on sumbit with the newly added form data //
	initFocusBlock = () => {
		return {
			id: this.uuid(),
			title: this.state.title,
			timer: this.state.timer,
			customTimer: this.state.customTimer,
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

	// If editing update current FocusBlock passed in; else init new FocusBlock with form data //
	blockEvent = event => {
		if (this.props.isEditing) {
			const focusBlock = this.props.focusBlock;
			const updatedState = {
				title: this.state.title,
				timer: this.state.timer,
				customTimer: this.state.customTimer,
				friendlyTimer: this.getFriendlyTime(),
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

	// Validate form field //
	validateField = event => {
		let titleValid = this.state.formErrors.title;
		let timerValid = this.state.formErrors.timer;
		let contactValid = this.state.formErrors.contact;

		switch (event.target.name) {
			case 'title':
				const titleLen = event.target.value.length;
				titleValid = titleLen > 0 ? 'valid' : 'Title cannot be empty';
				break;
			case 'timer':
				if (event.target.value === 'custom') {
					timerValid = 'valid';
				} else {
					const timerLen = event.target.value.length;
					timerValid = timerLen > 0 ? 'valid' : 'Please select a time';
				}

				break;
			case 'contact':
				const validContact = event.target.value.match(
					/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
				);

				contactValid =
					// Email address is not required to continue //
					validContact || event.target.value === ''
						? 'valid'
						: 'This is not an email, please try again.';
				break;
			default:
				break;
		}

		this.formValid(titleValid, timerValid, contactValid);
	};

	// Check to see if entire form is valid before submitting //
	formValid = (title, timer, contact) => {
		this.setState({
			formErrors: {
				title: title,
				timer: timer,
				contact: contact
			},
			formValid: title === 'valid' && timer === 'valid' && contact === 'valid'
		});
	};

	render() {
		return (
			<Fragment>
				<div className="form-content">
					{/* Form Start */}
					<form id="blockForm" onSubmit={this.blockEvent}>
						{/* FocusBlock Title */}
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
						{/* FocusBlock Timer */}
						<label>How long do you need to focus?</label>
						<select
							id="timer"
							name="timer"
							value={this.state.timer}
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
						{/* FocusBlock Email To Contact */}
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
					{/* Form End */}
				</div>
			</Fragment>
		);
	}
}

export default BlockForm;
