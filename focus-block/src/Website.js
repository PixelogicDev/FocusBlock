import React, { Component, Fragment } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Landing from './Components/Landing/Landing';
import App from './Components/App/App';

class Website extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/app" component={App} />
				</Switch>
			</Fragment>
		);
	}
}

export default withRouter(Website);