import React, { Component, Fragment } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import About from './Components/About/About';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dashboardPath: ''
		};
	}

	//-- MAD PROPS HiDeoo -- //
	static getDerivedStateFromProps(props, state) {
		let pathname = props.history.location.pathname.split('/');
		let joined = '';

		if (pathname.length === 3 && state.dashboardPath === '') {
			joined = pathname.join('/');
			return { dashboardPath: joined };
		}

		return null;
	}

	//-- Helpers --//
	getPath = () => {
		let pathname = this.props.history.location.pathname;

		if (pathname === '/about') {
			// Get about ref and grab dashPath url //
			if (this.aboutRef.props.dashPath !== '') {
				this.props.history.push(this.aboutRef.props.dashPath);
			} else {
				this.props.history.push('/dashboard');
			}
		}

		if (pathname === '/dashboard') {
			if (this.state.dashboardPath !== '') {
				this.props.history.push(this.state.dashboardPath);
			} else {
				this.props.history.push('/dashboard');
			}
		}
	};

	render() {
		return (
			<Fragment>
				<div className="nav">
					<div className="title">FocusBlock</div>
					<div className="nav-options">
						<ul>
							<a onClick={this.getPath}>Dashboard</a>
							<Link to="/about">About</Link>
						</ul>
					</div>
				</div>
				<div className="content">
					<Switch>
						<Route exact path="/" component={About} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/dashboard/:id" component={Dashboard} />
						<Route
							path="/about"
							component={About}
							dashPath={this.state.dashboardPath}
							ref={ref => (this.aboutRef = ref)}
						/>
					</Switch>
				</div>
			</Fragment>
		);
	}
}

export default withRouter(App);
