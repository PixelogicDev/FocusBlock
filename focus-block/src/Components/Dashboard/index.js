import React, { Component, Fragment } from 'react';
import TimeBlock from '../TimeBlock/index';
import BlockForm from '../Forms/BlockForm/index';

class Dashboard extends Component {
	state = {
		focusBlocks: []
	};

	//-- Helpers --//
	createBlock = focusBlock => {
		// Get current array //
		let currentBlocks = this.state.focusBlocks;
		currentBlocks.push(focusBlock);
		this.setState({ focusBlocks: currentBlocks });
	};

	render() {
		return (
			<Fragment>
				{this.state.focusBlocks.length === 0 ? (
					<BlockForm trigger={this.createBlock} />
				) : (
					''
				)}
				<div className="blocks">
					<TimeBlock block={this.mockBlock} />
					{this.state.focusBlocks.map((block, i) => (
						<TimeBlock block={block} key={i} />
					))}
				</div>
			</Fragment>
		);
	}
}

export default Dashboard;
