import React, { Component } from 'react';
import './styles.css';

class BlockForm extends Component {
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

	state = {
		title: '',
		timer: ''
	};

	handleChange = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	createBlock = event => {
		console.log('Creating block...');
		this.props.trigger(this.state);
		this.setState({ title: '', timer: '' });
		event.preventDefault();
	};

	render() {
		return (
			<form onSubmit={this.createBlock}>
				<label>
					Focus Title:
					<input
						name="title"
						type="text"
						value={this.state.title}
						onChange={this.handleChange}
					/>
				</label>
				<label>
					Focus Time:
					<input
						name="timer"
						type="text"
						value={this.state.timer}
						onChange={this.handleChange}
					/>
				</label>
				<input type="submit" value="Submit" />
			</form>
		);
	}
}

export default BlockForm;
