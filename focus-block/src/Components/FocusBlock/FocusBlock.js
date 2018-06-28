import React, { Component, Fragment } from 'react';
import BlockForm from '../BlockForm/BlockForm';
import Email from '../../Containers/SmtpContainer';
import './styles.css';

class FocusBlock extends Component {
	constructor(props) {
		super(props);

		// New or updating //
		this.state = {
			id: props.block.id === '' ? this.uuid() : props.block.id,
			title: props.block.title,
			timer: props.block.timer,
			// MAD PROPS DigitalData (found the un-findable bug) //
			customTimer: props.block.customTimer, // Value of the custom timer input
			friendlyTimer: this.getFriendlyTime(
				props.block.timer,
				props.block.customTimer
			),
			contact: props.block.contact,
			contactVisible: false,
			blockStarted: false,
			timerRef: null,
			currentProgress: 'start',
			isEditing: false,
			inputErrors: { contact: 'valid' },
			dashboardEvents: props.events
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

	getFriendlyTime = (timer, customTimer) => {
		let friendlyTimer = '';
		let timerVal;

		if (timer === 'custom') {
			timerVal = customTimer;
		} else {
			timerVal = timer;
		}

		if (timerVal < 60) {
			friendlyTimer = `${timerVal}m`;
		} else {
			friendlyTimer = `${timerVal / 60}h`;
		}

		return friendlyTimer;
	};

	toggleBlock = () => {
		this.setState({
			blockStarted: !this.state.blockStarted,
			currentProgress: 'start'
		});

		// Start timer //
		this.toggleTimer();
	};

	sendEmail = () => {
		// Send out email //
		let mailer = new Email();
		let sender = 'support@pixelogicapps.com';
		let subject = 'Requesting Help!';
		//TODO: Figure out how to get username/name/title/etc
		let body = `FooBar is requesting your help with ${this.state.title}!`;
		let server = 'smtp.sendgrid.net';

		mailer.send(
			sender,
			this.state.contact,
			subject,
			body,
			server,
			process.env.REACT_APP_SMTP_USERNAME,
			process.env.REACT_APP_SMTP_PW
		);
	};

	createTimerInterval = () => {
		// Grab the current block minutes //
		let timerVal;

		if (this.state.timer === 'custom') {
			timerVal = this.state.customTimer;
		} else {
			timerVal = this.state.timer;
		}

		let blockTime = timerVal * 60,
			minutes,
			seconds;

		return setInterval(() => {
			// MAD PROPS https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer //
			minutes = parseInt(blockTime / 60, 10);
			seconds = parseInt(blockTime % 60, 10);

			let currentProgress = this.state.currentProgress;
			if (parseInt(timerVal / 2, 10) === minutes) {
				// Mid point //
				currentProgress = 'mid';
			}

			if (minutes === 0) {
				// End point //
				currentProgress = 'end';
			}

			let friendlyTimer = '';
			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;
			friendlyTimer = minutes + ':' + seconds;

			this.setState({
				friendlyTimer: friendlyTimer,
				currentProgress: currentProgress
			});

			if (--blockTime < 0) {
				this.setState({
					blockStarted: false,
					friendlyTimer: 'Times up!'
				});

				this.sendEmail();
				clearInterval(this.state.timerRef);
			}
		}, 1000);
	};

	toggleTimer = () => {
		if (this.state.blockStarted) {
			clearInterval(this.state.timerRef);
		} else {
			// Setup a timer on comp to count down //
			this.setState({
				timerRef: this.createTimerInterval()
			});
		}
	};

	contactBlurEvent = event => {
		let targetVal = event.target.value;
		let validContact = targetVal.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

		if (validContact || event.target.value === '') {
			this.setState({
				contact: targetVal,
				contactVisible: event.target.value === '' ? false : true,
				inputErrors: { contact: 'valid' }
			});
		} else {
			this.setState({
				inputErrors: { contact: 'Please enter a valid email.' }
			});
		}
	};

	toggleContact = event => {
		this.setState({
			contactVisible: !this.state.contactVisible
		});
	};

	toggleEdit = () => {
		this.setState({ isEditing: !this.state.isEditing });
	};

	delete = () => {
		// Trigger update on dashboard by passing comp ID //
		this.state.dashboardEvents.delete(this.state.id);
	};

	render() {
		let classNames = require('classnames');
		let classes = classNames('block', {
			start: this.state.currentProgress === 'start' && this.state.blockStarted,
			mid: this.state.currentProgress === 'mid' && this.state.blockStarted,
			end: this.state.currentProgress === 'end' && this.state.blockStarted
		});

		return (
			<Fragment>
				{this.state.isEditing ? (
					<BlockForm isEditing="true" focusBlock={this} />
				) : (
					<div id={this.state.id} className={classes}>
						<div className="block-content">
							<div className="block-title">{this.state.title}</div>
							<div className="block-time">{this.state.friendlyTimer}</div>
							<div className="block-contact">
								{this.state.contactVisible ? (
									[
										this.state.contact === '' ? (
											// MAD PROPS Lumie1337 //
											<input
												key="new_contact"
												onBlur={this.contactBlurEvent}
												placeholder="Email"
												className="contact-input"
											/>
										) : (
											<span key="current_contact" onClick={this.toggleContact}>
												{this.state.contact}
											</span>
										)
									]
								) : (
									// If contact is empty, show input field to add contact //
									<span onClick={this.toggleContact}>
										Click to show contact.
									</span>
								)}
							</div>
							{this.state.inputErrors.contact !== 'valid' ? (
								<div className="error-label">
									{this.state.inputErrors.contact}
								</div>
							) : (
								''
							)}
							<div className="focus-button">
								<button className="block-start" onClick={this.toggleBlock}>
									{this.state.blockStarted ? (
										<span>Stop Focusing</span>
									) : (
										<span>Get Focused</span>
									)}
								</button>
							</div>
							<img
								className="edit"
								onClick={this.toggleEdit}
								//-- MAD PROPS Tendencydriven --//
								src={require('../../Assets/edit-pencil@2x.png')}
								alt="Edit focus block pencil button"
							/>
							{/* <div className="delete">
								<button onClick={this.delete}>DELETE</button>
							</div> */}
						</div>
					</div>
				)}
			</Fragment>
		);
	}
}

export default FocusBlock;
