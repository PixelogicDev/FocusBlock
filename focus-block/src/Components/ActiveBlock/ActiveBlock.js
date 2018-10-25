import React, { Component, Fragment } from 'react';
import Email from '../../Containers/SmtpContainer';
import Input from '../Input/Input';

class ActiveBlock extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: props.block.name,
      timeLimit: props.block.timeLimit,
      helpEmail: props.block.helpEmail,
			secondsLeft: props.block.timeLimit * 60,
			taskTime: null,
      timerIsActive: true,
      timerStatus: 'Now Focusing',
			isAltLogoColor: true,
			isRedOutline: false,
			timeLeft: null,
			timerIntervalRef: null,
			isEditEmailOpen: false,
			isQuitConfirmationOpen: false,
			isTaskCompletedOpen: false,
			isEmailSentOpen: false,
			helpEmailValue: props.block.helpEmail,
      helpEmailIsValid: true,
      helpEmailErrorShown: false,
      helpEmailErrorMessage: 'This is not a valid email address'
		};
	}

	componentDidMount() {
		this.props.changedAppearance(this.state.timerStatus, this.state.isAltLogoColor, this.state.isRedOutline, false, false);
		this.formatTimeLeft();
		this.setState({
			timerIntervalRef: this.createTimerInterval()
		});
	}

	strPadLeft = (string, pad, length) => {
		return (new Array(length+1).join(pad)+string).slice(-length);
	}

	formatTimeLeft = () => {
		let secondsLeft = this.state.secondsLeft;
		let minutes = Math.floor(secondsLeft / 60);
		let seconds = secondsLeft - minutes * 60;
		let formattedMinutes;
		if (minutes < 100) {
			formattedMinutes = this.strPadLeft(minutes, '0', 2);
		} else {
			formattedMinutes = minutes;
		}
		let formattedTime = formattedMinutes + ':' + this.strPadLeft(seconds, '0', 2);
		this.setState({
			timeLeft: formattedTime
		});
	}

	timerTick = () => {
		let secondsLeft = this.state.secondsLeft - 1;
		let timerIsActive;
		let timerStatus;
		let isAltLogoColor;
		let isRedOutline;
		if (secondsLeft === 0) {
			timerIsActive = false;
			timerStatus = 'Time\'s Up!';
			isAltLogoColor = false;
			isRedOutline = true;
			clearInterval(this.state.timerIntervalRef);
		} else {
			timerIsActive = true;
			timerStatus = 'Now Focusing';
			isAltLogoColor = true;
			isRedOutline = false;
		}
		this.setState({
			secondsLeft: secondsLeft,
			timerIsActive: timerIsActive,
			timerStatus: timerStatus,
			isAltLogoColor: isAltLogoColor,
			isRedOutline: isRedOutline
		});
		if (!this.state.isEditEmailOpen) {
			this.props.changedAppearance(timerStatus, isAltLogoColor, isRedOutline, false, false);
			this.formatTimeLeft();
		}
	}

	createTimerInterval = () => {
		this.timerTick();
		return setInterval(() => this.timerTick(), 1000);
	}

	pauseTimer = () => {
		clearInterval(this.state.timerIntervalRef);
		let timerIsActive = false;
		let timerStatus = 'On Pause';
		let isAltLogoColor = false;
		this.setState({
			timerIsActive: timerIsActive,
			timerStatus: timerStatus,
			isAltLogoColor: isAltLogoColor
		});
		this.props.changedAppearance(timerStatus, isAltLogoColor, this.state.isRedOutline, false, false);
	}

	resumeTimer = () => {
		this.setState({
			timerIntervalRef: this.createTimerInterval()
		});
	}

	// This function is not used in this version
	restartTimer = () => {
		let secondsLeft = this.state.timeLimit * 60;
		this.setState({
			secondsLeft: secondsLeft,
			timerIntervalRef: this.createTimerInterval()
		});
	}

	openEditEmail = () => {
		this.setState({
			isEditEmailOpen: true
		});
		this.props.changedAppearance('Edit Email', false, false, true, false);
	}

	closeEditEmail = () => {
		this.setState({
			isEditEmailOpen: false
		});
		this.props.changedAppearance(this.state.timerStatus, this.state.isAltLogoColor, this.state.isRedOutline, false, false);
		this.formatTimeLeft();
	}

	saveEditEmail = () => {
		if (this.state.helpEmailIsValid) {
			this.setState({
				helpEmail: this.state.helpEmailValue
			});
			this.closeEditEmail();
		} else {
			this.setState({
				helpEmailErrorShown: true
			});
		}
	}

	dontSaveEditEmail = () => {
		this.setState({
			helpEmailValue: this.state.helpEmail,
      helpEmailIsValid: true,
			helpEmailErrorShown: false
		});
		this.closeEditEmail();
	}

	helpEmailChangeHandler = (event) => {
    let helpEmailValue = event.target.value;
    let validContact = helpEmailValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let helpEmailIsValid = helpEmailValue === '' || validContact;
    this.setState({
      helpEmailValue: helpEmailValue,
      helpEmailIsValid: helpEmailIsValid
    });
  }

  helpEmailBlurHandler = () => {
    this.setState({
      helpEmailErrorShown: !this.state.helpEmailIsValid
    });
	}

	openQuitConfirmation = () => {
		this.setState({
			isQuitConfirmationOpen: true
		});
		this.props.changedAppearance('', false, false, true, false);
	}

	closeQuitConfirmation = () => {
		this.setState({
			isQuitConfirmationOpen: false
		});
		this.props.changedAppearance(this.state.timerStatus, this.state.isAltLogoColor, this.state.isRedOutline, false, false);
	}

	openTaskCompleted = () => {
		this.pauseTimer();
		let timeLimitInSeconds = this.state.timeLimit * 60;
		let secondsLeft = this.state.secondsLeft;
		let taskTimeInSeconds = timeLimitInSeconds - secondsLeft;
		let taskTime = Math.floor(taskTimeInSeconds / 60);
		this.setState({
			taskTime: taskTime,
			isTaskCompletedOpen: true
		});
		this.props.changedAppearance('', false, false, false, true);
	}

	openEmailSent = () => {
		this.sendEmail();

		this.setState({
			isEmailSentOpen: true
		});
		this.props.changedAppearance('', false, false, false, true);
	}

	sendEmail = () => {
		let mailer = new Email();
		let sender = 'support@pixelogicapps.com';
		let subject = `Requesting Help: ${this.state.name}`;
		let body = `
			Hi from Pixelogic Support!

			Looks like someone is requesting your help with task “${this.state.name}”

			Brought to you by <a href="https://focusblock.stream">FocusBlock</a>
		`;
		let server = 'smtp.sendgrid.net';

		mailer.send(
			sender,
			this.state.helpEmail,
			subject,
			body,
			server,
			process.env.REACT_APP_SMTP_USERNAME,
			process.env.REACT_APP_SMTP_PW
		);
	};

	render() {

		return (
			(this.state.isEditEmailOpen ? (
				<div className="app-form">
					<Input
            id="help_email"
            name="help_email"
            type="email"
						label="“Send help” Email"
						sublabel="you can leave this field empty"
            placeholder="i.e. name@company.com"
            hint="We will email this person asking to help you in case you don't finish the task in time."
            value={this.state.helpEmailValue}
            changed={this.helpEmailChangeHandler}
            blurred={this.helpEmailBlurHandler}
            hasError={this.state.helpEmailErrorShown}
            errorMessage={this.state.helpEmailErrorMessage} />
					<div className="app-form__actions">
						<button className="btn btn--primary" onClick={this.saveEditEmail}>Save</button>
						<button className="btn btn--secondary" onClick={this.dontSaveEditEmail}>Don't save</button>
					</div>
				</div>
			) : this.state.isQuitConfirmationOpen ? (
				<div className="app-form">
      		<div className="app-form__message">Are you sure you want to end current task and start a new one?</div>
      		<div className="app-form__actions">
        		<button className="btn btn--primary" onClick={this.props.ended}>End task</button>
        		<button className="btn btn--secondary" onClick={this.closeQuitConfirmation}>Go back</button>
      		</div>
    		</div>
			) : this.state.isTaskCompletedOpen ? (
				<div className="app-form">
      		<div className="app-form__header ">Good Job!</div>
      		<div className="app-form__message">You've finished “{this.state.name}” in&nbsp;{this.state.taskTime}&nbsp;minutes.</div>
      		<div className="app-form__actions">
        		<button className="btn btn--primary" onClick={this.props.ended}>Start another task</button>
      		</div>
    		</div>
			) : this.state.isEmailSentOpen ? (
				<div className="app-form">
      		<div className="app-form__header ">Backup is on it's way</div>
      		<div className="app-form__message">We've notified {this.state.helpEmail}.</div>
      		<div className="app-form__actions">
        		<button className="btn btn--primary" onClick={this.props.ended}>Start another task</button>
      		</div>
    		</div>
			) : (
				<div className="app-focusing">
					<div className={
						(this.state.isAltLogoColor ?
							'app-focusing-field app-focusing-field--time app-focusing-field--blue'
							: 'app-focusing-field app-focusing-field--time')
					}>
        		<div className="app-focusing-field__label">Time Left</div>
						<div className="app-focusing-field__value">{this.state.timeLeft}</div>
    			</div>
      		<div className="app-focusing-field">
        		<div className="app-focusing-field__label">Task</div>
        		<div className="app-focusing-field__value">{this.state.name}</div>
      		</div>
      		<div className="app-focusing-field">
        		<div className="app-focusing-field__label">Backup person</div>
        		<div className="app-focusing-field__value">
							{this.state.helpEmail === '' ? 'Nobody' : this.state.helpEmail}
						</div>
        		<div className="app-focusing-field__edit" onClick={this.openEditEmail}>Edit backup email</div>
      		</div>
					<div className="app-focusing__actions">
						{this.state.secondsLeft > 0 ? (
							this.state.timerIsActive ? (
								<Fragment>
									<button className="btn btn--primary btn--primary-blue" onClick={this.openTaskCompleted}>I'm done</button>
									<button className="btn btn--secondary" onClick={this.pauseTimer}>Pause</button>
								</Fragment>
							) : (
								<Fragment>
									<button className="btn btn--secondary" onClick={this.openQuitConfirmation}>Start New Task</button>
									<button className="btn btn--primary" onClick={this.resumeTimer}>Resume</button>
								</Fragment>
							)
						) : (
							<Fragment>
								{this.state.helpEmail !== '' ? (
									<Fragment>
										<button className="btn btn--primary btn--with-hint" onClick={this.openEmailSent}>Ask for help</button>
										<div className="btn-hint">This will send an email with the task name to {this.state.helpEmail}</div>
									</Fragment>
								) : (
									<button className="btn btn--primary" onClick={this.props.ended}>New Task</button>
								)}
								<button className="btn btn--secondary" onClick={this.openTaskCompleted}>I'm actually done</button>
							</Fragment>
						)}
					</div>
				</div>
			))
		);
	}
}

export default ActiveBlock;