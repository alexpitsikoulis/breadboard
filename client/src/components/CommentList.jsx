import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Flex, Box } from "rebass";

export default class CommentList extends Component {
	render() {
		let commentList = this.props.comments.map(comment => {
			return (
				<div key={comment.id} className='comment'>
					<Link
						to={`/projects/${comment.project}/comments/${
							comment.id
						}`}>
						<strong>
							<p>{comment.author}</p>
						</strong>
						<hr />
						<p>{comment.comment}</p>
					</Link>
				</div>
			);
		});
		return (
			<Flex
				flexDirection='column'
				alignItems='flex-start'
				width='50vw;'
				margin='0 auto'
				textAlign='left'>
				<Box alignSelf='center'>
					<h4>Comments: </h4>
					<button>
						<Link
							to={`/projects/${
								this.props.projectId
							}/comments/new`}>
							Add New Comment
						</Link>
					</button>
				</Box>
				{commentList}
			</Flex>
		);
	}
}
