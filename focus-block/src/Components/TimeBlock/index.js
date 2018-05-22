import React, { Component } from 'react';

// Styles //
import './styles.css';

class TimeBlock extends Component {
	state = {
		id: this.uuid(),
		title: '',
		timer: 0,
		friendlyTimer: '',
		contact: '',
		contactShown: false,
		blockStarted: false,
		timerRef: null
	};

	constructor(props) {
		super(props);

		// Timer logic //
		let friendlyTimer;
		if (props.block.timer < 60) {
			friendlyTimer = `${props.block.timer}m`;
		} else {
			friendlyTimer = `${props.block.timer / 60}h`;
		}

		this.state = {
			title: this.props.block.title,
			timer: this.props.block.timer,
			friendlyTimer: friendlyTimer,
			contact: this.props.block.contact,
			contactShown: false
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

	startBlock = event => {
		this.setState({
			blockStarted: !this.state.blockStarted
		});

		// Start timer //
		this.toggleTimer();
	};

	toggleTimer = () => {
		if (this.state.blockStarted) {
			clearInterval(this.state.timerRef);
		} else {
			// Grab the current block minutes //
			let blockTime = this.state.timer * 60,
				minutes,
				seconds;

			// Setup a timer on comp to count down //
			this.setState({
				timerRef: setInterval(() => {
					// MAD PROPS https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer //
					let minutes = parseInt(blockTime / 60, 10);
					let seconds = parseInt(blockTime % 60, 10);
					let friendlyTimer = '';

					minutes = minutes < 10 ? '0' + minutes : minutes;
					seconds = seconds < 10 ? '0' + seconds : seconds;
					friendlyTimer = minutes + ':' + seconds;

					this.setState({
						friendlyTimer: friendlyTimer
					});

					if (--blockTime < 0) {
						// Send out email to contact //
						this.setState({
							friendlyTimer: 'Times up!'
						});
						clearInterval(this.state.timerRef);
					}
				}, 1000)
			});
		}
	};

	showHideContact = () => {
		// Check to see if contact is shown //
		this.setState({
			contactShown: !this.state.contactShown
		});
	};

	render() {
		return (
			<div className="block">
				<div className="content">
					<div className="block-title">{this.state.title}</div>
					<div className="block-time">{this.state.friendlyTimer}</div>
					<div className="block-contact" onClick={this.showHideContact}>
						{this.state.contactShown ? (
							<span>{this.state.contact}</span>
						) : (
							<span>Click to show contact.</span>
						)}
					</div>
					<div className="focus-button">
						<button className="block-start" onClick={this.startBlock}>
							{this.state.blockStarted ? (
								<span>Stop Focusing</span>
							) : (
								<span>Get Focused</span>
							)}
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default TimeBlock;
