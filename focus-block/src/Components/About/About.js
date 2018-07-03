import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

/* 
	This component is used to display basic information about FocusBlock
	and link to Twitch & Github accounts
*/
class About extends Component {
	render() {
		return (
			<div className="container">
				<div className="header">
					<div className="title">
						<h3>FocusBlock</h3>
					</div>
					<div className="subtitle">Be The Most Productive Version Of You</div>
				</div>
				<button className="get-focused-btn">
					<Link to="/dashboard">Get Focused</Link>
				</button>
				<div className="info-blocks">
					<div className="info-block">
						<div className="info-content">
							<h3>Keep Yourself On Track</h3>
							<p>
								Sometimes we lose track of time when working on a certain task.
							</p>
							<p>
								Set the amount of time a task should take and let FocusBlock
								remind you when time is up
							</p>
						</div>
					</div>
					<div className="info-block">
						<div className="info-content">
							<h3>You Always Have Backup</h3>
							<p>
								We don’t know everything and thats okay! Recruit someone’s help
								through email.
							</p>
							<p>
								Set someones email address to connect them automatically if you
								are having trouble
							</p>
						</div>
					</div>
				</div>
				<div className="social-details">
					<div className="social-block">
						<a href="https://github.com/PixelogicDev/FocusBlock">
							<img
								className="github"
								src={require('../../Assets/github_logo.png')}
								alt="Github Logo"
							/>
						</a>
						<div className="social-text">
							<p>Fully Open Source.</p>
							<p>Contribute Today.</p>
						</div>
					</div>
					<div className="social-block">
						<a href="https://www.twitch.tv/pixelogicdev">
							<img
								className="twitch"
								src={require('../../Assets/twitch_logo.png')}
								alt="Twitch Logo"
							/>
						</a>
						<div className="social-text">
							<p>Developed Live On Twitch In 28 Days.</p>
							<p>Check Out The Highlights.</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default About;
