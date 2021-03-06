import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import CommentForm from "./CommentForm";

export default class SingleComment extends Component {
	state = {
		comment: {},
		project: "",
		isEditFormDisplayed: false,
		redirectToProject: false
	};

	componentDidMount() {
		this.getComment();
	}

	getComment = () => {
		axios
			.get(`/api/v1/comments/${this.props.match.params.commentId}/`)
			.then(res => {
				this.setState({ comment: res.data, project: res.data.project });
			});
	};

	handleToggleEditForm = () => {
		this.setState(state => {
			return { isEditFormDisplayed: !state.isEditFormDisplayed };
		});
	};

	handleChange = event => {
		const copiedComment = { ...this.state.comment };
		copiedComment[event.target.name] = event.target.value;
		this.setState({ comment: copiedComment });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios
			.put(
				`/api/v1/comments/${this.props.match.params.commentId}/`,
				this.state.comment
			)
			.then(() => {
				this.setState({ isEditFormDisplayed: false });
			});
	};

	handleDelete = () => {
		axios
			.delete(`/api/v1/comments/${this.props.match.params.commentId}/`)
			.then(() => {
				this.setState({ redirectToProject: true });
			});
	};

	render() {
		if (this.state.redirectToProject) {
			return <Redirect to={`/projects/${this.state.project}`} />;
		}
		return (
			<div>
				{this.state.isEditFormDisplayed ? (
					<CommentForm
						comment={this.state.comment}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						match={this.props.match}
					/>
				) : (
					<div>
						<h2>Comment by: {this.state.comment.author}</h2>
						<h4>{this.state.comment.comment}</h4>
						<button onClick={this.handleDelete}>
							Delete Comment
						</button>
					</div>
				)}
				<button onClick={this.handleToggleEditForm}>
					{this.state.isEditFormDisplayed
						? "Back to Comment"
						: "Edit Comment"}
				</button>
			</div>
		);
	}
}
