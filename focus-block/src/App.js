import React, { Component, Fragment } from 'react';
import Dashboard from './Components/Dashboard/index';

// Styles //
import './App.css';

class App extends Component {
	render() {
		return (
			<Fragment>
				<div className="nav">
					<h1>FocusBlock</h1>
				</div>
				<div className="content">
					<Dashboard />
				</div>
			</Fragment>
		);
	}
}

export default App;
