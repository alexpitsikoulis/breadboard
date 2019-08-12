import React, { Component } from "react";
import axios from "axios";
import ComponentList from "./ComponentList";
import CommentList from "./CommentList";

export default class SingleProject extends Component {
	state = {
		project: {
			comments: [],
			components: []
		}
	};

	componentDidMount() {
		this.getProject();
	}

	getProject = () => {
		axios
			.get(`/api/v1/projects/${this.props.match.params.projectId}/`)
			.then(res => {
				this.setState({ project: res.data });
			});
	};

	render() {
		return (
			<div>
				<h2>{this.state.project.name}</h2>
				{this.state.project.schematic_url ? (
					<img
						src={this.state.project.schematic_url}
						alt={`${this.state.project.name} schematic`}
					/>
				) : null}
				<h4>Directions:</h4>
				<p>{this.state.project.directions}</p>
				<h4>Components Needed:</h4>
				<ComponentList components={this.state.project.components} />
				<CommentList comments={this.state.project.comments} />
			</div>
		);
	}
}
