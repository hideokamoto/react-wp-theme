// Define
var apiUrl = 'http://wp-kyoto.net/wp-json/wp/v2/';
var postUrl = apiUrl + 'posts';

// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');


//Load Component

// Component
var Post = React.createClass({
	render: function() {
		console.log(this.props.post);
		return(
			<div>
				<h3 className="page-header">{this.props.post.title.rendered}</h3>
				<div dangerouslySetInnerHTML={{__html: this.props.post.excerpt.rendered}} />
			</div>
		);
	}
});

var PostList = React.createClass({
	render: function() {
		var postNodes = this.props.postData.map(function (post) {
		console.log(post);
			return (
				<Post post={post} key={post.id}/ >
			);
		});
		return (
			<div className="postList">
				<h2 className="page-header">WordCamp Central Informations</h2>
				{postNodes}
			</div>
		);
	}
});

var PostBox = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			url: this.props.apiUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {
			data: []
		};
	},
	componentDidMount: function() {
		this.loadPostsFromServer();
	},
	render: function() {
		return (
			<PostList postData={this.state.data} />
		);
	}
});

// Render
ReactDOM.render(
	<PostBox apiUrl={postUrl}/>,
	document.getElementById('content')
);