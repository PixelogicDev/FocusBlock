import React, { Component, Fragment } from 'react';
import BlockForm from '../Forms/BlockForm/index';
import Email from '../../Containers/SmtpContainer';

// Styles //
import './styles.css';

class TimeBlock extends Component {
	state = {
		id: '',
		title: '',
		timer: 0,
		customTimer: 0,
		friendlyTimer: '',
		contact: '',
		contactShown: false,
		blockStarted: false,
		timerRef: null,
		currentProgress: '',
		isEdit: false,
		inputErrors: { contact: 'valid' },
		triggers: {}
		// didFinishTransition: false
	};

	constructor(props) {
		super(props);

		// Timer logic //
		let friendlyTimer = this.getFriendlyTime(this.props.block);

		this.state = {
			id: this.uuid(),
			title: this.props.block.title,
			timer: this.props.block.timer,
			// MAD PROPS DigitalData (found the un-findable bug) //
			customTimer: this.props.block.customTimer,
			friendlyTimer: friendlyTimer,
			contact: this.props.block.contact,
			contactShown: false,
			blockStarted: false,
			timerRef: null,
			currentProgress: 'start',
			isEdit: false,
			inputErrors: { contact: 'valid' },
			triggers: this.props.triggers
			// didFinishTransition: false
		};
	}

	/* componentDidMount() {
		// Set event listener on transition //
		let block = document.getElementById(this.state.id);

		block.addEventListener('transitionend', event => {
			console.log('listener hit');
			this.setState({
				didFinishTransition: true
			});
		});
	} */

	//-- Helpers --//
	getFriendlyTime = block => {
		let friendlyTimer = '';
		let timerVal;

		if (block.timer === 'custom') {
			timerVal = block.customTimer;
		} else {
			timerVal = block.timer;
		}

		if (timerVal < 60) {
			friendlyTimer = `${timerVal}m`;
		} else {
			friendlyTimer = `${timerVal / 60}h`;
		}

		return friendlyTimer;
	};

	// MAD PROPS: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523 //
	uuid() {
		return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
			(
				c ^
				(crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
			).toString(16)
		);
	}

	startBlock = () => {
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
		let sender = 'support@pixelogocapps.com';
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

	toggleTimer = () => {
		if (this.state.blockStarted) {
			clearInterval(this.state.timerRef);
		} else {
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

			// Setup a timer on comp to count down //
			this.setState({
				timerRef: setInterval(() => {
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
				}, 1000)
			});
		}
	};

	contactBlur = event => {
		let targetVal = event.target.value;
		let validContact = targetVal.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

		if (validContact) {
			this.setState({
				contact: targetVal,
				contactShown: true,
				inputErrors: { contact: 'valid' }
			});
		} else {
			this.setState({
				inputErrors: { contact: 'Please enter a valid email.' }
			});
		}
	};

	showHideContact = event => {
		this.setState({
			contactShown: !this.state.contactShown
		});
	};

	editBlock = () => {
		console.log('Starting edit...');

		this.setState({ isEdit: !this.state.isEdit });
	};

	render() {
		const classNames = require('classnames');

		let classes = classNames('block', {
			start: this.state.currentProgress === 'start' && this.state.blockStarted,
			mid: this.state.currentProgress === 'mid' && this.state.blockStarted,
			end: this.state.currentProgress === 'end' && this.state.blockStarted
			// transition: !this.state.didFinishTransition
		});

		return (
			<Fragment>
				{this.state.isEdit ? (
					<BlockForm
						triggers={this.state.triggers}
						isEdit="true"
						focusBlock={this.state}
					/>
				) : (
					<div id={this.state.id} className={classes}>
						<div className="block-content">
							<div className="block-title">{this.state.title}</div>
							<div className="block-time">{this.state.friendlyTimer}</div>
							<div className="block-contact">
								{this.state.contactShown ? (
									[
										this.state.contact === '' ? (
											// MAD PROPS Lumie1337 //
											<input
												key="new_contact"
												onBlur={this.contactBlur}
												placeholder="Email"
												className="contact-input"
											/>
										) : (
											<span
												key="current_contact"
												onClick={this.showHideContact}
											>
												{this.state.contact}
											</span>
										)
									]
								) : (
									// If contact is empty, show input field to add contact //
									<span onClick={this.showHideContact}>
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
								<button className="block-start" onClick={this.startBlock}>
									{this.state.blockStarted ? (
										<span>Stop Focusing</span>
									) : (
										<span>Get Focused</span>
									)}
								</button>
							</div>
							<div className="edit">
								<button onClick={this.editBlock}>EDIT</button>
							</div>
						</div>
					</div>
				)}
			</Fragment>
		);
	}
}

export default TimeBlock;
