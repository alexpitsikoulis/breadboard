import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class NewCommentForm extends Component {
	state = {
		newComment: {
			author: "",
			comment: "",
			project: this.props.match.params.projectId
		},
		redirectToProject: false
	};

	handleChange = event => {
		const copiedNewComment = { ...this.state.newComment };
		copiedNewComment[event.target.name] = event.target.value;
		this.setState({ newComment: copiedNewComment });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios.post(`/api/v1/comments/`, this.state.newComment).then(() => {
			this.setState({ redirectToProject: true });
		});
	};

	render() {
		if (this.state.redirectToProject) {
			return (
				<Redirect
					to={`/projects/${this.props.match.params.projectId}`}
				/>
			);
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor='comment-author'>Display Name: </label>
						<input
							type='text'
							id='comment-author'
							name='author'
							value={this.state.newComment.name}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='comment'>Comment: </label>
						<textarea
							name='comment'
							id='comment'
							cols='30'
							rows='10'
							value={this.state.newComment.comment}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<input type='submit' value='Submit' />
					</div>
				</form>
			</div>
		);
	}
}
