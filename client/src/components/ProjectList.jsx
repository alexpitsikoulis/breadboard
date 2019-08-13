import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class ProjectList extends Component {
	state = {
		projects: []
	};

	componentDidMount() {
		this.getAllProjects();
	}

	getAllProjects = () => {
		axios.get(`/api/v1/projects/`).then(res => {
			this.setState({ projects: res.data });
		});
	};

	render() {
		const projectList = this.state.projects.map(project => {
			return (
				<div key={project.id}>
					<h4>
						<Link to={`/projects/${project.id}/`}>
							{project.name}
						</Link>
					</h4>
				</div>
			);
		});
		return (
			<div>
				<h1>All Projects</h1>
				{projectList}
				<button>
					<Link to='/projects/new'>Add New Project</Link>
				</button>
			</div>
		);
	}
}
