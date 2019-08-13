import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ComponentList from "./ComponentList";
import CommentList from "./CommentList";

export default class SingleProject extends Component {
	state = {
		project: {
			comments: [],
			components: []
		},
		redirectToHome: false
	};

	componentDidMount() {
		this.getProject();
	}

	getProject = () => {
		axios
			.get(`/api/v1/projects/${this.props.match.params.projectId}/`)
			.then(res => {
				this.setState({ project: res.data });
			})
			.then(() => {
				axios.get(`/api/v1/components/`).then(res => {
					this.setState(state => {
						return {
							project: {
								id: state.project.id,
								name: state.project.name,
								schematic_url: state.project.schematic_url,
								directions: state.project.directions,
								comments: state.project.comments,
								components: res.data.filter(component => {
									return component.projects.includes(
										state.project.id
									);
								})
							}
						};
					});
				});
			});
	};

	handleDelete = () => {
		axios
			.delete(`/api/v1/projects/${this.props.match.params.projectId}/`)
			.then(() => {
				this.setState({ redirectToHome: true });
			});
	};

	render() {
		if (this.state.redirectToHome) {
			return <Redirect to='/' />;
		}
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
				<button onClick={this.handleDelete}>Delete Project</button>
			</div>
		);
	}
}
