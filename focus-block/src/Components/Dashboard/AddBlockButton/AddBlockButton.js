import React, { Component } from 'react';
import './styles.css';

class AddBlockButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			didClick: false
		};
	}

	//-- Helpers -- //
	addBlock = () => {
		// Set didClick state //
		this.setState({
			didClick: true
		});

		// Trigger addBlock event //
		this.props.addBlockTrigger();

		// Set State back after animation //
		setTimeout(() => {
			this.setState({
				didClick: false
			});
		}, 100);
	};

	render() {
		return (
			<img
				className={this.state.didClick ? 'action-add scale' : 'action-add'}
				onClick={this.addBlock}
				//-- MAD PROPS Tendencydriven --//
				src={require('../../../Assets/cmjio-button@2x.png')}
				alt="Add Focus Block Button"
			/>
		);
	}
}

export default AddBlockButton;
