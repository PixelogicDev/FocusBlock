import React, { Component } from 'react';
import TimeBlock from '../TimeBlock/index';

class Dashboard extends Component {
	render() {
		/* 
			Setup some UI to generate block components
			Each block component will need:
				Id
				Title
				Timer
		*/

		return <TimeBlock blockTitle="SomeNewTitle" />;
	}
}

export default Dashboard;
