import React, { Component } from "react";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import Select from "react-select";
import { Flex } from "rebass";

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
					id: data.id
				};
			});
			this.setState({ components: componentObjects });
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

	handleRemoveComponent = event => {
		const target = event.target.name;
		this.setState(state => {
			return {
				selectedOptions: state.selectedOptions.filter(component => {
					return component.label !== target;
				})
			};
		});
		this.setState(state => {
			return {
				newProject: {
					name: state.newProject.name,
					schematic_url: state.newProject.schematic_url,
					directions: state.newProject.directions,
					comments: [],
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
		const selectedComponents = (this.props.selectedOptions
			? this.props.selectedOptions
			: this.state.selectedOptions
		).map(component => {
			return (
				<Flex
					key={component.id}
					justifyContent='center'
					m={2}
					className='selected-component'>
					<p>{component.label}</p>
					<button
						name={component.label}
						onClick={
							this.props.handleRemoveComponent
								? this.props.handleRemoveComponent
								: this.handleRemoveComponent
						}>
						X
					</button>
				</Flex>
			);
		});
		return (
			<div>
				<h2>
					{this.props.project
						? "Edit Project"
						: "Create a New Project"}
				</h2>
				<form
					onSubmit={
						this.props.handleSubmit
							? this.props.handleSubmit
							: this.handleSubmit
					}>
					<div>
						<label htmlFor='project-name'>Name: </label>
						<input
							type='text'
							id='project-name'
							name='name'
							value={
								this.props.project
									? this.props.project.name
									: this.state.newProject.name
							}
							onChange={
								this.props.handleChange
									? this.props.handleChange
									: this.handleChange
							}
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
							value={
								this.props.project
									? this.props.project.schematic_url
									: this.state.newProject.schematic_url
							}
							onChange={
								this.props.handleChange
									? this.props.handleChange
									: this.handleChange
							}
						/>
					</div>
					<div>
						<label htmlFor='project-directions'>Directions: </label>
						<textarea
							name='directions'
							id='project-directions'
							cols='30'
							rows='10'
							value={
								this.props.project
									? this.props.project.directions
									: this.state.newProject.directions
							}
							onChange={
								this.props.handleChange
									? this.props.handleChange
									: this.handleChange
							}
						/>
					</div>
					<Flex flexDirection='column'>
						<label htmlFor='project-components'>
							Components Needed:{" "}
						</label>
						<Flex
							className='selected-components'
							justifyContent='center'
							flexWrap='wrap'
							width='50vw'
							alignSelf='center'>
							{selectedComponents}
						</Flex>
						<Select
							value={
								this.props.selectedOptions
									? this.props.selectedOptions
									: this.state.selectedOptions
							}
							onChange={
								this.props.handleSelect
									? this.props.handleSelect
									: this.handleSelect
							}
							options={this.state.components}
							name='components'
							id='component-select'
						/>
						<Link to='/components/new'>
							Don't see the component listed? Add it here.
						</Link>
					</Flex>
					<div>
						<input type='submit' value='Submit' />
					</div>
				</form>
			</div>
		);
	}
}
