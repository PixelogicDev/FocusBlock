import React, { Component, Fragment } from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import About from './Components/About/About';
import './App.css';

/* 
	This is the main component where all other child components render in.
*/

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dashboardPath: ''
		};
	}

	// Need this to check to see if there is a current id in URL. We need to save the path to navigate
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

	// Get current dashboard path to bring user back to their current FocusBlocks //
	getPath = () => {
		let pathname = this.props.history.location.pathname;

		switch (pathname) {
			case '/about':
				// Get About comp ref and grab dashPath url //
				if (this.aboutRef.props.dashPath !== '') {
					this.props.history.push(this.aboutRef.props.dashPath);
				} else {
					this.props.history.push('/dashboard');
				}
				break;
			case '/dashbaord':
				if (this.state.dashboardPath !== '') {
					this.props.history.push(this.state.dashboardPath);
				} else {
					this.props.history.push('/dashboard');
				}
				break;
			default:
				this.props.history.push('/dashboard');
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
