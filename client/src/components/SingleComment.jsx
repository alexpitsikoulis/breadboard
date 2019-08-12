import React, { Component } from "react";
import axios from "axios";

export default class SingleComment extends Component {
	state = {
		comment: {}
	};

	componentDidMount() {
		this.getComment();
	}

	getComment = () => {
		axios
			.get(`/api/v1/comments/${this.props.match.params.commentId}/`)
			.then(res => {
				this.setState({ comment: res.data });
			});
    };
    
	render() {
		return (
			<div>
				<h2>Comment by: {this.state.comment.author}</h2>
				<h4>{this.state.comment.comment}</h4>
			</div>
		);
	}
}
