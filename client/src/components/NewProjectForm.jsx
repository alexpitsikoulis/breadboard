import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import ComponentList from "./ComponentList";

export default class NewProjectForm extends Component {
	state = {
		components: [],
		newProject: {
			name: "",
			schematic_url: "",
			directions: "",
			comments: [],
			components: []
		},
		selectedOptions: [],
		redirectToHome: false
	};

	componentDidMount() {
		this.autocompleteFiller();
	}
	autocompleteFiller = () => {
		axios.get(`/api/v1/components/`).then(res => {
			const componentObjects = res.data.map(data => {
				return {
					value: data.name,
					label: data.name,
					name: data.name,
					id: data.id,
					retailer: data.retailer,
					img_url: data.img_url,
					projects: data.projects
				};
			});
			this.setState({ components: componentObjects });
		});
	};

	handleSelect = selectedOption => {
		if (this.state.selectedOptions.includes(selectedOption)) {
			this.setState(state => {
				return {
					selectedOptions: state.selectedOptions.filter(option => {
						return option !== selectedOption;
					})
				};
			});
		} else {
			this.setState(state => {
				return {
					selectedOptions: state.selectedOptions.concat(
						selectedOption
					)
				};
			});
		}
		this.setState(state => {
			return {
				newProject: {
					name: state.newProject.name,
					schematic_url: state.newProject.schematic_url,
					directions: state.newProject.directions,
					comments: state.newProject.comments,
					components: state.selectedOptions.map(component => {
						return component.id;
					})
				}
			};
		});
	};

	handleChange = event => {
		const copiedNewProject = { ...this.state.newProject };
		copiedNewProject[event.target.name] = event.target.value;
		this.setState({ newProject: copiedNewProject });
	};

	handleSubmit = event => {
		event.preventDefault();
		axios.post(`/api/v1/projects/`, this.state.newProject).then(() => {
			this.setState({ redirectToHome: true });
		});
	};

	render() {
		if (this.state.redirectToHome) {
			return <Redirect to='/' />;
		}
		return (
			<div>
				<h2>Create a New Project</h2>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor='project-name'>Name: </label>
						<input
							type='text'
							id='project-name'
							name='name'
							value={this.state.newProject.name}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='project-schematic-url'>
							Schematic URL:
						</label>
						<input
							type='text'
							id='project-schematic-url'
							name='schematic_url'
							value={this.state.newProject.schematic_url}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='project-directions'>Directions: </label>
						<textarea
							name='directions'
							id='project-directions'
							cols='30'
							rows='10'
							value={this.state.newProject.directions}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<Select
							value={this.state.selectedOptions}
							onChange={this.handleSelect}
							options={this.state.components}
							name='components'
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
