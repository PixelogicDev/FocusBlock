import React, { Component, Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import About from './Components/About/About';

// Styles //
import './App.css';

class App extends Component {
	render() {
		return (
			<Fragment>
				<div className="nav">
					<div className="title">FocusBlock</div>
					<div className="nav-options">
						<ul>
							<Link to="/dashboard">Dashboard</Link>
							<Link to="/about">About</Link>
						</ul>
					</div>
				</div>
				<div className="content">
					{/*
						/ -> navigate to Dashboard component. 
							-> Check for id param in route, if not there, create new user in DB with proper URL
						
						/dashboard -> navigate to dashboard component and create new user in DB with proper URL

						/dashboard/:id -> navigate to dashboard component and check for valid id
							-> If id is not valid either show error, or create new user with valid id
					*/}
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/dashboard/:id" component={Dashboard} />
						<Route path="/about" component={About} />
					</Switch>
				</div>
			</Fragment>
		);
	}
}

export default App;
