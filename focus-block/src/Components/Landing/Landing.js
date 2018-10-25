import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';

class Landing extends Component {
  render() {
    ReactGA.initialize('UA-90746218-3');
    ReactGA.pageview(window.location.pathname);

    return (
      <Fragment>
        <div className="first-screen">
          <div className="first-screen__triangles">
            <div className="first-screen__triangle1"></div>
            <div className="first-screen__triangle2"></div>
            <div className="first-screen__triangle3"></div>
          </div>
          <div className="first-screen__logo">
            <img src={require("../../Assets/focusblock-logo-white.svg")} alt="" />
          </div>
          <div className="first-screen__text">
            FocusBlock helps you focus on tasks, and contacts a colleague if you're stuck.
          </div>
          <div className="first-screen__actions-container">
            <div className="first-screen__actions">
              <Link to="/app" className="btn btn--primary btn--dark-bg btn--gets-larger">Launch FocusBlock</Link>
              <button className="btn btn--secondary btn--dark-bg btn--gets-larger">Learn More</button>
            </div>
          </div>
        </div>

        <div className="info">
          <div className="info__header">Time Yourself</div>
          <div className="info__box">
            <div className="info__image">
              <picture>
                <source media="(max-width: 599px)" srcSet={require("../../Assets/clock-mobile.svg")} type="image/svg+xml" />
                <source media="(max-width: 1099px)" srcSet={require("../../Assets/clock-tablet.svg")} type="image/svg+xml" />
                <source srcSet={require("../../Assets/clock-tablet.svg")} type="image/svg+xml" />
                <img src={require("../../Assets/clock-tablet.svg")} />
              </picture>
              <div className="info__image-triangle1"></div>
              <div className="info__image-triangle2"></div>
              <div className="info__image-triangle3"></div>
              <div className="info__image-triangle4"></div>
            </div>
            <div className="info__text">
              <p>Set a timeframe for the task you're working on, and get straight to work.</p>
              <p>FocusBlock will notify you when you're out of time.</p>
            </div>
          </div>
        </div>


        <div className="info">
          <div className="info__header">Get Backup</div>
          <div className="info__box">
            <div className="info__image info__image--right">
              <picture>
                <source media="(max-width: 599px)" srcSet={require("../../Assets/keyboard-mobile.svg")} type="image/svg+xml" />
                <source media="(max-width: 1099px)" srcSet={require("../../Assets/keyboard-tablet.svg")} type="image/svg+xml" />
                <source srcSet={require("../../Assets/keyboard-tablet.svg")} type="image/svg+xml" />
                <img src={require("../../Assets/keyboard-tablet.svg")} />
              </picture>
              <div className="info__image-triangle1"></div>
              <div className="info__image-triangle2"></div>
              <div className="info__image-triangle3"></div>
              <div className="info__image-triangle4"></div>
            </div>
            <div className="info__text info__text--left">
              <p>We don’t know everything and that's okay! Recruit someone’s help through email.</p>
              <p>Set someone's email address to connect them automatically if you are
              having trouble.</p>
            </div>
          </div>
        </div>

        <div className="landing-cta">
          <Link to="/app" className="btn btn--primary btn--gets-larger">Launch FocusBlock</Link>
        </div>

        <div className="footer">
          <div className="footer-section">
            <div className="footer-section__icon">
              <img src={require("../../Assets/github.svg")} />
            </div>
            <div className="footer-section__text">
              <p>FocusBlock is fully open source.</p>
              <p><a href="https://github.com/PixelogicDev/FocusBlock" className="link link--white">Contribute today!</a></p>
            </div>
          </div>
          <div className="footer-section">
            <div className="footer-section__icon">
              <img src={require("../../Assets/twitch.svg")} />
            </div>
            <div className="footer-section__text">
              <p>Developed live on Twitch in 28 days.</p>
              <p><a href="https://www.twitch.tv/pixelogicdev" className="link link--white">Check the highlights!</a></p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Landing;