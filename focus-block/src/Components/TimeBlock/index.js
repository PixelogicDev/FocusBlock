import React, { Component } from 'react';

// Styles //
import './styles.css';

class TimeBlock extends Component {
	// React Times bindings //

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
			id: this.uuid(),
			title: this.props.block.title,
			timer: this.props.block.timer,
			friendlyTimer: friendlyTimer,
			contact: this.props.block.contact
		};

		console.log(this.state);
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

	startBlock() {
		console.log('Block is starting!!!');
	}

	render() {
		return (
			<div className="block">
				<div className="block-title">
					<h1>{this.state.title}</h1>
				</div>
				<div className="block-time">
					<h2>{this.state.friendlyTimer}</h2>
				</div>
				<div className="block-contact">
					<h2>{this.state.contact}</h2>
				</div>
				<button className="block-start" onClick={this.startBlock}>
					Focus Time!
				</button>
			</div>
		);
	}
}

export default TimeBlock;
