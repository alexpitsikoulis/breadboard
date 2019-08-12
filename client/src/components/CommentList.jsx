import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class CommentList extends Component {
	render() {
		let commentList = this.props.comments.map(comment => {
			return (
				<div>
					<Link to={`/comments/${comment.id}`}>
						<strong>
							<p>{comment.author}</p>
						</strong>
						<p>{comment.comment}</p>
					</Link>
				</div>
			);
		});
		return (
			<div>
				<h4>Comments: </h4>
				{commentList}
			</div>
		);
	}
}
