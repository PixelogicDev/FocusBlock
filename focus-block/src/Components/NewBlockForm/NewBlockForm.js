import React, { Component, Fragment } from 'react';
import Input from '../Input/Input';

class NewBlockForm extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      timeLimit: '',
      helpEmail: '',
      nameIsValid: false,
      nameErrorShown: false,
      nameErrorMessage: 'Pick a name for this task',
      timeLimitIsValid: false,
      timeLimitErrorShown: false,
      timeLimitErrorMessage: 'Set a time limit for the task',
      helpEmailIsValid: true,
      helpEmailErrorShown: false,
      helpEmailErrorMessage: 'This is not a valid email address'
    };
  }

  nameChangeHandler = (event) => {
    let nameValue = event.target.value;
    let nameIsValid = nameValue.length > 0;
    this.setState({
      name: nameValue,
      nameIsValid: nameIsValid
    });
  }

  nameBlurHandler = (event) => {
    this.setState({
      nameErrorShown: !this.state.nameIsValid
    });
  }

  timeLimitChangeHandler = (event) => {
    let timeLimitValue = event.target.value;
    let timeLimitIsValid = event.target.value > 0;
    this.setState({
      timeLimit: timeLimitValue,
      timeLimitIsValid: timeLimitIsValid
    });
  }

  timeLimitSuggestionClickedHandler = (event) => {
    let timeLimitValue = event.target.value;
    this.setState({
      timeLimit: timeLimitValue,
      timeLimitIsValid: true,
      timeLimitErrorShown: false
    });
  }

  timeLimitBlurHandler = (event) => {
    this.setState({
      timeLimitErrorShown: !this.state.timeLimitIsValid
    });
  }

  helpEmailChangeHandler = (event) => {
    let helpEmailValue = event.target.value;
    let validContact = helpEmailValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    let helpEmailIsValid = helpEmailValue === '' || validContact;
    this.setState({
      helpEmail: helpEmailValue,
      helpEmailIsValid: helpEmailIsValid
    });
  }

  helpEmailBlurHandler = (event) => {
    this.setState({
      helpEmailErrorShown: !this.state.helpEmailIsValid
    });
  }

  formSubmitHandler = (event) => {
    if (this.state.nameIsValid && this.state.timeLimitIsValid && this.state.helpEmailIsValid) {
      this.props.submitted({
        name: this.state.name,
        timeLimit: this.state.timeLimit,
        helpEmail: this.state.helpEmail
      });
    } else {
      this.setState({
        nameErrorShown: !this.state.nameIsValid,
        timeLimitErrorShown: !this.state.timeLimitIsValid,
        helpEmailErrorShown: !this.state.helpEmailIsValid
      });
    }
  }

	render() {
		return (
  		<Fragment>
				<div className="app-form">
          <Input 
            id="name" 
            name="name"
            type="text"
            label="Task Name"
            placeholder="i.e. “Fix a bug”"
            value={this.state.name}
            changed={this.nameChangeHandler}
            blurred={this.nameBlurHandler}
            hasError={this.state.nameErrorShown}
            errorMessage={this.state.nameErrorMessage} />
          <Input
            id="time_limit"
            name="time_limit"
            type="number"
            label="Time Limit"
            placeholder="30"
            units="minutes"
            suggestions={[
              {
                value: 30,
                title: '30 min'
              },
              {
                value: 45,
                title: '45 min'
              },
              {
                value: 60,
                title: '60 min'
              }
            ]}
            suggestionClicked={this.timeLimitSuggestionClickedHandler}
            value={this.state.timeLimit}
            changed={this.timeLimitChangeHandler}
            blurred={this.timeLimitBlurHandler}
            hasError={this.state.timeLimitErrorShown}
            errorMessage={this.state.timeLimitErrorMessage} />
          <Input
            id="help_email"
            name="help_email"
            type="email"
            label="“Send help” Email"
            sublabel="optional"
            placeholder="i.e. name@company.com"
            hint="We will email this person asking to help you in case you don't finish the task in time."
            value={this.state.helpEmail}
            changed={this.helpEmailChangeHandler}
            blurred={this.helpEmailBlurHandler}
            hasError={this.state.helpEmailErrorShown}
            errorMessage={this.state.helpEmailErrorMessage} />
      		<div className="app-form__actions">
        		<button className="btn btn--primary" onClick={this.formSubmitHandler}>Start Working</button>
      		</div>
				</div>
			</Fragment>
		);
	}
}

export default NewBlockForm;