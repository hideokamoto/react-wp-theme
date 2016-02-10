// Define
var rootAPI = 'http://wp-kyoto.net/wp-json/';
var API  = rootAPI + 'wp/v2/';

// Load Reacts
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'


/*Load Component
var Header  = require('../modules/meta/header.jsx');
var Menu  = require('../modules/meta/menu.jsx');
*/
const Nav  = require('../modules/meta/globnav.jsx');
const Intro  = require('../modules/top/intro.jsx');
const Home = React.createClass({
  render() {
    return (
      <div className="content topimg fullHeight"  id="top">
		<Intro apiPath={rootAPI}/>
      </div>
    )
  }
})
const PostArchive = require('../modules/post/archive.jsx');
const PostArchiveRow = React.createClass({
  render() {
    return (
      <div className="content fullHeight" >
		<PostArchive apiPath={API}/>
      </div>
    )
  }
})

const App = React.createClass({
  render() {
    return (
      <div className="fullHeight">
	  	<Nav apiPath={rootAPI}/>
        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
})

//Router
render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="blog" component={PostArchiveRow} />
    </Route>
  </Router>
), document.getElementById('app'))
