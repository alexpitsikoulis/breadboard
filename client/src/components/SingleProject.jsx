import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Select from "react-select";
import ComponentList from "./ComponentList";
import CommentList from "./CommentList";

export default class SingleProject extends Component {
	state = {
		project: {
			comments: [],
			components: []
		},
		components: [],
		selectedOptions: [],
		isEditFormDisplayed: false,
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
							},
							components: res.data.map(component => {
								return {
									value: component.name,
									label: component.name,
									id: component.id
								};
							}),
							selectedOptions: res.data.filter(component => {
								return component.projects.includes(
									state.project.id
								);
							})
						};
					});
					this.setState(state => {
						return {
							selectedOptions: state.selectedOptions.map(
								component => {
									return {
										value: component.name,
										label: component.name,
										id: component.id
									};
								}
							)
						};
					});
				});
			});
	};

	handleSelect = selectedOption => {
		if (
			this.state.selectedOptions.find(
				option => option.id === selectedOption.id
			)
		) {
			this.setState(state => {
				return {
					selectedOptions: state.selectedOptions.filter(option => {
						return option.id !== selectedOption.id;
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
				project: {
					name: state.project.name,
					schematic_url: state.project.schematic_url,
					directions: state.project.directions,
					comments: state.project.comments,
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
	};

	handleDelete = () => {
		axios
			.delete(`/api/v1/projects/${this.props.match.params.projectId}/`)
			.then(() => {
				this.setState({ redirectToHome: true });
			});
	};

	handleSubmit = event => {
		event.preventDefault();
		this.setState(state => {
			return {
				project: {
					name: state.project.name,
					schematic_url: state.project.schematic_url,
					directions: state.project.directions,
					comments: state.project.comments,
					components: state.selectedOptions.map(component => {
						return component.id;
					})
				}
			};
		});
		axios
			.put(
				`/api/v1/projects/${this.props.match.params.projectId}/`,
				this.state.project
			)
			.then(() => {
				this.setState({ isEditFormDisplayed: false });
				this.getProject();
			});
	};

	render() {
		if (this.state.redirectToHome) {
			return <Redirect to='/' />;
		}
		return (
			<div>
				{this.state.isEditFormDisplayed ? (
					<form onSubmit={this.handleSubmit}>
						<div>
							<label htmlFor='project-name'>Name: </label>
							<input
								type='text'
								id='project-name'
								name='name'
								value={this.state.project.name}
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
								value={this.state.project.schematic_url}
								onChange={this.handleChange}
							/>
						</div>
						<div>
							<label htmlFor='project-directions'>
								Directions:{" "}
							</label>
							<textarea
								name='directions'
								id='project-directions'
								cols='30'
								rows='10'
								value={this.state.project.directions}
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
				) : (
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
						<ComponentList
							components={this.state.project.components}
						/>
						<CommentList
							comments={this.state.project.comments}
							projectId={this.props.match.params.projectId}
						/>
						<button onClick={this.handleDelete}>
							Delete Project
						</button>
					</div>
				)}
			</div>
		);
	}
}
