import React from 'react';
import { Link } from 'react-router';
import { NavLink, IndexLink } from 'react-router-dom';
// import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
// css
import './App.less';

// components..
import NavMenu from '../components/NavMenu'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    $(document)
      .ready(function() {
        // create sidebar and attach to menu open
        $('.ui.sidebar')
          .sidebar('attach events', '.toc.item');
      });
  }

  componentWillUnmount() {
    $('.ui.sidebar').remove();
  }

  render() {

    return (
      <span>
        <div className="ui vertical basic segment menu-segment">
            <div className="ui container">
                <nav className="ui large inverted borderless menu">
                    {/*<Link className="item" to="/">Home</Link>
                        <Link className="item" to="/about">About</Link>
                        <Link className="item" to="/search">Search</Link>
                        <Link className="item" to="/contact">Contact</Link>*/}
                    <a id="mini-title" className="toc item">
                                islamiccharities.org.uk
                            </a>
                    <a id="burger" className="toc right item">
                        <i className="white sidebar big icon"></i>
                    </a>
                </nav>
            </div>
        </div>
        {this.props.children}
        <div className="ui inverted vertical footer segment">
            <div className="ui container">
                <div className="ui stackable inverted divided equal height stackable grid">
                    <div className="three wide column">
                        <h4 className="ui inverted header">🌙</h4>
                        <div className="ui inverted link list">
                            <Link className="item" to="/">Home</Link>
                            <Link className="item" to="/about">About</Link>
                            <Link className="item" to="/search">Search</Link>
                            <Link className="item" to="/contact">Contact</Link>
                        </div>
                    </div>
                    <div className="three wide computer tablet only column">
                        <h4 className="ui inverted header">Advertise Here</h4>
                        <div className="ui inverted link list">
                            <a href="#" className="item">
                                <div className="ui small centered button test ad" data-text="Small Button"></div>
                            </a>
                        </div>
                    </div>
                    <div className="seven wide computer tablet only column">
                        <h4 className="ui inverted header">Footer Header</h4>
                        <div className="ui half centered banner test ad" data-text="Half Banner"></div>
                    </div>
                    <div className="three wide mobile only column">
                        <h4 className="ui inverted header">Advertise Here</h4>
                        <div className="ui inverted link list">
                            <a href="#" className="item">
                                <div className="ui mobile leaderboard test ad" data-text="Mobile Leaderboard"></div>
                            </a>
                        </div>
                    </div>
                    <div className="seven wide mobile only column">
                        <h4 className="ui inverted header">Footer Header</h4>
                        <div className="ui mobile leaderboard test ad" data-text="Mobile Leaderboard"></div>
                    </div>
                </div>
            </div>
        </div>
      </span>
    );
  }
};