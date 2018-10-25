import React, { Component } from 'react';
import NewBlockForm from '../NewBlockForm/NewBlockForm'
import ActiveBlock from '../ActiveBlock/ActiveBlock';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      title: 'New Task',
      isAltLogoColor: false,
      wrapperClass: '',
      currentBlock: null
    };
  }

  formSubmitHandler = (block) => {
    this.setState({currentBlock: block});
  }

  appearanceChangeHandler = (title, isAltLogoColor, isRedOutline, isPopup, isFinished) => {
    let wrapperClass = '';
    if (isRedOutline) {
      wrapperClass = 'app-wrapper--times-up';
    } else if (isPopup) {
      wrapperClass = 'app-wrapper--popup'
    } else if (isFinished) {
      wrapperClass = 'app-wrapper--finished'
    }
    this.setState({
      title: title,
      isAltLogoColor: isAltLogoColor,
      wrapperClass: wrapperClass
    });
  }

  blockEndHandler = () => {
    this.setState({
      title: 'New Task',
      isAltLogoColor: false,
      wrapperClass: '',
      currentBlock: null
    });
  }
  
  render() {
    return(
      <div className={'app-wrapper ' + this.state.wrapperClass}>
        <div className="app-header">
          <div className="app-header__logo">
            <img 
              src={this.state.isAltLogoColor ? 
              require("../../Assets/focusblock-logo-blue.svg")
              : require("../../Assets/focusblock-logo-red.svg")} 
              alt="" />
          </div>
          {this.state.title && <div className="app-header__title">{this.state.title}</div>}
        </div>
        {this.state.currentBlock ? (
          <ActiveBlock 
            block={this.state.currentBlock}
            changedAppearance={this.appearanceChangeHandler}
            ended={this.blockEndHandler} />
        ) : (
          <NewBlockForm 
            submitted={this.formSubmitHandler} />
        )}
      </div>
    );
  }
}

export default App;