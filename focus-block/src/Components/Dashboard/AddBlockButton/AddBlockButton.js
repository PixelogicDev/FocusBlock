import React, { Component } from 'react';
import './styles.css';

class AddBlockButton extends Component {
	render() {
		return (
			<img
				onClick={this.props.addBlockTrigger}
				//-- MAD PROPS Tendencydriven --//
				src={require('../../../Assets/cmjio-button@2x.png')}
				alt="Add Focus Block Button"
			/>
		);
	}
}

export default AddBlockButton;
