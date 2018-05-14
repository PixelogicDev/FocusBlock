import React, { Component } from 'react';
import './styles.css';

class TimeBlock extends Component {
	startBlock() {
		console.log('Block is starting!!!');
	}

	render() {
		return (
			<div className="block">
				<div className="block-title">
					<h1>{this.props.blockTitle}</h1>
				</div>
				<div className="block-time">
					<h2>30:00m</h2>
				</div>
				<button className="block-start" onClick={this.startBlock}>
					Focus Time!
				</button>
			</div>
		);
	}
}

export default TimeBlock;
