import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ComponentList from "./ComponentList";
import CommentList from "./CommentList";
import ProjectForm from "./ProjectForm";

export default class SingleProject extends Component {
	state = {
		project: {
			comments: [],
			components: []
		},
		components: [],
		selectedOptions: [],
		relatedVideos: [],
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
				const youtubeQuery = (this.state.project.name + " make")
					.split(" ")
					.join("%2C");
				const youtubeApi = axios.create({
					baseURL: `https://www.googleapis.com/youtube/v3`,
					params: {
						Authorization: process.env.REACT_APP_API_KEY,
						part: "snippet.title",
						maxResults: 5
					}
				});

				youtubeApi
					.get(`/search`, {
						params: {
							part: "snippet",
							q: youtubeQuery,
							key: process.env.REACT_APP_API_KEY
						}
					})
					.then(res => {
						this.setState({ relatedVideos: res.data.items });
					});
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

	handleToggleEditForm = () => {
		this.setState(state => {
			return { isEditFormDisplayed: !state.isEditFormDisplayed };
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
		const copiedProject = { ...this.state.project };
		copiedProject[event.target.name] = event.target.value;
		this.setState({ project: copiedProject });
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

	handleRemoveComponent = event => {
		event.preventDefault();
		const target = event.target;
		this.setState(state => {
			return {
				selectedOptions: state.selectedOptions.filter(component => {
					return component.label !== target.name;
				})
			};
		});
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

	render() {
		if (this.state.redirectToHome) {
			return <Redirect to='/' />;
		}

		const videoPlayers = this.state.relatedVideos.map(video => {
			return (
				<iframe
					width='560'
					height='315'
					src={`https://www.youtube.com/embed/${video.id.videoId}`}
					frameborder='0'
					allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
					allowfullscreen
				/>
			);
		});

		return (
			<div>
				{this.state.isEditFormDisplayed ? (
					<ProjectForm
						project={this.state.project}
						selectedOptions={this.state.selectedOptions}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						handleSelect={this.handleSelect}
						handleRemoveComponent={this.handleRemoveComponent}
					/>
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
				<button onClick={this.handleToggleEditForm}>
					{this.state.isEditFormDisplayed
						? "Back to Project"
						: "Edit Project"}
				</button>
				<h3>
					If you like this project check out these related videos!
				</h3>
				<div>{videoPlayers}</div>
			</div>
		);
	}
}
