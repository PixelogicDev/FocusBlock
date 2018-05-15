import React, { Component } from 'react';
import './styles.css';

class TimeBlock extends Component {
	constructor(props) {
		super(props);
		/*
			Id
			Title
			Timer
		*/
		this.state = {
			id: this.uuid(),
			title: this.props.block.title,
			timer: this.props.block.timer
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
					<h2>{this.state.timer}</h2>
				</div>
				<button className="block-start" onClick={this.startBlock}>
					Focus Time!
				</button>
			</div>
		);
	}
}

export default TimeBlock;
