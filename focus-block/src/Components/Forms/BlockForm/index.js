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
		timer: '15',
		contact: ''
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
				<label>What are you focusing on?</label>
				<input
					name="title"
					placeholder="Title"
					type="text"
					value={this.state.title}
					onChange={this.handleChange}
				/>
				<label>How long do you need to focus?</label>
				<select name="timer" onChange={this.handleChange}>
					<option value="15">15m</option>
					<option value="30">30m</option>
					<option value="45">45m</option>
					<option value="60">1h</option>
				</select>
				<label>Who should be contacted when time is up?</label>
				<input
					name="contact"
					placeholder="Email"
					type="text"
					value={this.state.contact}
					onChange={this.handleChange}
				/>
				<button type="submit">Create</button>
			</form>
		);
	}
}

export default BlockForm;
